import { useAuth } from "@/app/providers/AuthProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link, router, Stack } from "expo-router";
import { useState } from "react";
import {Text, StyleSheet, View, Image} from "react-native";
import { Channel, ChannelList, MessageInput, MessageList } from "stream-chat-expo";
import CustomListUI from "@/components/CustomListUI";
import CustomChannelUI from "@/components/CustomChannelUI";

export default function Home() {
  const [channel, setChannel] = useState();
  const { user } = useAuth();

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#17153B"
          },
          headerRight: () => (
            <Link href={"/(app)/users"} asChild>
              <FontAwesome5 name="plus" size={22} color="blue" style={{marginHorizontal: 15}} />
            </Link>
          ),
        }}
      />
      <View style={styles.container}>
        <ChannelList
          List={CustomListUI} // Custom list UI
          filters={{ members: { $in: [user?.id || null] }}}
          onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#FFF",
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
  channelPreviewContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  channelImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  channelTextContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  channelTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  latestMessage: {
    fontSize: 14,
    color: "#CCC",
  },
});
