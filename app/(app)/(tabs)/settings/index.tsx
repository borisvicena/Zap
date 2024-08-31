import { supabase } from "@/utils/supabase";
import { User } from "@supabase/supabase-js";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  View,
  Image,
} from "react-native";

export default function Settings() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) {
        Alert.alert("Error Accessing User", userError.message);
        router.replace("/(auth)/onboarding");
      }
      if (user) {
        setUser(user);
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error Signing Out", error.message);
    } else {
      setUser(null);
      Alert.alert("Signed Out Successfully");
      router.replace("/(auth)/onboarding");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loadingIndicator} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {user ? (
          <>
            <View style={styles.profileContainer}>
              <Text style={styles.profileName}>{user.email}</Text>
            </View>
            <TouchableOpacity onPress={() => router.push("/(tabs)/settings/account")} style={styles.button}>
              <Text style={styles.buttonText}>Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignOut} style={styles.logOutBtnContainer}>
              <Text style={styles.logOutBtn}>Log Out</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.noUserText}>No user information available</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scrollView: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    padding: 16,
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: "center",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  button: {
    marginVertical: 10,
    backgroundColor: "#007BFF",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
  logOutBtnContainer: {
    marginTop: 20,
    backgroundColor: "#FF3B30",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  logOutBtn: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
  noUserText: {
    fontSize: 18,
    color: "#888888",
    textAlign: "center",
    marginTop: 20,
  },
});
