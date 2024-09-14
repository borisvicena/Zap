import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { User } from "@supabase/supabase-js";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Avatar from "@/components/Avatar";

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<{
    username: string;
    full_name: string;
    website: string;
    avatar_url: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    website: "",
    avatar_url: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) {
        Alert.alert("Error Accessing User", userError.message);
        return;
      }
      if (user) {
        setUser(user);
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("username, full_name, website, avatar_url")
          .eq("id", user.id)
          .single();

        if (profileError) {
          Alert.alert("Error fetching profile", profileError.message);
        } else if (profileData) {
          setProfile(profileData);
          setFormData({
            username: profileData.username,
            full_name: profileData.full_name,
            website: profileData.website,
            avatar_url: profileData.avatar_url,
          });
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    if (!user) return;

    setLoading(true);
    const updates = {
      id: user.id,
      ...formData,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);
    if (error) {
      Alert.alert("Error updating profile", error.message);
    } else {
      Alert.alert("Profile updated successfully");
    }
    setLoading(false);
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loadingIndicator} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Edit Profile</Text>
        <View style={{ alignItems: "center" }}>
          <Avatar
            size={200}
            url={formData.avatar_url}
            onUpload={(url: string) => setFormData({ ...formData, avatar_url: url })}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={formData.full_name}
          onChangeText={(text) => setFormData({ ...formData, full_name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={formData.username}
          onChangeText={(text) => setFormData({ ...formData, username: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Website"
          value={formData.website}
          onChangeText={(text) => setFormData({ ...formData, website: text })}
        />
        <TouchableOpacity onPress={handleUpdateProfile} style={styles.button}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#17153B",
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFF",
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {
    height: 50,
    backgroundColor: "#2E236C",
    borderColor: "#C8ACD6",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: "#FFF",
  },
  button: {
    backgroundColor: "#433D8B",
    borderRadius: 12,
    paddingVertical: 14,
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
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
