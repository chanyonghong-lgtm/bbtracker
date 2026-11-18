'use client';
import { useSettings } from '@/lib/i18n';
import { ago, ageMonths, fmtDur, fmtTime, sameDay } from '@/lib/time';
import { DIAPER_LABEL, MILK_GUIDE_ML, foodName, isMilkOnly, milkMl } from '@/lib/constants';
import { bandFor, tipOfDay } from '@/lib/tips';
import Timeline, { DaySummary, DIAPER_ICON } from './Timeline';
import { Bottle, Bulb, Chevron, Diaper, Moon, Plus, Spoon, Sun } from './Icons';

const latest = (entries, fn) => { for (let i = entries.length - 1; i >= 0; i--) if (fn(entries[i])) return entries[i]; return null; };

export default function Home({ entries, profiles, child, quick, onOpen, onTips }) {
  const { t, lang } = useSettings();
  const now = new Date();
  const sleeping = latest(entries, (e) => e.type === 'sleep' && !e.end_at);
  const lastSleep = latest(entries, (e) => e.type === 'sleep' && e.end_at);
  const lastMeal = latest(entries, (e) => e.type === 'solids' && !isMilkOnly(e));
  const lastMilkEntry = latest(entries, (e) => milkMl(e) > 0);
  const lastDiaper = latest(entries, (e) => e.type === 'diaper');
  const milkToday = entries.filter((e) => sameDay(e.start_at, now)).reduce((s, e) => s + milkMl(e), 0);
  const pct = Math.min(100, (milkToday / MILK_GUIDE_ML) * 100);

  const { band, missing } = bandFor(ageMonths(child.birthdate));
  const tip = tipOfDay(band, now);

  return (
    <>
      <section className="tiles" aria-label={t('today')}>
        {/* Sleep */}
        <div className={`tile ${sleeping ? 'is-asleep' : ''}`} style={{ '--c': 'var(--sleep)' }}>
          <div className="tile-top">
            <div className="tile-icon">{sleeping ? <Moon size={34} /> : <Sun size={34} />}</div>
            <div className="tile-info">
              <div className="tile-label">{t('sleep')}</div>
              {sleeping ? (
                <div className="tile-status"><span className="live" />{t('asleepFor')} {fmtDur(now - new Date(sleeping.start_at), lang)}</div>
              ) : (
                <div className="tile-status">{lastSleep ? `${t('awakeFor')} ${fmtDur(now - new Date(lastSleep.end_at), lang)}` : t('nothingYet')}</div>
              )}
              <div className="tile-sub">
                {sleeping ? `${t('fellAsleep')} ${fmtTime(sleeping.start_at, lang)}` : lastSleep ? `${t('wokeUp')} ${fmtTime(lastSleep.end_at, lang)}` : ''}
              </div>
            </div>
          </div>
          <button className="btn primary block big" onClick={() => quick.sleepToggle(sleeping)}>
            {sleeping ? <><Sun size={24} /> {t('wokeUp')}</> : <><Moon size={24} /> {t('fellAsleep')}</>}
          </button>
          <button className="linkbtn small" onClick={() => onOpen({ type: 'sleep' })}>{t('addPastSleep')}</button>
        </div>

        {/* Food & milk */}
        <div className="tile" style={{ '--c': 'var(--solids)' }}>
          <div className="tile-top">
            <div className="tile-icon"><Spoon size={34} /></div>
            <div className="tile-info">
              <div className="tile-label">{t('food')}</div>
              <div className="tile-status">{lastMeal ? `${t(lastMeal.data?.meal || 'meal')} · ${ago(lastMeal.start_at, t, lang)}` : t('nothingYet')}</div>
              {lastMeal && <div className="tile-sub clamp">{(lastMeal.data?.foods || []).map((f) => foodName(f, t)).join(', ')}</div>}
            </div>
          </div>
          <div className="milk-meter" aria-label={t('milkToday', { ml: milkToday })}>
            <div className="milk-row">
              <span className="milk-today"><Bottle size={22} /> {t('milkToday', { ml: milkToday })}</span>
              {lastMilkEntry && <span className="muted small">{ago(lastMilkEntry.start_at, t, lang)}</span>}
            </div>
            <div className="meter"><div className="meter-fill" style={{ width: `${pct}%` }} /></div>
            <div className="muted small">{t('milkGuide', { ml: MILK_GUIDE_ML })}</div>
          </div>
          <div className="pair">
            <button className="btn primary big" onClick={() => onOpen({ type: 'solids' })}><Plus size={22} /> {t('logFood')}</button>
            <button className="btn primary big milk-btn" onClick={() => onOpen({ type: 'milk' })}><Bottle size={22} /> {t('logMilk')}</button>
          </div>
        </div>

        {/* Diaper */}
        <div className="tile" style={{ '--c': 'var(--diaper)' }}>
          <div className="tile-top">
            <div className="tile-icon"><Diaper size={34} /></div>
            <div className="tile-info">
              <div className="tile-label">{t('diaper')}</div>
              <div className="tile-status">{lastDiaper ? `${t(DIAPER_LABEL[lastDiaper.data?.kind] || 'diaper')} · ${ago(lastDiaper.start_at, t, lang)}` : t('nothingYet')}</div>
            </div>
          </div>
          <div className="quad">
            {['wet', 'dirty', 'mixed'].map((k) => {
              const I = DIAPER_ICON[k];
              return (
                <button key={k} className="btn quick" onClick={() => quick.diaper(k)}>
                  <I size={30} />
                  <span>{t(DIAPER_LABEL[k])}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tip of the day */}
        {!missing && (
          <button className="tip-card" onClick={onTips}>
            <div className="tip-head">
              <span className="tip-icon"><Bulb size={24} /></span>
              <span className="tip-kicker">{t('tipOfDay')} · {t(`topic_${tip.topic}`)}</span>
            </div>
            <p>{tip[lang] || tip.en}</p>
            <span className="tip-more">{t('moreTips')} <Chevron size={18} /></span>
          </button>
        )}
      </section>

      <h2 className="section-title">{t('today')}</h2>
      <DaySummary entries={entries} day={now} />
      <Timeline entries={entries} day={now} profiles={profiles} onOpen={onOpen} emptyText={t('emptyDay')} />
    </>
  );
}
