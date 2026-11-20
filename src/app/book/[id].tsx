import { Stack, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import EmptyState from "@/components/EmptyState";
import { FontSize, Radius, Spacing } from "@/constants/theme";
import { getBook } from "@/data/api";
import { useTheme } from "@/hooks/use-theme";
import { statusLabels } from "@/types";
import { formatDate } from "@/utils/format";

export default function BookDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const book = getBook(id);

  if (!book) {
    return (
      <EmptyState
        title="Book not found"
        message="This book does not exist or was deleted."
      />
    );
  }

  const boxColors = { backgroundColor: theme.card, borderColor: theme.border };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingBottom: Spacing.lg + insets.bottom },
      ]}
    >
      <Stack.Screen options={{ title: book.title }} />

      <Image source={{ uri: book.coverUrl }} style={styles.photo} />

      <View>
        <Text style={[styles.title, { color: theme.text }]}>{book.title}</Text>
        <Text style={[styles.author, { color: theme.muted }]}>
          {book.author}
        </Text>
      </View>

      <View style={styles.boxes}>
        <Text style={[styles.box, boxColors, { color: theme.text }]}>
          {statusLabels[book.status]}
        </Text>
        <Text style={[styles.box, boxColors, { color: theme.text }]}>
          {book.rating} / 5 ★
        </Text>
        <Text style={[styles.box, boxColors, { color: theme.text }]}>
          {formatDate(book.addedAt)}
        </Text>
      </View>

      <View style={styles.notes}>
        <Text style={[styles.notesLabel, { color: theme.text }]}>Notes</Text>
        <Text style={[styles.notesText, { color: theme.muted }]}>
          {book.note ?? "No notes for this book."}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: Spacing.lg, paddingBottom: 0, gap: Spacing.lg },
  photo: { width: "100%", aspectRatio: 16 / 9, borderRadius: Radius.md },
  title: { fontSize: FontSize.hero, fontWeight: "800" },
  author: { fontSize: FontSize.title },
  boxes: { flexDirection: "row", flexWrap: "wrap", gap: Spacing.sm },
  box: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.sm,
    borderWidth: 1,
    overflow: "hidden",
    fontSize: FontSize.body,
    fontWeight: "600",
  },
  notes: { gap: Spacing.xs },
  notesLabel: { fontSize: FontSize.title, fontWeight: "700" },
  notesText: { fontSize: FontSize.body, lineHeight: 22 },
});
