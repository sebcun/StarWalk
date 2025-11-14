import { Text, View } from "@/components/Themed";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

export default function SatellitesScreen() {
  return (
    <>
      <Stack.Screen
        options={{ title: "Satellites", headerBackTitle: "Back" }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Satellites</Text>
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
