import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { Constellation } from "@/types/star";
import { StyleSheet, TouchableOpacity } from "react-native";

interface ConstellationCardProps {
  constellation: Constellation;
  onPress: () => void;
}

export default function ConstellationCard({
  constellation,
  onPress,
}: ConstellationCardProps) {
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
        style={[
          styles.colorIndicator,
          { backgroundColor: constellation.color },
        ]}
      />
      <View
        style={[styles.content, { backgroundColor: colors.cardBackground }]}
      >
        <Text style={styles.name}>{constellation.name}</Text>
        <Text
          style={[styles.latinName, { color: colors.secondaryText }]}
          numberOfLines={1}
        >
          {constellation.latinName} ({constellation.abbreviation})
        </Text>
        <View
          style={[styles.footer, { backgroundColor: colors.cardBackground }]}
        >
          <View style={[styles.badge, { backgroundColor: colors.border }]}>
            <Text style={[styles.badgeText, { color: colors.text }]}>
              {constellation.visibility.hemisphere}
            </Text>
          </View>
          <Text style={[styles.brightest, { color: colors.secondaryText }]}>
            {constellation.brightest}
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
  latinName: {
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
  brightest: {
    fontSize: 12,
  },
});
