import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: "#17153B" }}}>
      <Stack.Screen name="index" options={{ headerShown: true, title: "Settings" }} />
      <Stack.Screen name="account" options={{ headerShown: true, title: "Account" }} />
    </Stack>
  );
}
