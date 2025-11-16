import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { getAuroraViewingConditions } from "@/services/auroraService";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";

interface KpIndexWidgetProps {
  kpIndex: number | null;
  loading: boolean;
}

export default function KpIndexWidget({
  kpIndex,
  loading,
}: KpIndexWidgetProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();

  const handlePress = () => {
    router.push("/auroras");
  };

  if (loading) {
    return (
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          },
        ]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <ActivityIndicator size="small" color={colors.tint} />
      </TouchableOpacity>
    );
  }

  if (kpIndex === null) {
    return null;
  }

  const conditions = getAuroraViewingConditions(kpIndex);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        },
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={[styles.header, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.label, { color: colors.secondaryText }]}>
          KP Index
        </Text>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.secondaryText}
        />
      </View>

      <View
        style={[styles.content, { backgroundColor: colors.cardBackground }]}
      >
        <View
          style={[
            styles.kpCircle,
            {
              backgroundColor: colors.cardBackground,
              borderColor: conditions.color,
            },
          ]}
        >
          <Text style={[styles.kpValue, { color: conditions.color }]}>
            {kpIndex.toFixed(1)}
          </Text>
        </View>

        <Text style={[styles.level, { color: conditions.color }]}>
          {conditions.level}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 158,
    height: 158,
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 14,
    paddingHorizontal: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 14,
  },
  kpCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  kpValue: {
    fontSize: 32,
    fontWeight: "700",
  },
  level: {
    fontSize: 15,
    fontWeight: "600",
  },
});
