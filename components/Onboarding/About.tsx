import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
    <View className="flex-1 justify-center items-center gap-y-4 m-6">
      <Text className="font-extrabold text-3xl">About Blare</Text>
      <Text className="text-base text-center">
        Blare is a platform designed to give everyone a voice. Speak your mind, share your thoughts, and connect with
        others.
      </Text>
    </View>
  );
}
