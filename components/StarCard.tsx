import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { Star } from "@/types/star";
import { StyleSheet, TouchableOpacity } from "react-native";

interface StarCardProps {
  star: Star;
  onPress: () => void;
}

export default function StarCard({ star, onPress }: StarCardProps) {
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
      <View style={[styles.colorIndicator, { backgroundColor: star.color }]} />
      <View
        style={[styles.content, { backgroundColor: colors.cardBackground }]}
      >
        <Text style={styles.name}>{star.name}</Text>
        <Text
          style={[styles.commonName, { color: colors.secondaryText }]}
          numberOfLines={1}
        >
          {star.commonName}
        </Text>
        <View
          style={[styles.footer, { backgroundColor: colors.cardBackground }]}
        >
          <View style={[styles.badge, { backgroundColor: colors.border }]}>
            <Text style={[styles.badgeText, { color: colors.text }]}>
              {star.constellation}
            </Text>
          </View>
          <Text style={[styles.magnitude, { color: colors.secondaryText }]}>
            Mag {star.statistics.magnitude}
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
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  commonName: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
  },
  magnitude: {
    fontSize: 12,
  },
});
