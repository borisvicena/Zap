import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { useAuth } from "../providers/AuthProvider";
import UserListItem from "@/components/UserListItem";

export default function UsersScreen() {
  const [users, setUsers] = useState<any>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      let { data: profiles, error } = await supabase.from("profiles").select("*").neq("id", user?.id);
      setUsers(profiles);
    };
    fetchUsers();
  }, []);

  return (
    <FlatList data={users} contentContainerStyle={{ gap: 5 }} renderItem={({ item }) => <UserListItem user={item} />} />
  );
}
