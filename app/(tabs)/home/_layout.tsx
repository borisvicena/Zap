import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: true, title: "Home" }} />
      <Stack.Screen name="next-page" options={{ headerShown: true, title: "Next Page" }} />
    </Stack>
  );
}
