import PlanetCard from "@/components/PlanetCard";
import PlanetDetailModal from "@/components/PlanetDetailModal";
import { Text, View } from "@/components/Themed";
import { getPlanetVisibility, planets } from "@/services/planetService";
import { Planet } from "@/types/planet";
import { Stack } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function PlanetsScreen() {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
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
      <ScrollView style={styles.container}>
        <View style={styles.content}>
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
        </View>
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
  content: {
    flex: 1,
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
