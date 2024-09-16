import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { ChannelPreviewProps, Skeleton, useChatContext } from "stream-chat-expo";
import { useAuth } from "@/app/providers/AuthProvider";
import { router } from "expo-router";

const CustomChannelUI: React.FC<ChannelPreviewProps> = (props) => {
  const { channel } = props;
  const { cid } = channel;
  const { client } = useChatContext();
  const { user } = useAuth();
  const [otherUserName, setOtherUserName] = useState("Loading...");
  const [avatarURL, setAvatarURL] = useState("");
  const [lastMessage, setLastMessage] = useState(channel.state.messages[channel.state.messages.length - 1]);

  useEffect(() => {
    const fetchChannelData = async () => {
      const fetchedChannel = await client.channel(channel.type, channel.id).watch();

      // Extract members excluding the current user
      const otherMembers = fetchedChannel.members.filter((member) => member.user_id !== user?.id);

      // Assuming it's a one-on-one chat, get the first other member
      if (otherMembers.length > 0) {
        setAvatarURL(otherMembers[0].user?.image || "");
        setOtherUserName(otherMembers[0].user?.name || "Unknown User");
      } else {
        setOtherUserName("No other members");
      }
    };

    fetchChannelData();
  }, [channel, client, user]);

  return (
    <>
      <TouchableOpacity style={styles.container} onPressOut={() => router.push(`/channel/${cid}`)}>
        <Image style={styles.channelImage} src={avatarURL} />
        <View style={styles.textContainer}>
          <Text style={styles.channelName}>{otherUserName}</Text>
          <Text style={styles.latestMessage}>placeholder</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#2E236C",
  },
  channelImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  textContainer: {
    marginLeft: 10,
  },
  channelName: {
    fontWeight: "bold",
    color: "white",
  },
  latestMessage: {
    color: "gray",
  },
});

export default CustomChannelUI;
