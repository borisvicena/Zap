import React from "react";
import Swiper from "react-native-swiper";
import { View, StyleSheet } from "react-native";
import WelcomeScreen from "../../components/Onboarding/Welcome";
import AboutScreen from "../../components/Onboarding/About";
import { Stack } from "expo-router";
import Auth from "@/components/Auth";

export default function Onboarding() {
  return (
    <Swiper
      loop={false}
      showsPagination={true}
      dotStyle={{ backgroundColor: "#433D8B" }} // Darker pagination dots
      activeDotStyle={{ backgroundColor: "#C8ACD6" }} // Darker active dot
    >
      <View style={styles.slide}>
        <WelcomeScreen />
      </View>
      <View style={styles.slide}>
        <AboutScreen />
      </View>
      <View style={styles.slide}>
        <Auth />
      </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: "#17153B"
  },
});
