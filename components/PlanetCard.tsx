import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { Planet } from "@/types/planet";
import { StyleSheet, TouchableOpacity } from "react-native";

interface PlanetCardProps {
  planet: Planet;
  onPress: () => void;
}

export default function PlanetCard({ planet, onPress }: PlanetCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colors.cardBackground, borderColor: colors.border },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[styles.colorIndicator, { backgroundColor: planet.color }]}
      />
      <View
        style={[styles.content, { backgroundColor: colors.cardBackground }]}
      >
        <Text style={styles.name}>{planet.name}</Text>
        <Text
          style={[styles.description, { color: colors.secondaryText }]}
          numberOfLines={2}
        >
          {planet.description}
        </Text>
        <View
          style={[styles.stats, { backgroundColor: colors.cardBackground }]}
        >
          <View
            style={[styles.stat, { backgroundColor: colors.cardBackground }]}
          >
            <Text style={[styles.statValue, { color: colors.text }]}>
              {planet.moons}
            </Text>
            <Text style={[styles.statLabel, { color: colors.secondaryText }]}>
              Moons
            </Text>
          </View>
          <View
            style={[styles.stat, { backgroundColor: colors.cardBackground }]}
          >
            <Text style={[styles.statValue, { color: colors.text }]}>
              {planet.diameter.toLocaleString()}
            </Text>
            <Text style={[styles.statLabel, { color: colors.secondaryText }]}>
              km
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  colorIndicator: {
    width: 4,
    borderRadius: 2,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 8,
  },
  stats: {
    flexDirection: "row",
    gap: 16,
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  statLabel: {
    fontSize: 11,
    textTransform: "uppercase",
  },
});
