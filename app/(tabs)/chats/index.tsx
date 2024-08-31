import { useEffect, useState } from "react";
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { supabase } from "@/utils/supabase";

export default function ChatList() {
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      const { data, error } = await supabase.from("chats").select("*");
      if (error) console.error("Error fetching chats:", error);
      else setChats(data);
    };

    fetchChats();
  }, []);

  return (
    <FlatList
      data={chats}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.chatItem}
          onPress={() => {
            /* Navigate to chat */
          }}
        >
          <Text style={styles.chatName}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  chatItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
