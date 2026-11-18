'use client';
import { useSettings } from '@/lib/i18n';
import { ageMonths, ageText, nextBirthday } from '@/lib/time';
import { SOURCES, bandFor, nextBand } from '@/lib/tips';
import { Bulb, Check } from './Icons';

const TOPIC_ORDER = ['talk', 'play', 'move', 'social', 'feel', 'self', 'sleep', 'food', 'screen', 'school', 'safe', 'teeth'];

export default function Tips({ child, onFamily }) {
  const { t, lang } = useSettings();
  const months = ageMonths(child.birthdate);
  const { band, outside, missing } = bandFor(months);
  const next = nextBand(band);
  const bday = nextBirthday(child.birthdate);
  const L = (o) => o[lang] || o.en;

  if (missing) {
    return (
      <div className="tips">
        <div className="panel">
          <p>{t('needBirthdate')}</p>
          <button className="btn primary block" onClick={onFamily}>{t('family')}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="tips">
      <section className="tips-hero">
        <div className="tip-icon big"><Bulb size={30} /></div>
        <div>
          <div className="tips-age">{child.name} · {ageText(child.birthdate, t)}</div>
          {bday && bday.days <= 60 && (
            <div className="tips-bday">{bday.days === 0 ? t('birthdayToday', { n: bday.turns }) : t('birthdayIn', { n: bday.turns, d: bday.days })}</div>
          )}
          <div className="muted small">{t('nowLabel')}: {L(band.title)}</div>
        </div>
      </section>
      {outside && <p className="muted small tips-note">{t('tipsRange')}</p>}

      <BandTips band={band} L={L} t={t} />

      {next && (
        <details className="panel next-band">
          <summary><span>{t('nextLabel')}: {L(next.title)}</span></summary>
          <BandTips band={next} L={L} t={t} nested />
        </details>
      )}

      <section className="panel">
        <h3>{t('whenToCheck')}</h3>
        <p className="small">{t('whenToCheckText')}</p>
      </section>

      <section className="sources">
        <h3>{t('sources')}</h3>
        <ul>
          {SOURCES.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.label}</a></li>)}
        </ul>
      </section>
    </div>
  );
}

function BandTips({ band, L, t, nested }) {
  const groups = TOPIC_ORDER.map((topic) => [topic, band.tips.filter((x) => x.topic === topic)]).filter(([, list]) => list.length);
  return (
    <div className={nested ? 'band nested' : 'band'}>
      <section className="panel">
        <h3>{t('milestones')}: {L(band.milestoneTitle)}</h3>
        <p className="muted small">{t('milestonesIntro')}</p>
        <ul className="milestones">
          {band.milestones.map((m, i) => <li key={i}><span className="ms-dot"><Check size={14} /></span>{L(m)}</li>)}
        </ul>
      </section>
      {groups.map(([topic, list]) => (
        <section className="tip-group" key={topic}>
          <h3>{t(`topic_${topic}`)}</h3>
          <ul>
            {list.map((x, i) => <li key={i}>{L(x)}</li>)}
          </ul>
        </section>
      ))}
    </div>
  );
}
