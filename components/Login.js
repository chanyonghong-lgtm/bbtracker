'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useSettings } from '@/lib/i18n';
import { LangSwitch } from './Account';

export default function Login() {
  const { t } = useSettings();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  async function signIn(e) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) setMsg({ err: error.message });
    setBusy(false);
  }

  async function reset() {
    if (!email) return setMsg({ err: t('enterEmail') });
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: window.location.origin });
    setMsg(error ? { err: error.message } : { ok: t('resetSent') });
  }

  return (
    <div className="center">
      <form className="login" onSubmit={signIn}>
        <LangSwitch />
        <div className="login-mark"><img src="/icon.svg" alt="" width="84" height="84" /></div>
        <h1>{t('appName')}</h1>
        <p className="muted">{t('familySignIn')}</p>
        <label className="field-label" htmlFor="email">{t('email')}</label>
        <input id="email" className="field" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label className="field-label" htmlFor="pw">{t('password')}</label>
        <div className="pw">
          <input id="pw" className="field" type={showPw ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="button" className="pw-toggle" onClick={() => setShowPw(!showPw)}>{showPw ? t('hide') : t('show')}</button>
        </div>
        {msg?.err && <div className="err">{msg.err}</div>}
        {msg?.ok && <div className="ok">{msg.ok}</div>}
        <button className="btn primary block big" disabled={busy}>{busy ? t('signingIn') : t('signIn')}</button>
        <button type="button" className="linkbtn" onClick={reset}>{t('forgot')}</button>
      </form>
    </div>
  );
}
