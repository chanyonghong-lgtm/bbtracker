'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useSettings } from '@/lib/i18n';
import { addDays, ageText, fmtDate, fmtDur, fmtTime, startOfDay, startOfWeek } from '@/lib/time';
import { DEFAULT_FOODS, DIAPER_LABEL, foodId, isMilkOnly, milkMl } from '@/lib/constants';
import Home from './Home';
import History from './History';
import Trends from './Trends';
import Tips from './Tips';
import Account from './Account';
import EntrySheet from './EntrySheet';
import { Bulb, Calendar, Chart, People, Today } from './Icons';

const byStart = (a, b) => (a.start_at < b.start_at ? -1 : a.start_at > b.start_at ? 1 : 0);
const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`);

export default function Main({ session }) {
  const { t, lang } = useSettings();
  const uid = session.user.id;
  const [tab, setTab] = useState('today');
  const [child, setChild] = useState(null);
  const [childLoaded, setChildLoaded] = useState(false);
  const [profiles, setProfiles] = useState({});
  const [entries, setEntries] = useState([]);
  const [day, setDay] = useState(startOfDay(new Date()));
  const [sheet, setSheet] = useState(null); // { type: 'sleep'|'solids'|'milk'|'diaper', entry? }
  const [toast, setToast] = useState(null);
  const toastTimer = useRef();
  const lastTap = useRef(0);
  const [, tick] = useState(0);

  // Ignore a second tap within 1.2s so a double tap never logs twice
  const guard = () => { const n = Date.now(); if (n - lastTap.current < 1200) return false; lastTap.current = n; return true; };

  useEffect(() => {
    const iv = setInterval(() => tick((n) => n + 1), 30000);
    return () => clearInterval(iv);
  }, []);

  const showToast = useCallback((text, actions = []) => {
    clearTimeout(toastTimer.current);
    setToast({ text, actions, key: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), 7000);
  }, []);

  const loadBasics = useCallback(async () => {
    const [{ data: kids }, { data: profs }] = await Promise.all([
      supabase.from('children').select('*').order('created_at').limit(1),
      supabase.from('profiles').select('*'),
    ]);
    setChild(kids?.[0] || null);
    setChildLoaded(true);
    setProfiles(Object.fromEntries((profs || []).map((p) => [p.id, p.display_name])));
  }, []);

  const loadEntries = useCallback(async () => {
    if (!child) return;
    const now = new Date();
    const ws = startOfWeek(day);
    const from = new Date(Math.min(addDays(ws, -1), addDays(startOfDay(now), -30)));
    const to = new Date(Math.max(addDays(ws, 8), addDays(now, 1)));
    const { data, error } = await supabase
      .from('entries').select('*').eq('child_id', child.id)
      .gte('start_at', from.toISOString()).lt('start_at', to.toISOString())
      .order('start_at', { ascending: true }).limit(3000);
    if (!error) setEntries(data);
  }, [child, day]);

  useEffect(() => { loadBasics(); }, [loadBasics]);
  useEffect(() => { loadEntries(); }, [loadEntries]);

  useEffect(() => {
    if (!child) return;
    const ch = supabase.channel('entries')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'entries' }, () => loadEntries())
      .subscribe();
    const onVis = () => document.visibilityState === 'visible' && loadEntries();
    document.addEventListener('visibilitychange', onVis);
    return () => { supabase.removeChannel(ch); document.removeEventListener('visibilitychange', onVis); };
  }, [child, loadEntries]);

  // Optimistic save: update the screen first, then the server; roll back on failure.
  const save = useCallback(async (entry, { insert } = {}) => {
    const now = new Date().toISOString();
    const isNew = insert || !entry.id;
    const row = {
      ...entry,
      id: entry.id || uuid(),
      child_id: child.id,
      updated_by: uid,
      updated_at: now,
      ...(isNew && !entry.created_by ? { created_by: uid, created_at: now } : {}),
    };
    setEntries((prev) => [...prev.filter((e) => e.id !== row.id), row].sort(byStart));
    const { error } = isNew
      ? await supabase.from('entries').insert(row)
      : await supabase.from('entries').update(row).eq('id', row.id);
    if (error) { showToast(t('errSave')); loadEntries(); return null; }
    return row;
  }, [child, uid, loadEntries, showToast, t]);

  const remove = useCallback(async (entry) => {
    setEntries((prev) => prev.filter((e) => e.id !== entry.id));
    setSheet(null);
    const { error } = await supabase.from('entries').delete().eq('id', entry.id);
    if (error) { showToast(t('errSave')); loadEntries(); return; }
    showToast(t('deleted'), [{ label: t('undo'), fn: () => save(entry, { insert: true }) }]);
  }, [save, loadEntries, showToast, t]);

  const undoNew = (row) => ({ label: t('undo'), fn: () => remove(row).then(() => setToast(null)) });

  // One-tap actions from the Today screen
  const quick = {
    sleepToggle: async (sleeping) => {
      if (!guard()) return;
      // A sleep left running for over 14 hours was probably forgotten: ask for the real wake-up time
      if (sleeping && Date.now() - new Date(sleeping.start_at) > 14 * 3600000) return setSheet({ type: 'sleep', entry: sleeping });
      if (sleeping) {
        const before = sleeping;
        const row = await save({ ...sleeping, end_at: new Date().toISOString() });
        if (row) showToast(t('sleptFor', { dur: fmtDur(new Date(row.end_at) - new Date(row.start_at), lang) }), [
          { label: t('undo'), fn: () => { save({ ...before, end_at: null }); setToast(null); } },
        ]);
      } else {
        const row = await save({ type: 'sleep', start_at: new Date().toISOString(), end_at: null, data: {} });
        if (row) showToast(t('sleepStarted', { time: fmtTime(row.start_at, lang) }), [undoNew(row)]);
      }
    },
    diaper: async (kind) => {
      if (!guard()) return;
      const row = await save({ type: 'diaper', start_at: new Date().toISOString(), data: { kind } });
      if (!row) return;
      const actions = [undoNew(row)];
      if (kind !== 'wet' && kind !== 'dry') actions.push({ label: t('addDetails'), fn: () => { setToast(null); setSheet({ type: 'diaper', entry: row }); } });
      showToast(t('logged', { what: t(DIAPER_LABEL[kind]), time: fmtTime(row.start_at, lang) }), actions);
    },
  };

  async function saveFromSheet(entry) {
    const row = await save(entry);
    if (!row) return;
    setSheet(null);
    if (isMilkOnly(row) && !entry.created_at) showToast(t('milkLogged', { ml: milkMl(row) }), [undoNew(row)]);
    else showToast(t('saved'));
  }

  // Foods ranked by how often they were logged, then built-in defaults
  const foodOptions = useMemo(() => {
    const counts = new Map();
    entries.forEach((e) => (e.data?.foods || []).forEach((f) => {
      const id = foodId(f);
      const c = counts.get(id);
      counts.set(id, { food: { key: f.key, name: f.name, category: f.category }, n: (c?.n || 0) + 1, last: e.start_at });
    }));
    DEFAULT_FOODS.forEach((d) => { const id = foodId(d); if (!counts.has(id)) counts.set(id, { food: { key: d.key, category: d.category }, n: 0, last: '' }); });
    return [...counts.values()].sort((a, b) => b.n - a.n || (b.last > a.last ? 1 : -1)).map((x) => x.food);
  }, [entries]);

  // Most recent milk, used to pre-fill the next one (same type and amount)
  const lastMilk = useMemo(() => {
    for (let i = entries.length - 1; i >= 0; i--) if (milkMl(entries[i])) return entries[i].data.milk;
    return null;
  }, [entries]);

  if (!childLoaded) return <div className="center"><div className="spinner" aria-label="Loading" /></div>;
  if (!child) return <SetupChild onDone={loadBasics} />;

  const tabs = [
    ['today', Today, t('today')],
    ['history', Calendar, t('history')],
    ['trends', Chart, t('trends')],
    ['tips', Bulb, t('tips')],
    ['family', People, t('family')],
  ];
  const go = (id) => { setTab(id); window.scrollTo(0, 0); };

  return (
    <div className="app">
      <header className="header">
        <div className="avatar" aria-hidden="true">{child.name.slice(0, 1)}</div>
        <div className="header-text">
          <h1>{child.name}</h1>
          <div className="muted">{[ageText(child.birthdate, t), fmtDate(tab === 'history' ? day : new Date(), lang)].filter(Boolean).join(' · ')}</div>
        </div>
      </header>

      <main>
        {tab === 'today' && <Home entries={entries} profiles={profiles} child={child} quick={quick} onOpen={setSheet} onTips={() => go('tips')} />}
        {tab === 'history' && <History entries={entries} day={day} setDay={setDay} profiles={profiles} onOpen={setSheet} />}
        {tab === 'trends' && <Trends entries={entries} />}
        {tab === 'tips' && <Tips child={child} onFamily={() => go('family')} />}
        {tab === 'family' && <Account uid={uid} email={session.user.email} child={child} profiles={profiles} onChange={loadBasics} />}
      </main>

      <nav className="nav" aria-label="Main">
        <div>
          {tabs.map(([id, Icon, label]) => (
            <button key={id} className={tab === id ? 'on' : ''} aria-current={tab === id ? 'page' : undefined} onClick={() => go(id)}>
              <Icon size={26} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {toast && (
        <div className="toast" role="status" key={toast.key}>
          <span>{toast.text}</span>
          {toast.actions.map((a, i) => (
            <button key={i} onClick={() => a.fn()}>{a.label}</button>
          ))}
        </div>
      )}

      {sheet && (
        <EntrySheet
          type={sheet.type}
          entry={sheet.entry}
          foodOptions={foodOptions}
          lastMilk={lastMilk}
          onClose={() => setSheet(null)}
          onSave={saveFromSheet}
          onDelete={remove}
        />
      )}
    </div>
  );
}

function SetupChild({ onDone }) {
  const { t } = useSettings();
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [err, setErr] = useState('');
  async function submit(e) {
    e.preventDefault();
    const { error } = await supabase.from('children').insert({ name: name.trim(), birthdate: birthdate || null });
    if (error) return setErr(error.message);
    onDone();
  }
  return (
    <div className="center">
      <form className="login" onSubmit={submit}>
        <h1>{t('welcome')}</h1>
        <p className="muted">{t('addChild')}</p>
        <label className="field-label" htmlFor="cn">{t('childName')}</label>
        <input id="cn" className="field" value={name} onChange={(e) => setName(e.target.value)} required />
        <label className="field-label" htmlFor="cb">{t('birthdate')}</label>
        <input id="cb" className="field" type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
        {err && <div className="err">{err}</div>}
        <button className="btn primary block big">{t('continue')}</button>
      </form>
    </div>
  );
}
