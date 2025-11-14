import { Text, View } from "@/components/Themed";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

export default function AurorasScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Auroras", headerBackTitle: "Back" }} />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Auroras</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
