'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useSettings } from '@/lib/i18n';

export function LangSwitch() {
  const { lang, setLang } = useSettings();
  return (
    <div className="seg" role="group" aria-label="Language">
      <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>English</button>
      <button type="button" aria-pressed={lang === 'zh'} onClick={() => setLang('zh')}>中文</button>
    </div>
  );
}

export default function Account({ uid, email, child, profiles, onChange }) {
  const { t, size, setSize } = useSettings();
  const [name, setName] = useState(profiles[uid] || '');
  const [kid, setKid] = useState(child.name);
  const [dob, setDob] = useState(child.birthdate || '');
  const [pw, setPw] = useState('');
  const [msg, setMsg] = useState(null);

  const done = (error, where) => setMsg(error ? { err: error.message, where } : { ok: t('saved'), where });
  const Msg = ({ where }) => (msg?.where === where ? <div className={msg.err ? 'err' : 'ok'}>{msg.err || msg.ok}</div> : null);

  async function saveName(e) {
    e.preventDefault();
    const { error } = await supabase.from('profiles').update({ display_name: name.trim() }).eq('id', uid);
    done(error, 'name'); onChange();
  }
  async function saveChild(e) {
    e.preventDefault();
    const { error } = await supabase.from('children').update({ name: kid.trim(), birthdate: dob || null }).eq('id', child.id);
    done(error, 'child'); onChange();
  }
  async function savePw(e) {
    e.preventDefault();
    if (pw.length < 8) return setMsg({ err: t('pwShort'), where: 'pw' });
    const { error } = await supabase.auth.updateUser({ password: pw });
    done(error, 'pw'); setPw('');
  }

  return (
    <div className="settings">
      <section className="panel">
        <h3>{t('language')}</h3>
        <LangSwitch />
        <h3>{t('textSize')}</h3>
        <div className="seg" role="group" aria-label={t('textSize')}>
          <button type="button" aria-pressed={size === 'normal'} onClick={() => setSize('normal')}>{t('normal')}</button>
          <button type="button" aria-pressed={size === 'large'} onClick={() => setSize('large')} style={{ fontSize: '1.2em' }}>{t('large')}</button>
        </div>
        <p className="muted small">{t('thisDevice')}</p>
      </section>

      <form className="panel" onSubmit={saveName}>
        <label className="field-label" htmlFor="myname">{t('yourName')}</label>
        <input id="myname" className="field" value={name} onChange={(e) => setName(e.target.value)} required />
        <button className="btn block">{t('save')}</button>
        <Msg where="name" />
      </form>

      <form className="panel" onSubmit={saveChild}>
        <label className="field-label" htmlFor="kid">{t('child')}</label>
        <input id="kid" className="field" value={kid} onChange={(e) => setKid(e.target.value)} required />
        <label className="field-label" htmlFor="dob">{t('birthdate')}</label>
        <input id="dob" className="field" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        <button className="btn block">{t('save')}</button>
        <Msg where="child" />
      </form>

      <section className="panel">
        <h3>{t('members')}</h3>
        <div className="chips">{Object.entries(profiles).map(([id, n]) => <span key={id} className="chip">{n}</span>)}</div>
      </section>

      <form className="panel" onSubmit={savePw}>
        <label className="field-label" htmlFor="npw">{t('changePassword')}</label>
        <input id="npw" className="field" type="password" autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} />
        <button className="btn block">{t('updatePassword')}</button>
        <Msg where="pw" />
      </form>

      <p className="muted small tip">{t('homeTip')}</p>
      <p className="muted small tip">{t('signedInAs', { email })}</p>
      <button className="btn block danger-outline" onClick={() => supabase.auth.signOut()}>{t('signOut')}</button>
    </div>
  );
}
