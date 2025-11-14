import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { getConstellationVisibility } from "@/services/constellationService";
import { Constellation } from "@/types/star";
import { Modal, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

interface ConstellationDetailModalProps {
  constellation: Constellation | null;
  visible: boolean;
  onClose: () => void;
}

export default function ConstellationDetailModal({
  constellation,
  visible,
  onClose,
}: ConstellationDetailModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  if (!constellation) return null;

  const visibility = getConstellationVisibility(
    constellation.visibility.hemisphere,
    constellation.visibility.bestMonth
  );

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
                style={[
                  styles.constellationCircle,
                  { backgroundColor: constellation.color },
                ]}
              />
              <Text style={styles.constellationName}>{constellation.name}</Text>
              <Text style={[styles.latinName, { color: colors.secondaryText }]}>
                {constellation.latinName} ({constellation.abbreviation})
              </Text>
              <Text
                style={[styles.description, { color: colors.secondaryText }]}
              >
                {constellation.description}
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
              <Text style={styles.sectionTitle}>Visibility</Text>
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
                  {visibility.bestTime}
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
                  Hemisphere
                </Text>
                <Text style={[styles.visibilityValue, { color: colors.text }]}>
                  {constellation.visibility.hemisphere}
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
                  Best Month
                </Text>
                <Text style={[styles.visibilityValue, { color: colors.text }]}>
                  {constellation.visibility.bestMonth}
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
                  Season
                </Text>
                <Text style={[styles.visibilityValue, { color: colors.text }]}>
                  {constellation.visibility.season}
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
                    Area
                  </Text>
                  <Text style={[styles.statValue, { color: colors.text }]}>
                    {constellation.statistics.area}
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
                    Stars
                  </Text>
                  <Text style={[styles.statValue, { color: colors.text }]}>
                    {constellation.statistics.stars}
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
                    Size Rank
                  </Text>
                  <Text style={[styles.statValue, { color: colors.text }]}>
                    {constellation.statistics.rank}
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
                    Brightest Star
                  </Text>
                  <Text style={[styles.statValue, { color: colors.text }]}>
                    {constellation.brightest}
                  </Text>
                </View>
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
              {constellation.facts.map((fact, index) => (
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
                      { backgroundColor: constellation.color },
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
  constellationCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  constellationName: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  latinName: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
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
