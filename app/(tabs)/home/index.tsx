import { Link } from "expo-router";
import { Text, StyleSheet, Button, ScrollView } from "react-native";

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Welcome to Blare!</Text>
      <Text style={styles.intro}>Your hub for free speech and community discussions.</Text>
      <Link href={"/(tabs)/chats"} style={styles.link}>
        <Text style={styles.linkText}>Start a Chat</Text>
      </Link>
      {/* Add more components below */}
    </ScrollView>
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
  link: {
    marginTop: 16,
  },
  linkText: {
    fontWeight: "bold",
    color: "#007BFF",
  },
});
