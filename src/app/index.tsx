import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BookCard from "@/components/BookCard";
import StatBox from "@/components/StatBox";
import { Spacing } from "@/constants/theme";
import { books } from "@/data/books";

export default function Index() {
  const insets = useSafeAreaInsets();

  const reading = books.reduce(
    (count, book) => (book.status === "reading" ? count + 1 : count),
    0,
  );
  const finished = books.reduce(
    (count, book) => (book.status === "finished" ? count + 1 : count),
    0,
  );

  return (
    <ScrollView
      contentContainerStyle={[
        styles.content,
        { paddingBottom: Spacing.xl + insets.bottom },
      ]}
    >
      <View style={styles.summary}>
        <StatBox value={books.length} label="Books" />
        <StatBox value={reading} label="Reading" />
        <StatBox value={finished} label="Finished" />
      </View>

      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: Spacing.xl, gap: Spacing.md },
  summary: { flexDirection: "row", gap: Spacing.sm },
});
