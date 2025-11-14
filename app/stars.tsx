import ConstellationCard from "@/components/ConstellationCard";
import ConstellationDetailModal from "@/components/ConstellationDetailModal";
import StarCard from "@/components/StarCard";
import StarDetailModal from "@/components/StarDetailModal";
import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { popularConstellations } from "@/services/constellationService";
import { popularStars } from "@/services/starService";
import { Constellation, Star } from "@/types/star";
import { Stack } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

export default function StarsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [selectedStar, setSelectedStar] = useState<Star | null>(null);
  const [selectedConstellation, setSelectedConstellation] =
    useState<Constellation | null>(null);
  const [starModalVisible, setStarModalVisible] = useState(false);
  const [constellationModalVisible, setConstellationModalVisible] =
    useState(false);
  const [viewMode, setViewMode] = useState<"stars" | "constellations">("stars");

  const handleStarPress = (star: Star) => {
    setSelectedStar(star);
    setStarModalVisible(true);
  };

  const handleConstellationPress = (constellation: Constellation) => {
    setSelectedConstellation(constellation);
    setConstellationModalVisible(true);
  };

  const handleCloseStarModal = () => {
    setStarModalVisible(false);
    setSelectedStar(null);
  };

  const handleCloseConstellationModal = () => {
    setConstellationModalVisible(false);
    setSelectedConstellation(null);
  };

  return (
    <>
      <Stack.Screen options={{ title: "Stars", headerBackTitle: "Back" }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.subtitle}>
          Explore the brightest stars and constellations in our night sky
        </Text>

        <View
          style={[styles.segmentedControl, { backgroundColor: colors.border }]}
        >
          <TouchableOpacity
            style={[
              styles.segmentButton,
              viewMode === "stars" && {
                backgroundColor: colors.cardBackground,
              },
            ]}
            onPress={() => setViewMode("stars")}
          >
            <Text
              style={[
                styles.segmentText,
                {
                  color:
                    viewMode === "stars" ? colors.text : colors.secondaryText,
                },
              ]}
            >
              Stars
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.segmentButton,
              viewMode === "constellations" && {
                backgroundColor: colors.cardBackground,
              },
            ]}
            onPress={() => setViewMode("constellations")}
          >
            <Text
              style={[
                styles.segmentText,
                {
                  color:
                    viewMode === "constellations"
                      ? colors.text
                      : colors.secondaryText,
                },
              ]}
            >
              Constellations
            </Text>
          </TouchableOpacity>
        </View>

        {viewMode === "stars"
          ? popularStars.map((star) => (
              <StarCard
                key={star.name}
                star={star}
                onPress={() => handleStarPress(star)}
              />
            ))
          : popularConstellations.map((constellation) => (
              <ConstellationCard
                key={constellation.name}
                constellation={constellation}
                onPress={() => handleConstellationPress(constellation)}
              />
            ))}
      </ScrollView>

      <StarDetailModal
        star={selectedStar}
        visible={starModalVisible}
        onClose={handleCloseStarModal}
      />

      <ConstellationDetailModal
        constellation={selectedConstellation}
        visible={constellationModalVisible}
        onClose={handleCloseConstellationModal}
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
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    opacity: 0.7,
  },
  segmentedControl: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 2,
    marginBottom: 16,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  segmentText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
