import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import APODWidget from "@/components/widgets/APOD";
import Colors from "@/constants/Colors";
import { APOD } from "@/types/apod";
import { useState } from "react";
import { Modal, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import APODDetailModal from "./APODDetail";

interface DayOverviewModalProps {
  date: Date | null;
  apod: APOD | null;
  loading: boolean;
  notReleased?: boolean;
  visible: boolean;
  onClose: () => void;
}

export default function DayOverviewModal({
  date,
  apod,
  loading,
  notReleased = false,
  visible,
  onClose,
}: DayOverviewModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [apodDetailVisible, setApodDetailVisible] = useState(false);

  if (!date) return null;

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleAPODPress = () => {
    setApodDetailVisible(true);
  };

  const handleCloseAPODDetail = () => {
    setApodDetailVisible(false);
  };

  return (
    <>
      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={onClose}
      >
        <View
          style={[styles.container, { backgroundColor: colors.background }]}
        >
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
              <Text style={[styles.closeText, { color: colors.tint }]}>
                Done
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView}>
            <View
              style={[styles.content, { backgroundColor: colors.background }]}
            >
              <Text style={[styles.dateTitle, { color: colors.text }]}>
                {formattedDate}
              </Text>

              <APODWidget
                apod={apod}
                loading={loading}
                notReleased={notReleased}
                onPress={handleAPODPress}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>

      <APODDetailModal
        apod={apod}
        visible={apodDetailVisible}
        onClose={handleCloseAPODDetail}
      />
    </>
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
    padding: 16,
  },
  dateTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
