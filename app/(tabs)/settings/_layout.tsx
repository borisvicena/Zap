import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: true, title: "Settings" }} />
      <Stack.Screen name="account" options={{ headerShown: true, title: "Account" }} />
    </Stack>
  );
}
