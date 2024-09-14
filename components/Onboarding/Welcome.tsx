import React from "react";
import {View, Text, Image, StyleSheet} from "react-native";

export default function WelcomeScreen() {
  return (
    <View className="flex-1 items-center gap-y-2 mt-52">
        <Image style={styles.stretch} source={require('@/assets/images/welcome.png')} />
        <Text className="font-extrabold text-3xl text-white">Welcome to Zap</Text>
        <Text className="text-base text-center text-gray-200">Your platform for free speech</Text>
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