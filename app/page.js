'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { SettingsProvider } from '@/lib/i18n';
import Login from '@/components/Login';
import Main from '@/components/Main';

export default function Page() {
  return (
    <SettingsProvider>
      <Gate />
    </SettingsProvider>
  );
}

function Gate() {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!supabase)
    return <div className="center"><p>Missing Supabase settings. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.</p></div>;
  if (session === undefined) return <div className="center"><div className="spinner" aria-label="Loading" /></div>;
  return session ? <Main session={session} /> : <Login />;
}
