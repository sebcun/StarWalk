import RocketDetailModal from "@/components/modals/RocketDetail";
import RocketCard from "@/components/RocketCard";
import { Text } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { fetchUpcomingLaunches } from "@/services/rocketService";
import { SimplifiedRocket } from "@/types/rocket";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function RocketsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [rockets, setRockets] = useState<SimplifiedRocket[]>([]);
  const [selectedRocket, setSelectedRocket] = useState<SimplifiedRocket | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadRockets();
  }, []);

  const loadRockets = async () => {
    setLoading(true);
    const data = await fetchUpcomingLaunches();
    setRockets(data);
    setLoading(false);
  };

  const handleRocketPress = (rocket: SimplifiedRocket) => {
    setSelectedRocket(rocket);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedRocket(null);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadRockets();
    setRefreshing(false);
  };

  return (
    <>
      <Stack.Screen options={{ title: "Rockets", headerBackTitle: "Back" }} />
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
        <Text style={styles.title}>Upcoming Rocket Launches</Text>
        <Text style={styles.subtitle}>
          Track the next space launches around the world
        </Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.tint}
            style={styles.loader}
          />
        ) : rockets.length > 0 ? (
          rockets.map((rocket) => (
            <RocketCard
              key={rocket.id}
              rocket={rocket}
              onPress={() => handleRocketPress(rocket)}
            />
          ))
        ) : (
          <Text style={[styles.noData, { color: colors.secondaryText }]}>
            No upcoming launches available
          </Text>
        )}
      </ScrollView>

      <RocketDetailModal
        rocket={selectedRocket}
        visible={modalVisible}
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
  loader: {
    marginTop: 40,
  },
  noData: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 40,
  },
});
