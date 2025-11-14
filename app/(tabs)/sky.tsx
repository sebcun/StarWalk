import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

export default function SkyScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const skyCategories = [
    { title: "Stars", route: "/stars" },
    { title: "Satellites", route: "/satellites" },
    { title: "Auroras", route: "/auroras" },
    { title: "Planets", route: "/planets" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sky</Text>
        <View style={styles.categoriesContainer}>
          {skyCategories.map((category) => (
            <TouchableOpacity
              key={category.title}
              style={[
                styles.categoryCard,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => router.push(category.route as any)}
            >
              <Text style={[styles.categoryTitle, { color: colors.text }]}>
                {category.title}
              </Text>
              <Text
                style={[
                  styles.categorySubtitle,
                  { color: colors.secondaryText },
                ]}
              >
                Tap to view
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
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
  categoriesContainer: {
    gap: 16,
  },
  categoryCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  categoryIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 14,
  },
});
