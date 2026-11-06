import { ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BookCard from "@/components/BookCard";
import { Spacing } from "@/constants/theme";
import { books } from "@/data/books";

export default function Index() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.content,
        { paddingBottom: Spacing.xl + insets.bottom },
      ]}
    >
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: Spacing.xl, gap: Spacing.md },
});
