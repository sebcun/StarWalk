import AuroraForecastChart from "@/components/AuroraForecastChart";
import AuroraInfoCard from "@/components/AuroraInfoCard";
import AuroraKpGauge from "@/components/AuroraKpGauge";
import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import {
  fetch3DayForecast,
  fetchKpIndex,
  getAuroraViewingConditions,
} from "@/services/auroraService";
import { KpIndex } from "@/types/aurora";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function AurorasScreen() {
  const [kpIndex, setKpIndex] = useState<number>(2);
  const [forecast, setForecast] = useState<KpIndex[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const loadAuroraData = async () => {
    try {
      const [kp, forecastData] = await Promise.all([
        fetchKpIndex(),
        fetch3DayForecast(),
      ]);
      setKpIndex(kp);
      setForecast(forecastData);
    } catch (error) {
      console.error("Failed to load aurora data:", error);
      setKpIndex(2);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAuroraData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadAuroraData();
  }, []);

  const conditions = getAuroraViewingConditions(kpIndex);

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: "Auroras", headerBackTitle: "Back" }} />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.tint} />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: "Auroras", headerBackTitle: "Back" }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.tint}
          />
        }
      >
        <Text style={styles.title}>Aurora Forecast</Text>

        <AuroraKpGauge kpValue={kpIndex} />

        <AuroraInfoCard
          level={conditions.level}
          description={conditions.description}
          northernLocations={conditions.northernLocations}
          southernLocations={conditions.southernLocations}
          visibility={conditions.visibility}
          color={conditions.color}
        />

        {forecast && forecast.length > 0 && (
          <AuroraForecastChart forecast={forecast} />
        )}

        <View
          style={[
            styles.infoBox,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.infoTitle, { color: colors.text }]}>
            About Kp Index
          </Text>
          <Text style={[styles.infoText, { color: colors.secondaryText }]}>
            The Kp index measures geomagnetic activity on a scale of 0-9. Higher
            values indicate stronger auroras visible at lower latitudes in both
            hemispheres.
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
