'use client';
import { useSettings } from '@/lib/i18n';
import { fmtDur, fmtTime, sameDay } from '@/lib/time';
import { COLOURS, DIAPER_LABEL, foodIcon, foodName, isMilkOnly, isPoo, isWet, milkMl, sheetTypeOf } from '@/lib/constants';
import { Bottle, Both, Chevron, Diaper, Drop, Dry, Moon, Poo, Spoon } from './Icons';

export const DIAPER_ICON = { wet: Drop, dirty: Poo, mixed: Both, dry: Dry };

export function entriesForDay(entries, day) {
  return entries
    .filter((e) => sameDay(e.start_at, day) || (e.type === 'sleep' && (e.end_at ? sameDay(e.end_at, day) : sameDay(new Date(), day))))
    .sort((a, b) => (a.start_at > b.start_at ? -1 : 1)); // newest first
}

// Totals for one calendar day (sleep is clipped to the day)
export function dayTotals(entries, day) {
  const start = new Date(day); start.setHours(0, 0, 0, 0);
  const end = new Date(start); end.setDate(end.getDate() + 1);
  const inDay = entries.filter((e) => sameDay(e.start_at, day));
  const sleepMs = entries.filter((e) => e.type === 'sleep').reduce((sum, e) => {
    const s = Math.max(new Date(e.start_at), start);
    const f = Math.min(e.end_at ? new Date(e.end_at) : new Date(), end);
    return sum + Math.max(0, f - s);
  }, 0);
  const diapers = inDay.filter((e) => e.type === 'diaper');
  return {
    sleepMs,
    meals: inDay.filter((e) => e.type === 'solids' && !isMilkOnly(e)).length,
    milk: inDay.reduce((s, e) => s + milkMl(e), 0),
    diapers: diapers.length,
    wets: diapers.filter((e) => isWet(e.data?.kind)).length,
    poos: diapers.filter((e) => isPoo(e.data?.kind)).length,
  };
}

export function DaySummary({ entries, day }) {
  const { t, lang } = useSettings();
  const d = dayTotals(entries, day);
  const stats = [
    [t('sleepTotal'), fmtDur(d.sleepMs, lang), 'var(--sleep)'],
    [t('meals'), d.meals, 'var(--solids)'],
    [t('milk'), `${d.milk} ${t('ml')}`, 'var(--milk)'],
    [t('changes'), d.diapers, 'var(--diaper)'],
    [t('wets'), d.wets, 'var(--diaper)'],
    [t('poos'), d.poos, 'var(--diaper)'],
  ];
  return (
    <div className="stats">
      {stats.map(([l, v, c]) => (
        <div className="stat" key={l} style={{ '--c': c }}>
          <div className="stat-v">{v}</div>
          <div className="stat-l">{l}</div>
        </div>
      ))}
    </div>
  );
}

export default function Timeline({ entries, day, profiles, onOpen, emptyText }) {
  const list = entriesForDay(entries, day);
  if (!list.length) return <div className="empty">{emptyText}</div>;
  return (
    <ol className="tl">
      {list.map((e) => (
        <li key={e.id}><Row e={e} profiles={profiles} onClick={() => onOpen({ type: sheetTypeOf(e), entry: e })} /></li>
      ))}
    </ol>
  );
}

function MilkLine({ milk }) {
  const { t } = useSettings();
  return <span className="tl-food milk">🥛 {t(`milk_${milk.kind || 'other'}`)} · {milk.ml} {t('ml')}</span>;
}

function Row({ e, profiles, onClick }) {
  const { t, lang } = useSettings();
  const d = e.data || {};
  let Icon, title, body, tone;

  if (e.type === 'sleep') {
    Icon = Moon; tone = 'var(--sleep)';
    const dur = (e.end_at ? new Date(e.end_at) : new Date()) - new Date(e.start_at);
    title = <>{t('sleep')} <span className="tl-dur">{fmtDur(dur, lang)}</span></>;
    body = (
      <>
        <div className="tl-sub">{fmtTime(e.start_at, lang)} – {e.end_at ? fmtTime(e.end_at, lang) : t('inProgress')}</div>
        <div className="bar" style={{ width: `${Math.max(6, Math.min(100, (dur / (12 * 3600000)) * 100))}%` }} />
      </>
    );
  } else if (isMilkOnly(e)) {
    Icon = Bottle; tone = 'var(--milk)';
    title = <>{t('milk')} <span className="tl-dur">{d.milk?.ml || 0} {t('ml')}</span></>;
    body = <div className="tl-sub">{t(`milk_${d.milk?.kind || 'other'}`)}</div>;
  } else if (e.type === 'solids') {
    Icon = Spoon; tone = 'var(--solids)';
    title = t(d.meal || 'meal');
    body = (
      <>
        <div className="tl-foods">
          {(d.foods || []).map((f, i) => (
            <span className="tl-food" key={i}>{foodIcon(f)} {foodName(f, t)}{f.detail ? <small> · {f.detail}</small> : null}</span>
          ))}
          {milkMl(e) > 0 && <MilkLine milk={d.milk} />}
        </div>
        {d.amount && <div className="tl-sub">{t('ate', { v: t(d.amount) })}</div>}
      </>
    );
  } else {
    Icon = DIAPER_ICON[d.kind] || Diaper; tone = 'var(--diaper)';
    title = t(DIAPER_LABEL[d.kind] || 'diaper');
    const sw = COLOURS.find((c) => c.id === d.colour);
    const parts = [d.consistency && t(d.consistency), d.colour && t(d.colour)].filter(Boolean);
    body = parts.length ? (
      <div className="tl-sub">{sw && <span className="swatch sm" style={{ background: sw.hex }} />}{parts.join(' · ')}</div>
    ) : null;
  }

  const by = profiles[e.created_by];
  const edited = e.updated_by && e.updated_by !== e.created_by ? profiles[e.updated_by] : null;

  return (
    <button className="tl-row" onClick={onClick}>
      <div className="tl-time">{fmtTime(e.start_at, lang)}</div>
      <div className="tl-icon" style={{ '--c': tone }}><Icon size={26} /></div>
      <div className="tl-main">
        <div className="tl-title">{title}</div>
        {body}
        {e.notes && <div className="tl-note">{e.notes}</div>}
        {by && <div className="tl-by">{t('by', { name: by })}{edited ? ` · ${t('editedBy', { name: edited })}` : ''}</div>}
      </div>
      <Chevron size={20} />
    </button>
  );
}
