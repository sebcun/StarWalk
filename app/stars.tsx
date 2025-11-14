import StarCard from "@/components/StarCard";
import StarDetailModal from "@/components/StarDetailModal";
import { Text } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { popularStars } from "@/services/starService";
import { Star } from "@/types/star";
import { Stack } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function StarsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [selectedStar, setSelectedStar] = useState<Star | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleStarPress = (star: Star) => {
    setSelectedStar(star);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedStar(null);
  };

  return (
    <>
      <Stack.Screen options={{ title: "Stars", headerBackTitle: "Back" }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.subtitle}>
          Explore the brightest stars in our night sky
        </Text>

        {popularStars.map((star) => (
          <StarCard
            key={star.name}
            star={star}
            onPress={() => handleStarPress(star)}
          />
        ))}
      </ScrollView>

      <StarDetailModal
        star={selectedStar}
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
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    opacity: 0.7,
  },
});
