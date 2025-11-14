import PlanetCard from "@/components/PlanetCard";
import PlanetDetailModal from "@/components/PlanetDetailModal";
import { Text } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { getPlanetVisibility, planets } from "@/services/planetService";
import { Planet } from "@/types/planet";
import { Stack } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function PlanetsScreen() {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const visibilityData = getPlanetVisibility();

  const handlePlanetPress = (planet: Planet) => {
    setSelectedPlanet(planet);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedPlanet(null);
  };

  const selectedVisibility = selectedPlanet
    ? visibilityData.find((v) => v.name === selectedPlanet.name) || null
    : null;

  return (
    <>
      <Stack.Screen options={{ title: "Planets", headerBackTitle: "Back" }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>Solar System</Text>
        <Text style={styles.subtitle}>
          Explore the planets in our cosmic neighborhood
        </Text>

        {planets.map((planet) => (
          <PlanetCard
            key={planet.name}
            planet={planet}
            onPress={() => handlePlanetPress(planet)}
          />
        ))}
      </ScrollView>

      <PlanetDetailModal
        planet={selectedPlanet}
        visibility={selectedVisibility}
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
    marginBottom: 24,
    opacity: 0.7,
  },
});
