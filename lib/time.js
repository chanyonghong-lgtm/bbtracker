export const DAY = 86400000;

export const startOfDay = (d) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
export const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
export const startOfWeek = (d) => { const x = startOfDay(d); return addDays(x, -((x.getDay() + 6) % 7)); }; // Monday
export const sameDay = (a, b) => startOfDay(a).getTime() === startOfDay(b).getTime();

const loc = (lang) => (lang === 'zh' ? 'zh-CN' : 'en-SG');

export const fmtTime = (d, lang = 'en') =>
  lang === 'zh'
    ? new Date(d).toLocaleTimeString('zh-CN', { hour: 'numeric', minute: '2-digit' })
    : new Date(d).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }).replace(/\s/g, '').toLowerCase();

export const fmtDate = (d, lang = 'en') =>
  new Date(d).toLocaleDateString(loc(lang), { weekday: 'short', day: 'numeric', month: 'short' });

export const fmtDur = (ms, lang = 'en') => {
  const m = Math.max(0, Math.round(ms / 60000));
  const h = Math.floor(m / 60);
  if (lang === 'zh') return h ? `${h}小时${m % 60 ? `${m % 60}分` : ''}` : `${m}分钟`;
  return h ? `${h}h ${m % 60}m` : `${m}m`;
};

export const ago = (d, t, lang) => {
  const ms = Date.now() - new Date(d).getTime();
  if (ms < 60000) return t('justNow');
  if (ms < DAY) return t('ago', { t: fmtDur(ms, lang) });
  const days = Math.floor(ms / DAY);
  return t('ago', { t: lang === 'zh' ? `${days}天` : `${days} day${days > 1 ? 's' : ''}` });
};

export const ageText = (birthdate, t) => {
  if (!birthdate) return '';
  const b = new Date(birthdate), n = new Date();
  let m = (n.getFullYear() - b.getFullYear()) * 12 + n.getMonth() - b.getMonth();
  if (n.getDate() < b.getDate()) m--;
  const y = Math.floor(m / 12);
  return [y ? t('ageY', { y }) : '', m % 12 ? t('ageM', { m: m % 12 }) : ''].filter(Boolean).join(' ');
};

export const toInput = (d) => {
  const x = new Date(d);
  return new Date(x.getTime() - x.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};
