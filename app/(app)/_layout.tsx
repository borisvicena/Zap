import { Redirect, Stack } from "expo-router";
import ChatProvider from "../providers/ChatProvider";
import { useAuth } from "../providers/AuthProvider";
import { color } from "@rneui/themed/dist/config";

export default function TabsLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/(auth)/onboarding" />;
  }

  return (
    <ChatProvider>
      <Stack screenOptions={{ headerStyle: { backgroundColor: "#17153B" } }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="channel"
          options={{ headerShown: true, headerTintColor: "#FFF", title: "Chat", headerBackTitle: "Home" }}
        />
      </Stack>
    </ChatProvider>
  );
}
