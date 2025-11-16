import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { SimplifiedRocket } from "@/types/rocket";
import { StyleSheet, TouchableOpacity } from "react-native";

interface RocketCardProps {
  rocket: SimplifiedRocket;
  onPress: () => void;
}

export default function RocketCard({ rocket, onPress }: RocketCardProps) {
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
        style={[styles.colorIndicator, { backgroundColor: rocket.color }]}
      />
      <View
        style={[styles.content, { backgroundColor: colors.cardBackground }]}
      >
        <View
          style={[styles.header, { backgroundColor: colors.cardBackground }]}
        >
          <Text style={styles.name} numberOfLines={1}>
            {rocket.name}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: rocket.color }]}>
            <Text style={styles.statusText}>{rocket.status}</Text>
          </View>
        </View>

        <Text
          style={[styles.provider, { color: colors.secondaryText }]}
          numberOfLines={1}
        >
          {rocket.provider} • {rocket.vehicle}
        </Text>

        <View
          style={[styles.footer, { backgroundColor: colors.cardBackground }]}
        >
          <View
            style={[styles.infoRow, { backgroundColor: colors.cardBackground }]}
          >
            <Text style={[styles.infoLabel, { color: colors.secondaryText }]}>
              📍 {rocket.location}
            </Text>
          </View>
          <Text style={[styles.launchTime, { color: colors.tint }]}>
            {rocket.launchTime}
          </Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  provider: {
    fontSize: 14,
    marginBottom: 8,
  },
  footer: {
    gap: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 13,
  },
  launchTime: {
    fontSize: 13,
    fontWeight: "500",
  },
});
