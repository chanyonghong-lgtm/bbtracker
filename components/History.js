'use client';
import { useSettings } from '@/lib/i18n';
import { addDays, sameDay, startOfDay, startOfWeek } from '@/lib/time';
import Timeline, { DaySummary } from './Timeline';
import { Chevron } from './Icons';

export default function History({ entries, day, setDay, profiles, onOpen }) {
  const { t } = useSettings();
  const ws = startOfWeek(day);
  const today = startOfDay(new Date());
  const days = [0, 1, 2, 3, 4, 5, 6].map((i) => addDays(ws, i));
  const hasData = (d) => entries.some((e) => sameDay(e.start_at, d));

  return (
    <>
      <div className="week">
        <button className="arrow" onClick={() => setDay(addDays(day, -7))} aria-label="Previous week"><Chevron dir="left" size={24} /></button>
        <div className="days">
          {days.map((d, i) => (
            <button
              key={i}
              disabled={d > today}
              aria-pressed={sameDay(d, day)}
              className={`day ${sameDay(d, day) ? 'sel' : ''} ${sameDay(d, today) ? 'today' : ''}`}
              onClick={() => setDay(d)}
            >
              <span className="dow">{t('week')[i]}</span>
              <span className="dnum">{d.getDate()}</span>
              <span className={`dot ${hasData(d) ? 'on' : ''}`} />
            </button>
          ))}
        </div>
        <button
          className="arrow"
          disabled={addDays(ws, 7) > today}
          onClick={() => setDay(new Date(Math.min(addDays(day, 7), today)))}
          aria-label="Next week"
        ><Chevron size={24} /></button>
      </div>

      <DaySummary entries={entries} day={day} />
      <Timeline entries={entries} day={day} profiles={profiles} onOpen={onOpen} emptyText={t('emptyPast')} />
    </>
  );
}
