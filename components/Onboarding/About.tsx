import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function AboutScreen() {
  return (
    <View className="flex-1 items-center gap-y-2 mt-52 mx-6">
        <Image style={styles.stretch} source={require("@/assets/images/about.png")} />
      <Text className="font-extrabold text-3xl text-white">What is Zap</Text>
      <Text className="text-base text-center text-gray-200">
        Zap is a platform designed to give everyone a voice. Speak your mind, share your thoughts, and connect with
        others.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    stretch: {
        width: 300,
        height: 300,
        resizeMode: 'stretch',
    },
});