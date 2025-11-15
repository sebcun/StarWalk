import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { APOD } from "@/types/apod";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface APODWidgetProps {
  apod: APOD | null;
  loading: boolean;
  onPress: () => void;
}

export default function APODWidget({
  apod,
  loading,
  onPress,
}: APODWidgetProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          },
        ]}
      >
        <ActivityIndicator size="small" color={colors.tint} />
        <Text style={[styles.loadingText, { color: colors.secondaryText }]}>
          Loading...
        </Text>
      </View>
    );
  }

  if (!apod) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.cardBackground, borderColor: colors.border },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.header, { backgroundColor: colors.cardBackground }]}>
        <Text style={styles.widgetTitle}>Astronomy Picture of the Day</Text>
        <Text style={[styles.date, { color: colors.secondaryText }]}>
          {new Date(apod.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Text>
      </View>

      {apod.media_type === "image" && (
        <Image
          source={{ uri: apod.url }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <View
        style={[styles.content, { backgroundColor: colors.cardBackground }]}
      >
        <Text style={styles.title} numberOfLines={2}>
          {apod.title}
        </Text>
        <Text
          style={[styles.description, { color: colors.secondaryText }]}
          numberOfLines={3}
        >
          {apod.explanation}
        </Text>
        {apod.copyright && (
          <Text style={[styles.copyright, { color: colors.secondaryText }]}>
            © {apod.copyright}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 16,
  },
  header: {
    padding: 16,
    paddingBottom: 12,
  },
  widgetTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
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
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 8,
    lineHeight: 22,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  copyright: {
    fontSize: 12,
    fontStyle: "italic",
  },
  loadingText: {
    fontSize: 14,
    marginTop: 8,
  },
});
