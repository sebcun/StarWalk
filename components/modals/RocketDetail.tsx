import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { getCountdownText } from "@/services/rocketService";
import { SimplifiedRocket } from "@/types/rocket";
import { Modal, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

interface RocketDetailModalProps {
  rocket: SimplifiedRocket | null;
  visible: boolean;
  onClose: () => void;
}

export default function RocketDetailModal({
  rocket,
  visible,
  onClose,
}: RocketDetailModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  if (!rocket) return null;

  const countdown = getCountdownText(rocket.launchDate);

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
            <View style={styles.heroSection}>
              <View
                style={[styles.rocketCircle, { backgroundColor: rocket.color }]}
              >
                <Text style={styles.rocketEmoji}>🚀</Text>
              </View>
              <Text style={styles.rocketName}>{rocket.name}</Text>
              <View
                style={[styles.statusBadge, { backgroundColor: rocket.color }]}
              >
                <Text style={styles.statusText}>{rocket.status}</Text>
              </View>
            </View>

            <View
              style={[
                styles.countdownCard,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={styles.sectionTitle}>Launch Countdown</Text>
              <Text style={[styles.countdownText, { color: rocket.color }]}>
                {countdown}
              </Text>
              <Text
                style={[styles.countdownLabel, { color: colors.secondaryText }]}
              >
                {rocket.launchTime}
              </Text>
            </View>

            <View
              style={[
                styles.missionCard,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={styles.sectionTitle}>Mission</Text>
              <Text style={[styles.missionName, { color: colors.text }]}>
                {rocket.mission}
              </Text>
              <Text
                style={[
                  styles.missionDescription,
                  { color: colors.secondaryText },
                ]}
              >
                {rocket.description}
              </Text>
            </View>

            <View
              style={[
                styles.detailsCard,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={styles.sectionTitle}>Launch Details</Text>

              <View
                style={[
                  styles.detailRow,
                  { backgroundColor: colors.cardBackground },
                ]}
              >
                <Text
                  style={[styles.detailLabel, { color: colors.secondaryText }]}
                >
                  Provider
                </Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>
                  {rocket.provider}
                </Text>
              </View>

              <View
                style={[
                  styles.detailRow,
                  { backgroundColor: colors.cardBackground },
                ]}
              >
                <Text
                  style={[styles.detailLabel, { color: colors.secondaryText }]}
                >
                  Vehicle
                </Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>
                  {rocket.vehicle}
                </Text>
              </View>

              <View
                style={[
                  styles.detailRow,
                  { backgroundColor: colors.cardBackground },
                ]}
              >
                <Text
                  style={[styles.detailLabel, { color: colors.secondaryText }]}
                >
                  Location
                </Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>
                  {rocket.location}
                </Text>
              </View>

              <View
                style={[
                  styles.detailRow,
                  { backgroundColor: colors.cardBackground },
                ]}
              >
                <Text
                  style={[styles.detailLabel, { color: colors.secondaryText }]}
                >
                  Country
                </Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>
                  {rocket.country}
                </Text>
              </View>
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
  rocketCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  rocketEmoji: {
    fontSize: 50,
  },
  rocketName: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  countdownCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  countdownText: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 8,
  },
  countdownLabel: {
    fontSize: 15,
    textAlign: "center",
  },
  missionCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  missionName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  missionDescription: {
    fontSize: 15,
    lineHeight: 22,
  },
  detailsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 15,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "right",
    flex: 1,
    marginLeft: 16,
  },
  infoCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
