import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { APOD } from "@/types/apod";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface APODDetailModalProps {
  apod: APOD | null;
  visible: boolean;
  onClose: () => void;
}

export default function APODDetailModal({
  apod,
  visible,
  onClose,
}: APODDetailModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  if (!apod) return null;

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
            {apod.media_type === "image" && (
              <Image
                source={{ uri: apod.hdurl || apod.url }}
                style={styles.image}
                resizeMode="contain"
              />
            )}

            <View
              style={[
                styles.textContent,
                { backgroundColor: colors.background },
              ]}
            >
              <Text style={styles.title}>{apod.title}</Text>
              <Text style={[styles.date, { color: colors.secondaryText }]}>
                {new Date(apod.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>

              <View
                style={[styles.divider, { backgroundColor: colors.border }]}
              />

              <Text style={[styles.explanation, { color: colors.text }]}>
                {apod.explanation}
              </Text>

              {apod.copyright && (
                <View
                  style={[
                    styles.copyrightBox,
                    {
                      backgroundColor: colors.cardBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.copyrightLabel,
                      { color: colors.secondaryText },
                    ]}
                  >
                    Image Credit
                  </Text>
                  <Text style={[styles.copyright, { color: colors.text }]}>
                    {apod.copyright}
                  </Text>
                </View>
              )}
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
  },
  image: {
    width: "100%",
    height: 300,
    backgroundColor: "#E5E5EA",
  },
  textContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 34,
    marginBottom: 8,
  },
  date: {
    fontSize: 15,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    marginBottom: 16,
  },
  explanation: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  copyrightBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  copyrightLabel: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  copyright: {
    fontSize: 15,
    lineHeight: 20,
  },
});
