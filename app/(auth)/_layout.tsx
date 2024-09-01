import { Redirect, Stack } from "expo-router";
import { useAuth } from "../providers/AuthProvider";

export default function AuthLayout() {
  const { user } = useAuth();

  if (user) {
    return <Redirect href="/(app)/(tabs)/home" />;
  }

  return (
    <Stack>
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
    </Stack>
  );
}
