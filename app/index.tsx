import { supabase } from "@/utils/supabase";
import { Redirect, router, Slot, Stack } from "expo-router";
import { useEffect } from "react";

export default function App() {
  return <Redirect href="/(auth)/onboarding" />;
}
