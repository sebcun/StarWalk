import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { View as RNView, StyleSheet } from "react-native";

interface AuroraKpGaugeProps {
  kpValue: number;
}

export default function AuroraKpGauge({ kpValue }: AuroraKpGaugeProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const getKpColor = (kp: number) => {
    if (kp >= 7) return "#FF3B30";
    if (kp >= 5) return "#FF9500";
    if (kp >= 3) return "#FFCC00";
    return "#34C759";
  };

  const safeKpValue =
    typeof kpValue === "number" && !isNaN(kpValue) ? kpValue : 0;
  const kpColor = getKpColor(safeKpValue);
  const percentage = (safeKpValue / 9) * 100;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.cardBackground, borderColor: colors.border },
      ]}
    >
      <Text style={styles.label}>Current Kp Index</Text>
      <Text style={[styles.value, { color: kpColor }]}>
        {safeKpValue.toFixed(1)}
      </Text>
      <View style={[styles.barContainer, { backgroundColor: colors.border }]}>
        <RNView
          style={[
            styles.barFill,
            { width: `${percentage}%`, backgroundColor: kpColor },
          ]}
        />
      </View>
      <View style={[styles.scale, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.scaleText, { color: colors.secondaryText }]}>
          0
        </Text>
        <Text style={[styles.scaleText, { color: colors.secondaryText }]}>
          3
        </Text>
        <Text style={[styles.scaleText, { color: colors.secondaryText }]}>
          5
        </Text>
        <Text style={[styles.scaleText, { color: colors.secondaryText }]}>
          7
        </Text>
        <Text style={[styles.scaleText, { color: colors.secondaryText }]}>
          9
        </Text>
      </View>
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
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  value: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 16,
  },
  barContainer: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  barFill: {
    height: "100%",
    borderRadius: 4,
  },
  scale: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scaleText: {
    fontSize: 12,
  },
});
