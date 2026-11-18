'use client';
import { useEffect, useState } from 'react';
import { DICTS, useSettings } from '@/lib/i18n';
import { fmtDate, fmtTime, toInput } from '@/lib/time';
import {
  AMOUNTS, COLOURS, CONSISTENCY, DEFAULT_FOODS, DIAPER_KINDS, DIAPER_LABEL, FOOD_CATS, MEALS, MILK_KINDS, MILK_PRESETS, WARN_COLOURS,
  foodIcon, foodId, foodName, guessMeal, isPoo,
} from '@/lib/constants';
import { DIAPER_ICON } from './Timeline';
import { Check, Close, Minus, Plus, Spoon } from './Icons';

const TONE = { sleep: 'var(--sleep)', solids: 'var(--solids)', milk: 'var(--milk)', diaper: 'var(--diaper)' };
const TITLE = { sleep: 'sleep', solids: 'food', milk: 'milk', diaper: 'diaper' };

export default function EntrySheet({ type, entry, foodOptions, lastMilk, onClose, onSave, onDelete }) {
  const { t } = useSettings();
  const isEdit = !!entry?.id;
  const milkDefault = { kind: lastMilk?.kind || 'packet', ml: lastMilk?.ml || 200 };
  // A new past sleep starts as "1 hr ago until now" so it is valid without any changes
  const pastSleep = type === 'sleep' && !isEdit;
  const [start, setStart] = useState(entry?.start_at ? new Date(entry.start_at) : new Date(Date.now() - (pastSleep ? 3600000 : 0)));
  const [end, setEnd] = useState(entry?.end_at ? new Date(entry.end_at) : isEdit ? null : new Date());
  const [data, setData] = useState(() => ({
    ...(type === 'solids' ? { meal: guessMeal(), foods: [] } : {}),
    ...(type === 'milk' ? { meal: 'milk', milk: milkDefault } : {}),
    ...(type === 'diaper' ? { kind: 'wet' } : {}),
    ...(entry?.data || {}),
  }));
  const [notes, setNotes] = useState(entry?.notes || '');
  const [err, setErr] = useState('');
  const [confirmDel, setConfirmDel] = useState(false);
  const [saving, setSaving] = useState(false);
  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const toggle = (k, v) => set(k, data[k] === v ? undefined : v);
  // Merge milk changes into the latest state so quick taps never overwrite each other
  const patchMilk = (p) => setData((d) => ({ ...d, milk: { ...(d.milk || milkDefault), ...p } }));
  const hasMilk = !!data.milk;

  // Lock page scroll behind the sheet; close with Escape
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  async function submit() {
    if (saving) return;
    const ml = Number(data.milk?.ml) || 0;
    if (!start) return setErr(t('errTime'));
    if (type === 'sleep' && end && end <= start) return setErr(t('errAfter'));
    if (type === 'milk' && ml <= 0) return setErr(t('errMilk'));
    if (type === 'solids' && !data.foods?.length && ml <= 0) return setErr(t('errFood'));
    const clean = { ...data };
    Object.keys(clean).forEach((k) => clean[k] === undefined && delete clean[k]);
    if (clean.milk) { if (ml > 0) clean.milk = { kind: clean.milk.kind || 'packet', ml }; else delete clean.milk; }
    if (type === 'diaper' && !isPoo(clean.kind)) { delete clean.consistency; delete clean.colour; }
    setErr('');
    setSaving(true);
    await onSave({
      ...(entry || {}),
      type: type === 'milk' ? 'solids' : type, // milk is stored as a food entry
      start_at: start.toISOString(),
      end_at: type === 'sleep' && end ? end.toISOString() : null,
      data: clean,
      notes: notes.trim() || null,
    });
    setSaving(false);
  }

  return (
    <div className="overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
        <div className="sheet-head" style={{ background: TONE[type] }}>
          <button className="icon-btn" onClick={onClose} aria-label={t('close')}><Close size={26} /></button>
          <h2 id="sheet-title">{t(TITLE[type])}</h2>
          <span />
        </div>

        <div className="sheet-body">
          {type === 'solids' && (
            <div className="sec">
              <div className="meal-row">
                {MEALS.map((m) => (
                  <button key={m} className="choice" aria-pressed={data.meal === m} onClick={() => set('meal', m)}>{t(m)}</button>
                ))}
              </div>
            </div>
          )}

          {type === 'milk' && <MilkPicker milk={data.milk} onChange={patchMilk} />}

          {type === 'diaper' && (
            <div className="sec">
              <div className="sec-label">{t('type')}</div>
              <div className="quad four">
                {DIAPER_KINDS.map((k) => {
                  const I = DIAPER_ICON[k];
                  return (
                    <button key={k} className="btn quick" aria-pressed={data.kind === k} onClick={() => set('kind', k)}>
                      <I size={30} /><span>{t(DIAPER_LABEL[k])}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <WhenPicker id="start" label={type === 'sleep' ? t('fellAsleep') : t('when')} value={start} onChange={setStart} edit={isEdit} initial={pastSleep ? '60' : 'now'} />
          {type === 'sleep' && <WhenPicker id="end" label={t('wokeUp')} value={end} onChange={setEnd} edit={isEdit} allowNone />}

          {type === 'solids' && <FoodPicker data={data} set={set} options={foodOptions} />}

          {type === 'solids' && (
            <div className="sec">
              <div className="sec-label">{t('howMuch')}</div>
              <div className="choice-row">
                {AMOUNTS.map((a) => (
                  <button key={a} className="choice" aria-pressed={data.amount === a} onClick={() => toggle('amount', a)}>{t(a)}</button>
                ))}
              </div>
            </div>
          )}

          {type === 'solids' && (
            hasMilk ? (
              <>
                <MilkPicker milk={data.milk} onChange={patchMilk} title={t('milkWithMeal')} />
                <div className="sec center-row">
                  <button className="linkbtn" onClick={() => set('milk', undefined)}>{t('removeMilk')}</button>
                </div>
              </>
            ) : (
              <div className="sec center-row">
                <button className="btn" onClick={() => set('milk', milkDefault)}>{t('addMilk')}</button>
              </div>
            )
          )}

          {type === 'diaper' && isPoo(data.kind) && (
            <>
              <div className="sec">
                <div className="sec-label">{t('consistency')}</div>
                <div className="choice-row">
                  {CONSISTENCY.map((c) => (
                    <button key={c} className="choice" aria-pressed={data.consistency === c} onClick={() => toggle('consistency', c)}>{t(c)}</button>
                  ))}
                </div>
              </div>
              <div className="sec">
                <div className="sec-label">{t('colour')}</div>
                <div className="swatches">
                  {COLOURS.map((c) => (
                    <button key={c.id} className="swatch-btn" aria-pressed={data.colour === c.id} onClick={() => toggle('colour', c.id)}>
                      <span className="swatch" style={{ background: c.hex }}>{data.colour === c.id && <Check size={20} />}</span>
                      <span>{t(c.id)}</span>
                    </button>
                  ))}
                </div>
                {WARN_COLOURS.includes(data.colour) && <div className="hint">{t('pooHint')}</div>}
              </div>
            </>
          )}

          <div className="sec">
            <label className="sec-label" htmlFor="notes">{t('notes')} <span className="muted small">({t('optional')})</span></label>
            <textarea id="notes" className="field" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>

          {isEdit && (
            <div className="sec del">
              {confirmDel ? (
                <div className="confirm">
                  <button className="btn danger" onClick={() => onDelete(entry)}>{t('delete')}</button>
                  <button className="btn" onClick={() => setConfirmDel(false)}>{t('close')}</button>
                </div>
              ) : (
                <button className="linkbtn danger-text" onClick={() => setConfirmDel(true)}>{t('delete')}</button>
              )}
            </div>
          )}
        </div>

        <div className="sheet-foot">
          {err && <div className="err">{err}</div>}
          <button className="btn primary block big" onClick={submit} disabled={saving}>{t('save')}</button>
        </div>
      </div>
    </div>
  );
}

function MilkPicker({ milk, onChange, title }) {
  const { t } = useSettings();
  const m = milk || { kind: 'packet', ml: 200 };
  const ml = m.ml === '' ? '' : Number(m.ml) || 0;
  const setMl = (v) => onChange({ ml: v === '' ? '' : Math.max(0, Math.min(1000, Math.round(Number(v) || 0))) });
  return (
    <>
      <div className="sec">
        <div className="sec-label">{title || t('milkType')}</div>
        <div className="milk-kinds">
          {MILK_KINDS.map((k) => (
            <button key={k} className="choice" aria-pressed={m.kind === k} onClick={() => onChange({ kind: k })}>{t(`milk_${k}`)}</button>
          ))}
        </div>
      </div>
      <div className="sec">
        <label className="sec-label" htmlFor="milk-ml">{t('milkAmount')}</label>
        <div className="stepper">
          <button className="step-btn" aria-label={t('less')} onClick={() => setMl((Number(ml) || 0) - 10)}><Minus size={26} /></button>
          <div className="step-val">
            <input id="milk-ml" type="number" inputMode="numeric" min="0" max="1000" value={ml} onChange={(e) => setMl(e.target.value)} onFocus={(e) => e.target.select()} />
            <span>{t('ml')}</span>
          </div>
          <button className="step-btn" aria-label={t('more')} onClick={() => setMl((Number(ml) || 0) + 10)}><Plus size={26} /></button>
        </div>
        <div className="choice-row presets">
          {MILK_PRESETS.map((p) => (
            <button key={p} className="choice" aria-pressed={Number(ml) === p} onClick={() => setMl(p)}>{p}</button>
          ))}
        </div>
      </div>
    </>
  );
}

function WhenPicker({ id, label, value, onChange, edit, allowNone, initial = 'now' }) {
  const { t, lang } = useSettings();
  const presets = [['now', 0], ['15', 15], ['30', 30], ['60', 60]];
  const [sel, setSel] = useState(value === null ? 'none' : edit ? 'custom' : initial);
  const pick = (key, mins) => { setSel(key); onChange(new Date(Date.now() - mins * 60000)); };
  const presetLabel = (k, m) => (k === 'now' ? t('now') : m === 60 ? t('hourAgo') : t('minsAgo', { n: m }));

  return (
    <div className="sec">
      <div className="sec-label row-between">
        <span>{label}</span>
        <span className="when-val">{value ? `${fmtTime(value, lang)} · ${fmtDate(value, lang)}` : t('stillSleeping')}</span>
      </div>
      <div className="choice-row wrap">
        {allowNone && <button className="choice" aria-pressed={sel === 'none'} onClick={() => { setSel('none'); onChange(null); }}>{t('stillSleeping')}</button>}
        {presets.map(([k, m]) => (
          <button key={k} className="choice" aria-pressed={sel === k} onClick={() => pick(k, m)}>{presetLabel(k, m)}</button>
        ))}
        <button className="choice" aria-pressed={sel === 'custom'} onClick={() => { setSel('custom'); if (!value) onChange(new Date()); }}>{t('otherTime')}</button>
      </div>
      {sel === 'custom' && (
        <input
          id={id}
          className="field"
          type="datetime-local"
          value={value ? toInput(value) : ''}
          max={toInput(new Date(Date.now() + 5 * 60000))}
          onChange={(e) => e.target.value && onChange(new Date(e.target.value))}
        />
      )}
    </div>
  );
}

function FoodPicker({ data, set, options }) {
  const { t } = useSettings();
  const [more, setMore] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Fruit');
  const foods = data.foods || [];
  const selected = new Set(foods.map(foodId));

  const all = [...options];
  foods.forEach((f) => { if (!all.some((o) => foodId(o) === foodId(f))) all.unshift(f); });
  const shown = more ? all : all.slice(0, 9);

  const toggleFood = (f) => {
    const id = foodId(f);
    set('foods', selected.has(id) ? foods.filter((x) => foodId(x) !== id) : [...foods, { key: f.key, name: f.key ? undefined : f.name, category: f.category, detail: '' }]);
  };
  const setDetail = (i, detail) => set('foods', foods.map((f, j) => (j === i ? { ...f, detail } : f)));
  const addNew = () => {
    const n = name.trim();
    if (!n) return;
    // Typing a built-in food (in either language) selects that tile instead of creating a duplicate
    const known = DEFAULT_FOODS.find((d) => [DICTS.en, DICTS.zh].some((dict) => dict[`f_${d.key}`].toLowerCase() === n.toLowerCase()));
    const f = known ? { key: known.key, category: known.category, detail: '' } : { name: n, category, detail: '' };
    if (!selected.has(foodId(f))) set('foods', [...foods, f]);
    setName('');
  };

  return (
    <div className="sec">
      <div className="sec-label">{t('tapFoods')}</div>
      <div className="food-grid">
        {shown.map((f) => {
          const on = selected.has(foodId(f));
          return (
            <button key={foodId(f)} className="food-tile" aria-pressed={on} onClick={() => toggleFood(f)}>
              {on && <span className="tick"><Check size={16} /></span>}
              <span className="fi">{foodIcon(f)}</span>
              <span className="fn">{foodName(f, t)}</span>
            </button>
          );
        })}
      </div>
      {all.length > 9 && (
        <button className="linkbtn" onClick={() => setMore(!more)}>{more ? '–' : t('moreFoods')}</button>
      )}

      {foods.length > 0 && (
        <ul className="picked">
          {foods.map((f, i) => (
            <li key={foodId(f)}>
              <span className="fi">{foodIcon(f)}</span>
              <div className="picked-main">
                <div className="fn">{foodName(f, t)}</div>
                <input className="field slim" aria-label={`${foodName(f, t)} detail`} placeholder={t('detailPh')} value={f.detail || ''} onChange={(e) => setDetail(i, e.target.value)} />
              </div>
              <button className="icon-btn" aria-label={t('delete')} onClick={() => toggleFood(f)}><Close size={20} /></button>
            </li>
          ))}
        </ul>
      )}

      <div className="add-new">
        <div className="sec-label small-label"><Spoon size={20} /> {t('addNewFood')}</div>
        <div className="add-row">
          <input className="field" placeholder={t('foodName')} aria-label={t('foodName')} value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addNew())} />
          <select className="field" aria-label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {FOOD_CATS.map((c) => <option key={c.id} value={c.id}>{c.icon} {t(c.id)}</option>)}
          </select>
          <button className="btn" onClick={addNew}>{t('add')}</button>
        </div>
      </div>
    </div>
  );
}
