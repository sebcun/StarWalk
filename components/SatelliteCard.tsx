import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { PopularSatellite } from "@/types/satellite";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";

interface SatelliteCardProps {
  satellite: PopularSatellite;
  onPress: () => void;
  loading?: boolean;
}

export default function SatelliteCard({
  satellite,
  onPress,
  loading,
}: SatelliteCardProps) {
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
      disabled={loading}
    >
      <View
        style={[styles.colorIndicator, { backgroundColor: satellite.color }]}
      />
      <View
        style={[styles.content, { backgroundColor: colors.cardBackground }]}
      >
        <Text style={styles.name}>{satellite.name}</Text>
        <Text
          style={[styles.description, { color: colors.secondaryText }]}
          numberOfLines={1}
        >
          {satellite.description}
        </Text>
        <View
          style={[styles.footer, { backgroundColor: colors.cardBackground }]}
        >
          <View style={[styles.typeBadge, { backgroundColor: colors.border }]}>
            <Text style={[styles.typeText, { color: colors.text }]}>
              {satellite.type}
            </Text>
          </View>
          {loading && <ActivityIndicator size="small" color={colors.tint} />}
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
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
