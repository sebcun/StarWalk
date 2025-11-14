import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import {
  calculateStarVisibility,
  getStarColorTemperature,
} from "@/services/starService";
import { Star } from "@/types/star";
import { Modal, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

interface StarDetailModalProps {
  star: Star | null;
  visible: boolean;
  onClose: () => void;
}

export default function StarDetailModal({
  star,
  visible,
  onClose,
}: StarDetailModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  if (!star) return null;

  const visibility = calculateStarVisibility(
    star.coordinates.rightAscension,
    star.coordinates.declination
  );
  const colorTemp = getStarColorTemperature(star.statistics.temperature);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View
          style={[
            styles.header,
            {
              backgroundColor: colors.background,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={[styles.closeText, { color: colors.tint }]}>Done</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>
          <View
            style={[styles.content, { backgroundColor: colors.background }]}
          >
            <View style={[styles.heroSection]}>
              <View
                style={[styles.starCircle, { backgroundColor: star.color }]}
              />
              <Text style={styles.starName}>{star.name}</Text>
              <Text
                style={[styles.commonName, { color: colors.secondaryText }]}
              >
                {star.commonName}
              </Text>
              <Text
                style={[
                  styles.starDescription,
                  { color: colors.secondaryText },
                ]}
              >
                {star.description}
              </Text>
            </View>

            <View
              style={[
                styles.visibilityCard,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={styles.sectionTitle}>Visibility Tonight</Text>
              <View
                style={[
                  styles.visibilityRow,
                  { backgroundColor: colors.cardBackground },
                ]}
              >
                <Text
                  style={[
                    styles.visibilityLabel,
                    { color: colors.secondaryText },
                  ]}
                >
                  Status
                </Text>
                <Text
                  style={[
                    styles.visibilityValue,
                    {
                      color: visibility.visible
                        ? "#34C759"
                        : colors.secondaryText,
                    },
                  ]}
                >
                  {visibility.status}
                </Text>
              </View>
              <View
                style={[
                  styles.visibilityRow,
                  { backgroundColor: colors.cardBackground },
                ]}
              >
                <Text
                  style={[
                    styles.visibilityLabel,
                    { color: colors.secondaryText },
                  ]}
                >
                  Best Time
                </Text>
                <Text style={[styles.visibilityValue, { color: colors.text }]}>
                  {visibility.bestViewingTime}
                </Text>
              </View>
              <View
                style={[
                  styles.visibilityRow,
                  { backgroundColor: colors.cardBackground },
                ]}
              >
                <Text
                  style={[
                    styles.visibilityLabel,
                    { color: colors.secondaryText },
                  ]}
                >
                  Constellation
                </Text>
                <Text style={[styles.visibilityValue, { color: colors.text }]}>
                  {star.constellation}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.statsCard,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={styles.sectionTitle}>Statistics</Text>
              <View
                style={[
                  styles.statsGrid,
                  { backgroundColor: colors.cardBackground },
                ]}
              >
                <View
                  style={[
                    styles.statItem,
                    { backgroundColor: colors.cardBackground },
                  ]}
                >
                  <Text
                    style={[styles.statLabel, { color: colors.secondaryText }]}
                  >
                    Distance
                  </Text>
                  <Text style={[styles.statValue, { color: colors.text }]}>
                    {star.statistics.distance}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statItem,
                    { backgroundColor: colors.cardBackground },
                  ]}
                >
                  <Text
                    style={[styles.statLabel, { color: colors.secondaryText }]}
                  >
                    Magnitude
                  </Text>
                  <Text style={[styles.statValue, { color: colors.text }]}>
                    {star.statistics.magnitude}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statItem,
                    { backgroundColor: colors.cardBackground },
                  ]}
                >
                  <Text
                    style={[styles.statLabel, { color: colors.secondaryText }]}
                  >
                    Temperature
                  </Text>
                  <Text style={[styles.statValue, { color: colors.text }]}>
                    {star.statistics.temperature}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statItem,
                    { backgroundColor: colors.cardBackground },
                  ]}
                >
                  <Text
                    style={[styles.statLabel, { color: colors.secondaryText }]}
                  >
                    Spectral Type
                  </Text>
                  <Text style={[styles.statValue, { color: colors.text }]}>
                    {star.statistics.spectralType}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statItem,
                    { backgroundColor: colors.cardBackground },
                  ]}
                >
                  <Text
                    style={[styles.statLabel, { color: colors.secondaryText }]}
                  >
                    Color
                  </Text>
                  <Text style={[styles.statValue, { color: colors.text }]}>
                    {colorTemp}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.coordCard,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={styles.sectionTitle}>Coordinates</Text>
              <View
                style={[
                  styles.coordRow,
                  { backgroundColor: colors.cardBackground },
                ]}
              >
                <Text
                  style={[styles.coordLabel, { color: colors.secondaryText }]}
                >
                  Right Ascension
                </Text>
                <Text style={[styles.coordValue, { color: colors.text }]}>
                  {star.coordinates.rightAscension}
                </Text>
              </View>
              <View
                style={[
                  styles.coordRow,
                  { backgroundColor: colors.cardBackground },
                ]}
              >
                <Text
                  style={[styles.coordLabel, { color: colors.secondaryText }]}
                >
                  Declination
                </Text>
                <Text style={[styles.coordValue, { color: colors.text }]}>
                  {star.coordinates.declination}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.factsSection,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={styles.sectionTitle}>Interesting Facts</Text>
              {star.facts.map((fact, index) => (
                <View
                  key={index}
                  style={[
                    styles.factItem,
                    { backgroundColor: colors.cardBackground },
                  ]}
                >
                  <View
                    style={[styles.factBullet, { backgroundColor: star.color }]}
                  />
                  <Text style={[styles.factText, { color: colors.text }]}>
                    {fact}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
  },
  closeButton: {
    padding: 4,
  },
  closeText: {
    fontSize: 17,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 40,
  },
  heroSection: {
    padding: 32,
    alignItems: "center",
  },
  starCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  starName: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  commonName: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: "center",
  },
  starDescription: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
  visibilityCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  statsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  coordCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  visibilityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  visibilityLabel: {
    fontSize: 15,
  },
  visibilityValue: {
    fontSize: 15,
    fontWeight: "600",
  },
  statsGrid: {
    gap: 16,
  },
  statItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statLabel: {
    fontSize: 15,
  },
  statValue: {
    fontSize: 15,
    fontWeight: "600",
  },
  coordRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  coordLabel: {
    fontSize: 15,
  },
  coordValue: {
    fontSize: 15,
    fontWeight: "600",
  },
  factsSection: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  factItem: {
    flexDirection: "row",
    marginBottom: 12,
  },
  factBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 12,
    marginTop: 8,
  },
  factText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
});
