import React from "react";
import { View, Text } from "react-native";

export default function WelcomeScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-y-4">
      <Text className="font-extrabold text-3xl">Welcome to Blare</Text>
      <Text className="text-base text-center">Your platform for free speech</Text>
    </View>
  );
}
