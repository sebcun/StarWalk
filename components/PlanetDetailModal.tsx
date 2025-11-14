import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { Planet, PlanetVisibility } from "@/types/planet";
import { Modal, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

interface PlanetDetailModalProps {
  planet: Planet | null;
  visibility: PlanetVisibility | null;
  visible: boolean;
  onClose: () => void;
}

export default function PlanetDetailModal({
  planet,
  visibility,
  visible,
  onClose,
}: PlanetDetailModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  if (!planet) return null;

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
                style={[styles.planetCircle, { backgroundColor: planet.color }]}
              />
              <Text style={styles.planetName}>{planet.name}</Text>
              <Text
                style={[
                  styles.planetDescription,
                  { color: colors.secondaryText },
                ]}
              >
                {planet.description}
              </Text>
            </View>

            {visibility && (
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
                    {visibility.visible ? "Visible" : "Not visible"}
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
                  <Text
                    style={[styles.visibilityValue, { color: colors.text }]}
                  >
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
                    Brightness
                  </Text>
                  <Text
                    style={[styles.visibilityValue, { color: colors.text }]}
                  >
                    Magnitude {visibility.magnitude}
                  </Text>
                </View>
              </View>
            )}

            <View
              style={[styles.statsGrid, { backgroundColor: colors.background }]}
            >
              <View
                style={[
                  styles.statCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text style={[styles.statValue, { color: colors.text }]}>
                  {planet.distanceFromSun.toLocaleString()}
                </Text>
                <Text
                  style={[styles.statLabel, { color: colors.secondaryText }]}
                >
                  Million km from Sun
                </Text>
              </View>
              <View
                style={[
                  styles.statCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text style={[styles.statValue, { color: colors.text }]}>
                  {planet.diameter.toLocaleString()}
                </Text>
                <Text
                  style={[styles.statLabel, { color: colors.secondaryText }]}
                >
                  Diameter (km)
                </Text>
              </View>
              <View
                style={[
                  styles.statCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text style={[styles.statValue, { color: colors.text }]}>
                  {planet.orbitalPeriod.toLocaleString()}
                </Text>
                <Text
                  style={[styles.statLabel, { color: colors.secondaryText }]}
                >
                  Earth days to orbit
                </Text>
              </View>
              <View
                style={[
                  styles.statCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text style={[styles.statValue, { color: colors.text }]}>
                  {planet.rotationPeriod}
                </Text>
                <Text
                  style={[styles.statLabel, { color: colors.secondaryText }]}
                >
                  Earth days to rotate
                </Text>
              </View>
              <View
                style={[
                  styles.statCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text style={[styles.statValue, { color: colors.text }]}>
                  {planet.moons}
                </Text>
                <Text
                  style={[styles.statLabel, { color: colors.secondaryText }]}
                >
                  Known moons
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
              {planet.facts.map((fact, index) => (
                <View
                  key={index}
                  style={[
                    styles.factItem,
                    { backgroundColor: colors.cardBackground },
                  ]}
                >
                  <View
                    style={[
                      styles.factBullet,
                      { backgroundColor: planet.color },
                    ]}
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
  planetCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  planetName: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  planetDescription: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
  visibilityCard: {
    marginHorizontal: 16,
    marginBottom: 20,
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
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 12,
  },
  statCard: {
    width: "48%",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    lineHeight: 16,
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
