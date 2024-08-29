import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import Auth from "@/components/Auth";
import Account from "@/components/Account";
import { View } from "react-native";
import { Session } from "@supabase/supabase-js";
import Onboarding from "./onboarding";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return <>{session && session.user ? <Account key={session.user.id} session={session} /> : <Onboarding />}</>;
}
