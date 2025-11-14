import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { NewsArticle } from "@/types/news";
import { Image, Linking, StyleSheet, TouchableOpacity } from "react-native";

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const handlePress = () => {
    Linking.openURL(article.url);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `${diffMinutes}m ago`;
      }
      return `${diffHours}h ago`;
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colors.cardBackground, borderColor: colors.border },
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {article.image_url && (
        <Image
          source={{ uri: article.image_url }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View
        style={[styles.content, { backgroundColor: colors.cardBackground }]}
      >
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>
        <Text
          style={[styles.summary, { color: colors.secondaryText }]}
          numberOfLines={3}
        >
          {article.summary}
        </Text>
        <View
          style={[styles.footer, { backgroundColor: colors.cardBackground }]}
        >
          <Text style={[styles.source, { color: colors.tint }]}>
            {article.news_site}
          </Text>
          <Text style={[styles.date, { color: colors.secondaryText }]}>
            {formatDate(article.published_at)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#E5E5EA",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    lineHeight: 24,
  },
  summary: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  source: {
    fontSize: 13,
    fontWeight: "600",
  },
  date: {
    fontSize: 13,
  },
});
