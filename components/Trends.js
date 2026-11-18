'use client';
import { useSettings } from '@/lib/i18n';
import { addDays, startOfDay } from '@/lib/time';
import { MILK_GUIDE_ML } from '@/lib/constants';
import { dayTotals } from './Timeline';

export default function Trends({ entries }) {
  const { t, lang } = useSettings();
  const today = startOfDay(new Date());
  const days = [6, 5, 4, 3, 2, 1, 0].map((n) => addDays(today, -n));
  const totals = days.map((d) => dayTotals(entries, d));
  const label = (d) => (lang === 'zh' ? t('week')[(d.getDay() + 6) % 7] : d.toLocaleDateString('en-SG', { weekday: 'narrow' }));

  return (
    <>
      <h2 className="section-title">{t('last7')}</h2>
      <Bars title={t('sleepPerDay')} values={totals.map((x) => Math.round((x.sleepMs / 3600000) * 10) / 10)} days={days} label={label} color="var(--sleep-strong)" t={t} />
      <Bars title={t('mealsPerDay')} values={totals.map((x) => x.meals)} days={days} label={label} color="var(--solids-strong)" t={t} />
      <Bars title={t('milkPerDay')} values={totals.map((x) => x.milk)} days={days} label={label} color="var(--milk-strong)" t={t} guide={MILK_GUIDE_ML} />
      <Bars title={t('poosPerDay')} values={totals.map((x) => x.poos)} days={days} label={label} color="var(--diaper-strong)" t={t} />
    </>
  );
}

function Bars({ title, values, days, label, color, t, guide }) {
  const max = Math.max(1, guide || 0, ...values);
  const avg = Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;
  const W = 320, H = 160, top = 24, bottom = 26, gap = 10;
  const bw = (W - gap * 8) / 7;
  const y = (v) => H - bottom - ((H - top - bottom) * v) / max;
  return (
    <section className="chart-card">
      <div className="chart-head">
        <h3>{title}</h3>
        <span className="muted">{t('avg', { v: avg })}</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={title}>
        <line x1="0" x2={W} y1={H - bottom} y2={H - bottom} stroke="var(--line)" />
        {guide && (
          <g>
            <line x1="0" x2={W} y1={y(guide)} y2={y(guide)} stroke="var(--muted)" strokeDasharray="4 4" />
            <text x={W} y={y(guide) - 4} textAnchor="end" fontSize="11" fill="var(--muted)">{t('guideLine', { v: guide })}</text>
          </g>
        )}
        {values.map((v, i) => {
          const h = H - bottom - y(v);
          const x = gap + i * (bw + gap);
          const isToday = i === 6;
          return (
            <g key={i}>
              <rect x={x} y={y(v)} width={bw} height={Math.max(h, v ? 2 : 0)} rx="6" fill={color} opacity={isToday ? 1 : 0.75} />
              <text x={x + bw / 2} y={y(v) - 6} textAnchor="middle" fontSize="12" fill="var(--ink)" fontWeight={isToday ? 700 : 400}>{v}</text>
              <text x={x + bw / 2} y={H - 7} textAnchor="middle" fontSize="13" fill="var(--muted)" fontWeight={isToday ? 700 : 400}>{label(days[i])}</text>
            </g>
          );
        })}
      </svg>
    </section>
  );
}
