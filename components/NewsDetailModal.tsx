import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { NewsArticle } from "@/types/news";
import {
  Image,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface NewsDetailModalProps {
  article: NewsArticle | null;
  visible: boolean;
  onClose: () => void;
}

export default function NewsDetailModal({
  article,
  visible,
  onClose,
}: NewsDetailModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  if (!article) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const handleOpenBrowser = () => {
    Linking.openURL(article.url);
  };

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
            {article.image_url && (
              <Image
                source={{ uri: article.image_url }}
                style={styles.image}
                resizeMode="cover"
              />
            )}

            <View
              style={[
                styles.articleContent,
                { backgroundColor: colors.background },
              ]}
            >
              <Text style={styles.title}>{article.title}</Text>

              <View
                style={[styles.meta, { backgroundColor: colors.background }]}
              >
                <Text style={[styles.source, { color: colors.tint }]}>
                  {article.news_site}
                </Text>
                <Text style={[styles.date, { color: colors.secondaryText }]}>
                  {formatDate(article.published_at)}
                </Text>
              </View>

              <Text style={[styles.summary, { color: colors.text }]}>
                {article.summary}
              </Text>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.tint }]}
                onPress={handleOpenBrowser}
              >
                <Text style={styles.buttonText}>Read Full Article</Text>
              </TouchableOpacity>
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
    height: 250,
    backgroundColor: "#E5E5EA",
  },
  articleContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 34,
    marginBottom: 12,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#C6C6C8",
  },
  source: {
    fontSize: 15,
    fontWeight: "600",
  },
  date: {
    fontSize: 14,
  },
  summary: {
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 30,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
});
