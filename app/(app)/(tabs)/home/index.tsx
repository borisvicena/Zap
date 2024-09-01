import { useAuth } from "@/app/providers/AuthProvider";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Channel, ChannelList, MessageInput, MessageList } from "stream-chat-expo";

export default function Home() {
  const [channel, setChannel] = useState();
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Blare!</Text>
      <Text style={styles.intro}>Your hub for free speech and community discussions.</Text>
      <Text style={styles.channels}>Channels</Text>
      <ChannelList
        filters={{ members: { $in: [user?.id] } }}
        onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FAFAFA",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  intro: {
    fontSize: 16,
    marginBottom: 16,
    color: "#666",
  },
  channels: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "bold",
    fontSize: 20,
  },
});
