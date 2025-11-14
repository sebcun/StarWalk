import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

interface AuroraInfoCardProps {
  level: string;
  description: string;
  northernLocations: string;
  southernLocations: string;
  visibility: string;
  color: string;
}

export default function AuroraInfoCard({
  level,
  description,
  northernLocations,
  southernLocations,
  visibility,
  color,
}: AuroraInfoCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.cardBackground, borderColor: colors.border },
      ]}
    >
      <View style={[styles.header, { backgroundColor: colors.cardBackground }]}>
        <View style={[styles.indicator, { backgroundColor: color }]} />
        <Text style={styles.level}>{level} Activity</Text>
      </View>
      <Text style={[styles.description, { color: colors.text }]}>
        {description}
      </Text>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      <Text style={[styles.hemisphereTitle, { color: colors.text }]}>
        Northern Hemisphere
      </Text>
      <Text style={[styles.label, { color: colors.secondaryText }]}>
        Aurora Borealis
      </Text>
      <Text style={[styles.locations, { color: colors.text }]}>
        {northernLocations}
      </Text>

      <View
        style={[styles.spacer, { backgroundColor: colors.cardBackground }]}
      />

      <Text style={[styles.hemisphereTitle, { color: colors.text }]}>
        Southern Hemisphere
      </Text>
      <Text style={[styles.label, { color: colors.secondaryText }]}>
        Aurora Australis
      </Text>
      <Text style={[styles.locations, { color: colors.text }]}>
        {southernLocations}
      </Text>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      <Text style={[styles.label, { color: colors.secondaryText }]}>
        Visibility Range
      </Text>
      <Text style={[styles.locations, { color: colors.text }]}>
        {visibility}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  level: {
    fontSize: 20,
    fontWeight: "600",
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  hemisphereTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  locations: {
    fontSize: 15,
    lineHeight: 22,
  },
  spacer: {
    height: 12,
  },
});
