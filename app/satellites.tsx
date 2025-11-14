import SatelliteCard from "@/components/SatelliteCard";
import SatelliteDetailModal from "@/components/SatelliteDetailModal";
import { Text } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import {
  fetchSatellitePosition,
  popularSatellites,
} from "@/services/satelliteService";
import { PopularSatellite, Satellite } from "@/types/satellite";
import { Stack } from "expo-router";
import { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";

export default function SatellitesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [selectedSatellite, setSelectedSatellite] =
    useState<PopularSatellite | null>(null);
  const [satellitePosition, setSatellitePosition] = useState<Satellite | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleSatellitePress = async (satellite: PopularSatellite) => {
    setSelectedSatellite(satellite);
    setSatellitePosition(null);
    setModalVisible(true);
    setLoading(true);

    const position = await fetchSatellitePosition(satellite.noradId);
    setSatellitePosition(position);
    setLoading(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedSatellite(null);
    setSatellitePosition(null);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  return (
    <>
      <Stack.Screen
        options={{ title: "Satellites", headerBackTitle: "Back" }}
      />
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
        <Text style={styles.title}>Most Tracked Satellites</Text>
        <Text style={styles.subtitle}>
          Track satellites orbiting Earth in real-time
        </Text>

        {popularSatellites.map((satellite) => (
          <SatelliteCard
            key={satellite.noradId}
            satellite={satellite}
            onPress={() => handleSatellitePress(satellite)}
          />
        ))}
      </ScrollView>

      <SatelliteDetailModal
        satellite={selectedSatellite}
        position={satellitePosition}
        visible={modalVisible}
        loading={loading}
        onClose={handleCloseModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    opacity: 0.7,
  },
});
