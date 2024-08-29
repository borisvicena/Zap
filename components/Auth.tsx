import React, { useState } from "react";
import { Alert, Text, View, AppState, StyleSheet } from "react-native";
import { Button, Input } from "@rneui/themed";
import { supabase } from "@/utils/supabase";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View className="flex-1 justify-center items-center m-6 gap-y-2">
      <View className="w-full">
        <Text className="w-full text-center mb-12 font-extrabold text-2xl">Create account with Blare</Text>
      </View>
      <View className="w-full">
        <Input
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="welcome@blare.app"
          autoCapitalize={"none"}
        />
      </View>
      <View className="w-full">
        <Input
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <View className="w-full">
        <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
      </View>
      <View className="w-full">
        <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
      </View>
    </View>
  );
}
