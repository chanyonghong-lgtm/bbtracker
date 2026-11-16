'use client';
import { useSettings } from '@/lib/i18n';
import { addDays, sameDay, startOfDay } from '@/lib/time';

export default function Trends({ entries }) {
  const { t, lang } = useSettings();
  const today = startOfDay(new Date());
  const days = [6, 5, 4, 3, 2, 1, 0].map((n) => addDays(today, -n));

  const sleepH = days.map((d) => {
    const s0 = d, s1 = addDays(d, 1);
    const ms = entries.filter((e) => e.type === 'sleep').reduce((sum, e) => {
      const a = Math.max(new Date(e.start_at), s0);
      const b = Math.min(e.end_at ? new Date(e.end_at) : new Date(), s1);
      return sum + Math.max(0, b - a);
    }, 0);
    return Math.round((ms / 3600000) * 10) / 10;
  });
  const count = (fn) => days.map((d) => entries.filter((e) => sameDay(e.start_at, d) && fn(e)).length);
  const meals = count((e) => e.type === 'solids');
  const poos = count((e) => e.type === 'diaper' && ['dirty', 'mixed'].includes(e.data?.kind));
  const label = (d) => (lang === 'zh' ? t('week')[(d.getDay() + 6) % 7] : d.toLocaleDateString('en-SG', { weekday: 'narrow' }));

  return (
    <>
      <h2 className="section-title">{t('last7')}</h2>
      <Bars title={t('sleepPerDay')} values={sleepH} days={days} label={label} color="var(--sleep-strong)" t={t} />
      <Bars title={t('mealsPerDay')} values={meals} days={days} label={label} color="var(--solids-strong)" t={t} />
      <Bars title={t('poosPerDay')} values={poos} days={days} label={label} color="var(--diaper-strong)" t={t} />
    </>
  );
}

function Bars({ title, values, days, label, color, t }) {
  const max = Math.max(1, ...values);
  const avg = Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;
  const W = 320, H = 150, top = 22, bottom = 26, gap = 10;
  const bw = (W - gap * 8) / 7;
  return (
    <section className="chart-card">
      <div className="chart-head">
        <h3>{title}</h3>
        <span className="muted">{t('avg', { v: avg })}</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={title}>
        <line x1="0" x2={W} y1={H - bottom} y2={H - bottom} stroke="var(--line)" />
        {values.map((v, i) => {
          const h = ((H - top - bottom) * v) / max;
          const x = gap + i * (bw + gap);
          const isToday = i === 6;
          return (
            <g key={i}>
              <rect x={x} y={H - bottom - h} width={bw} height={Math.max(h, v ? 2 : 0)} rx="6" fill={color} opacity={isToday ? 1 : 0.75} />
              <text x={x + bw / 2} y={H - bottom - h - 6} textAnchor="middle" fontSize="13" fill="var(--ink)" fontWeight={isToday ? 700 : 400}>{v}</text>
              <text x={x + bw / 2} y={H - 7} textAnchor="middle" fontSize="13" fill="var(--muted)" fontWeight={isToday ? 700 : 400}>{label(days[i])}</text>
            </g>
          );
        })}
      </svg>
    </section>
  );
}
