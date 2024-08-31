import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          title: "Home",
          tabBarIcon: ({ color }) => <FontAwesome size={28} style={{ marginBottom: -3 }} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          tabBarLabel: "Chats",
          title: "Chats",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} style={{ marginBottom: -3 }} name="comments" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          title: "Settings",
          tabBarIcon: ({ color }) => <FontAwesome size={28} style={{ marginBottom: -3 }} name="gear" color={color} />,
        }}
      />
    </Tabs>
  );
}
