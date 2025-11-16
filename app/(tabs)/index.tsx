import APODDetailModal from "@/components/modals/APODDetail";
import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import APODWidget from "@/components/widgets/APOD";
import KpIndexWidget from "@/components/widgets/aurora";
import Colors from "@/constants/Colors";
import { fetchAPOD } from "@/services/apodService";
import { fetchKpIndex } from "@/services/auroraService";
import { APOD } from "@/types/apod";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [apod, setApod] = useState<APOD | null>(null);
  const [kpIndex, setKpIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [kpLoading, setKpLoading] = useState(true);
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

  const loadKpIndex = async () => {
    try {
      const data = await fetchKpIndex();
      setKpIndex(data);
    } catch (error) {
      console.error("Failed to load KP Index:", error);
    } finally {
      setKpLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([loadAPOD(), loadKpIndex()]);
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
    loadKpIndex();
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
        <View
          style={[styles.widgetRow, { backgroundColor: colors.background }]}
        >
          <KpIndexWidget kpIndex={kpIndex} loading={kpLoading} />
        </View>
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
  widgetRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
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
