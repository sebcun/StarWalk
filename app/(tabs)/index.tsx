import APODDetailModal from "@/components/modals/APODDetail";
import { Text } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import APODWidget from "@/components/widgets/APOD";
import Colors from "@/constants/Colors";
import { fetchAPOD } from "@/services/apodService";
import { APOD } from "@/types/apod";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [apod, setApod] = useState<APOD | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const loadAPOD = async () => {
    try {
      const data = await fetchAPOD();
      setApod(data);
    } catch (error) {
      console.error("Failed to load APOD:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAPOD();
    setRefreshing(false);
  };

  const handleAPODPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    loadAPOD();
  }, []);

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
        <Text style={styles.title}>Discover</Text>

        <APODWidget apod={apod} loading={loading} onPress={handleAPODPress} />
      </ScrollView>

      <APODDetailModal
        apod={apod}
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
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
  },
  placeholder: {
    padding: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: 15,
  },
});
