import { StyleSheet, Text, View } from "react-native";

import { FontSize, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export default function AboutScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Next Chapter</Text>
      <Text style={[styles.text, { color: theme.muted }]}>
        A personal reading list where you save books you want to read, are
        reading, or have finished. Each book can have a rating, a short note and
        a cover photo.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.lg, gap: Spacing.sm },
  title: { fontSize: FontSize.title, fontWeight: "700" },
  text: { fontSize: FontSize.body, lineHeight: 22 },
});
