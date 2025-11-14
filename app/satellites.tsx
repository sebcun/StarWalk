import { Text } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

export default function SatellitesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <>
      <Stack.Screen
        options={{ title: "Satellites", headerBackTitle: "Back" }}
      />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>Satellites</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
