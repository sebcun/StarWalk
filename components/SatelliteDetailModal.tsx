import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import {
  formatCoordinates,
  getVisibilityStatus,
} from "@/services/satelliteService";
import { PopularSatellite, Satellite } from "@/types/satellite";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface SatelliteDetailModalProps {
  satellite: PopularSatellite | null;
  position: Satellite | null;
  visible: boolean;
  loading: boolean;
  onClose: () => void;
}

export default function SatelliteDetailModal({
  satellite,
  position,
  visible,
  loading,
  onClose,
}: SatelliteDetailModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  if (!satellite) return null;

  const safeAltitude = position?.satalt ?? 0;
  const visibility = getVisibilityStatus(safeAltitude);

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
                  styles.satelliteCircle,
                  { backgroundColor: satellite.color },
                ]}
              />
              <Text style={styles.satelliteName}>{satellite.name}</Text>
              <Text
                style={[
                  styles.satelliteDescription,
                  { color: colors.secondaryText },
                ]}
              >
                {satellite.description}
              </Text>
            </View>

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.tint} />
                <Text
                  style={[styles.loadingText, { color: colors.secondaryText }]}
                >
                  Loading position data...
                </Text>
              </View>
            ) : position ? (
              <>
                <View
                  style={[
                    styles.statusCard,
                    {
                      backgroundColor: colors.cardBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text style={styles.sectionTitle}>Current Status</Text>
                  <View
                    style={[
                      styles.statusRow,
                      { backgroundColor: colors.cardBackground },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      Visibility
                    </Text>
                    <Text
                      style={[styles.statusValue, { color: visibility.color }]}
                    >
                      {visibility.status}
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.positionCard,
                    {
                      backgroundColor: colors.cardBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text style={styles.sectionTitle}>Live Position</Text>
                  <View
                    style={[
                      styles.positionRow,
                      { backgroundColor: colors.cardBackground },
                    ]}
                  >
                    <Text
                      style={[
                        styles.positionLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      Location
                    </Text>
                    <Text
                      style={[styles.positionValue, { color: colors.text }]}
                    >
                      {formatCoordinates(
                        position.satlat ?? 0,
                        position.satlng ?? 0
                      )}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.positionRow,
                      { backgroundColor: colors.cardBackground },
                    ]}
                  >
                    <Text
                      style={[
                        styles.positionLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      Altitude
                    </Text>
                    <Text
                      style={[styles.positionValue, { color: colors.text }]}
                    >
                      {safeAltitude.toFixed(2)} km
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
                        style={[
                          styles.statLabel,
                          { color: colors.secondaryText },
                        ]}
                      >
                        Orbital Period
                      </Text>
                      <Text style={[styles.statValue, { color: colors.text }]}>
                        {satellite.statistics.orbitalPeriod}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.statItem,
                        { backgroundColor: colors.cardBackground },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statLabel,
                          { color: colors.secondaryText },
                        ]}
                      >
                        Speed
                      </Text>
                      <Text style={[styles.statValue, { color: colors.text }]}>
                        {satellite.statistics.speed}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.statItem,
                        { backgroundColor: colors.cardBackground },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statLabel,
                          { color: colors.secondaryText },
                        ]}
                      >
                        Mass
                      </Text>
                      <Text style={[styles.statValue, { color: colors.text }]}>
                        {satellite.statistics.mass}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.statItem,
                        { backgroundColor: colors.cardBackground },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statLabel,
                          { color: colors.secondaryText },
                        ]}
                      >
                        Size
                      </Text>
                      <Text style={[styles.statValue, { color: colors.text }]}>
                        {satellite.statistics.size}
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={[
                    styles.infoCard,
                    {
                      backgroundColor: colors.cardBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text style={styles.sectionTitle}>Satellite Info</Text>
                  <View
                    style={[
                      styles.infoRow,
                      { backgroundColor: colors.cardBackground },
                    ]}
                  >
                    <Text
                      style={[
                        styles.infoLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      NORAD ID
                    </Text>
                    <Text style={[styles.infoValue, { color: colors.text }]}>
                      {position.satid}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.infoRow,
                      { backgroundColor: colors.cardBackground },
                    ]}
                  >
                    <Text
                      style={[
                        styles.infoLabel,
                        { color: colors.secondaryText },
                      ]}
                    >
                      Type
                    </Text>
                    <Text style={[styles.infoValue, { color: colors.text }]}>
                      {satellite.type}
                    </Text>
                  </View>
                  {position.launchDate && position.launchDate !== "Unknown" && (
                    <View
                      style={[
                        styles.infoRow,
                        { backgroundColor: colors.cardBackground },
                      ]}
                    >
                      <Text
                        style={[
                          styles.infoLabel,
                          { color: colors.secondaryText },
                        ]}
                      >
                        Launch Date
                      </Text>
                      <Text style={[styles.infoValue, { color: colors.text }]}>
                        {position.launchDate}
                      </Text>
                    </View>
                  )}
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
                  {satellite.facts.map((fact, index) => (
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
                          { backgroundColor: satellite.color },
                        ]}
                      />
                      <Text style={[styles.factText, { color: colors.text }]}>
                        {fact}
                      </Text>
                    </View>
                  ))}
                </View>
              </>
            ) : (
              <View
                style={[
                  styles.errorCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={[styles.errorText, { color: colors.secondaryText }]}
                >
                  Unable to load satellite position data
                </Text>
              </View>
            )}
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
  satelliteCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  satelliteName: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  satelliteDescription: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
  loadingContainer: {
    padding: 40,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
  },
  statusCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  positionCard: {
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
  infoCard: {
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
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  statusLabel: {
    fontSize: 15,
  },
  statusValue: {
    fontSize: 15,
    fontWeight: "600",
  },
  positionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  positionLabel: {
    fontSize: 15,
  },
  positionValue: {
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
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 15,
  },
  infoValue: {
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
  errorCard: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },
  errorText: {
    fontSize: 15,
    textAlign: "center",
  },
});
