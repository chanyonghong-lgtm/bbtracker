// Hand-drawn style line icons (stroke uses currentColor; the soft fill uses --blob).
const S = ({ children, size = 28, blob }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {blob && <circle cx="13" cy="19" r="9" fill={blob} stroke="none" />}
    {children}
  </svg>
);

export const Moon = (p) => (
  <S {...p}><path d="M20 5a11 11 0 1 0 7 17A9 9 0 0 1 20 5z" /><path d="M24 7l.8 1.8 1.9.2-1.4 1.3.4 1.9-1.7-1-1.7 1 .4-1.9-1.4-1.3 1.9-.2z" /></S>
);
export const Sun = (p) => (
  <S {...p}><circle cx="16" cy="16" r="5.5" /><path d="M16 3v3M16 26v3M3 16h3M26 16h3M6.8 6.8l2.1 2.1M23.1 23.1l2.1 2.1M6.8 25.2l2.1-2.1M23.1 8.9l2.1-2.1" /></S>
);
export const Spoon = (p) => (
  <S {...p}><ellipse cx="12" cy="10" rx="5" ry="6.5" transform="rotate(-30 12 10)" /><path d="M15 15l9.5 12" /></S>
);
export const Diaper = (p) => (
  <S {...p}><path d="M4 8h24v4c0 8-5 13-12 13S4 20 4 12z" /><path d="M4 12c4 0 6 3 7 8M28 12c-4 0-6 3-7 8" /><path d="M7 8v-1M25 8v-1" /></S>
);
export const Drop = (p) => (
  <S {...p}><path d="M16 4c5 7 8 11 8 15a8 8 0 0 1-16 0c0-4 3-8 8-15z" /></S>
);
export const Poo = (p) => (
  <S {...p}><path d="M8 26h16a3 3 0 0 0 0-6h-1a3 3 0 0 0-2-5h-1a3 3 0 0 0-4-4c0-2 1-4 2-5-4 0-6 2-6 5a3 3 0 0 0-2 4 3 3 0 0 0-2 5 3 3 0 0 0 0 6z" /></S>
);
export const Both = (p) => (
  <S {...p}><path d="M10 4c3 4 5 7 5 9a5 5 0 0 1-10 0c0-2 2-5 5-9z" /><path d="M14 28h12a2.5 2.5 0 0 0 0-5h-.5a2.5 2.5 0 0 0-2-4h-1a2.5 2.5 0 0 0-3-3c0-1.5.5-3 1.5-4-3 0-5 1.5-5 4a2.5 2.5 0 0 0-1.5 3.5 2.5 2.5 0 0 0-.5 8.5z" /></S>
);
export const Dry = (p) => (
  <S {...p}><path d="M4 9h24v3c0 8-5 13-12 13S4 20 4 12z" /><path d="M11 17l3 3 7-7" /></S>
);
export const Today = (p) => (
  <S {...p}><circle cx="16" cy="16" r="5" /><path d="M16 4v3M16 25v3M4 16h3M25 16h3M7.5 7.5l2 2M22.5 22.5l2 2M7.5 24.5l2-2M22.5 9.5l2-2" /></S>
);
export const Calendar = (p) => (
  <S {...p}><rect x="5" y="7" width="22" height="20" rx="3" /><path d="M5 13h22M11 4v5M21 4v5" /></S>
);
export const Chart = (p) => (
  <S {...p}><path d="M5 26h22" /><path d="M9 22v-6M15 22V9M21 22v-9" /></S>
);
export const People = (p) => (
  <S {...p}><circle cx="12" cy="11" r="4" /><circle cx="22" cy="13" r="3" /><path d="M4 26c0-5 4-8 8-8s8 3 8 8M19 20c4-1 9 1 9 6" /></S>
);
export const Close = (p) => (<S {...p}><path d="M8 8l16 16M24 8L8 24" /></S>);
export const Check = (p) => (<S {...p}><path d="M7 17l6 6L25 9" /></S>);
export const Chevron = ({ dir = 'right', ...p }) => (
  <S {...p}><path d={dir === 'left' ? 'M19 7l-8 9 8 9' : 'M13 7l8 9-8 9'} /></S>
);
export const Plus = (p) => (<S {...p}><path d="M16 7v18M7 16h18" /></S>);
export const Pencil = (p) => (<S {...p}><path d="M6 26l1-6L21 6l5 5-14 14z" /></S>);
