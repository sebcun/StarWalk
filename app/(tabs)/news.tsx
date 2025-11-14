import NewsCard from "@/components/NewsCard";
import NewsDetailModal from "@/components/NewsDetailModal";
import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { fetchSpaceNews } from "@/services/newsService";
import { NewsArticle } from "@/types/news";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function NewsScreen() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const loadNews = async () => {
    try {
      const news = await fetchSpaceNews(20);
      setArticles(news);
    } catch (error) {
      console.error("Failed to load news:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNews();
    setRefreshing(false);
  };

  const handleArticlePress = (article: NewsArticle) => {
    setSelectedArticle(article);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedArticle(null);
  };

  useEffect(() => {
    loadNews();
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.tint} />
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.tint}
          />
        }
      >
        <Text style={styles.title}>Space News</Text>
        {articles.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            onPress={() => handleArticlePress(article)}
          />
        ))}
      </ScrollView>

      <NewsDetailModal
        article={selectedArticle}
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
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
