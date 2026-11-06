import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BookCard from "@/components/BookCard";
import StatBox from "@/components/StatBox";
import { Spacing } from "@/constants/theme";
import { books } from "@/data/books";

const PADDING = Spacing.xl;
const GAP = Spacing.md;

export default function Index() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const cardWidth = Math.floor(
    (width - 2 * PADDING - (columns - 1) * GAP) / columns,
  );

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
        { paddingBottom: PADDING + insets.bottom },
      ]}
    >
      <View style={styles.summary}>
        <StatBox value={books.length} label="Books" />
        <StatBox value={reading} label="Reading" />
        <StatBox value={finished} label="Finished" />
      </View>

      <View style={styles.grid}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} style={{ width: cardWidth }} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: PADDING, gap: Spacing.xl },
  summary: { flexDirection: "row", gap: Spacing.sm },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: GAP },
});
