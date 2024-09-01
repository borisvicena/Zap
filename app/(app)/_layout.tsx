import { Stack } from "expo-router";
import ChatProvider from "../providers/ChatProvider";

export default function TabsLayout() {
  return (
    <ChatProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ChatProvider>
  );
}
