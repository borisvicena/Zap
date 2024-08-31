import { supabase } from "@/utils/supabase";
import { Redirect, router } from "expo-router";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/(tabs)/home");
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/(auth)/onboarding");
      }
    });
  }, []);
}
