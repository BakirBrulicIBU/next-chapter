import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BookCard from "@/components/BookCard";
import EmptyState from "@/components/EmptyState";
import FilterChip from "@/components/FilterChip";
import SummaryRow from "@/components/SummaryRow";
import { FontSize, Spacing } from "@/constants/theme";
import { fetchBooks } from "@/data/api";
import { useTheme } from "@/hooks/use-theme";
import { statusLabels, type Book, type BookStatus } from "@/types";

const PADDING = Spacing.xl;
const GAP = Spacing.md;

type Status = "loading" | "error" | "ready";
type Filter = "all" | BookStatus;
type Sort = "none" | "newest" | "rating";

const filters: Filter[] = ["all", "to-read", "reading", "finished"];

const emptyTitles: Record<Filter, string> = {
  all: "No books yet",
  "to-read": "No books to read",
  reading: "No books in progress",
  finished: "No finished books",
};

export default function Index() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const theme = useTheme();

  const [books, setBooks] = useState<Book[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [attempt, setAttempt] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("none");

  useEffect(() => {
    let ignore = false;
    fetchBooks()
      .then((data) => {
        if (!ignore) {
          setBooks(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!ignore) setStatus("error");
      });
    return () => {
      ignore = true;
    };
  }, [attempt]);

  function retry() {
    setStatus("loading");
    setAttempt((a) => a + 1);
  }

  async function refresh() {
    setRefreshing(true);
    try {
      setBooks(await fetchBooks());
    } finally {
      setRefreshing(false);
    }
  }

  function confirmDelete(book: Book) {
    Alert.alert("Delete book?", `"${book.title}" will be removed.`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setBooks((list) => list.filter((b) => b.id !== book.id)),
      },
    ]);
  }

  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const cardWidth = Math.floor(
    (width - 2 * PADDING - (columns - 1) * GAP) / columns,
  );

  const visible =
    filter === "all" ? books : books.filter((b) => b.status === filter);

  const sorted =
    sort === "newest"
      ? [...visible].sort((a, b) => b.addedAt.localeCompare(a.addedAt))
      : sort === "rating"
        ? [...visible].sort((a, b) => b.rating - a.rating)
        : visible;

  if (status === "loading") {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (status === "error") {
    return (
      <View style={styles.center}>
        <Text style={[styles.error, { color: theme.text }]}>
          Could not load books
        </Text>
        <Button title="Try again" onPress={retry} color={theme.primary} />
      </View>
    );
  }

  return (
    <FlatList
      key={columns}
      data={sorted}
      keyExtractor={(book) => book.id}
      numColumns={columns}
      columnWrapperStyle={columns > 1 ? { gap: GAP } : undefined}
      renderItem={({ item }) => (
        <BookCard
          book={item}
          style={{ width: cardWidth }}
          onLongPress={() => confirmDelete(item)}
        />
      )}
      ListHeaderComponent={
        <View style={styles.header}>
          <SummaryRow books={books} />
          <View style={styles.chips}>
            {filters.map((f) => (
              <FilterChip
                key={f}
                label={f === "all" ? "All" : statusLabels[f]}
                selected={filter === f}
                onPress={() => setFilter(f)}
              />
            ))}
          </View>
          <View style={styles.chips}>
            <FilterChip
              label="Newest"
              selected={sort === "newest"}
              onPress={() => setSort(sort === "newest" ? "none" : "newest")}
            />
            <FilterChip
              label="Top rated"
              selected={sort === "rating"}
              onPress={() => setSort(sort === "rating" ? "none" : "rating")}
            />
          </View>
        </View>
      }
      ListHeaderComponentStyle={{ marginBottom: Spacing.xl }}
      ListEmptyComponent={
        <EmptyState
          title={emptyTitles[filter]}
          message={
            filter === "all"
              ? "Your books will appear here."
              : "Choose another status."
          }
        />
      }
      ItemSeparatorComponent={() => <View style={{ height: GAP }} />}
      refreshing={refreshing}
      onRefresh={refresh}
      contentContainerStyle={{
        flexGrow: 1,
        padding: PADDING,
        paddingBottom: PADDING + insets.bottom,
      }}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
    padding: PADDING,
  },
  error: { fontSize: FontSize.title, fontWeight: "600" },
  header: { gap: Spacing.lg },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: Spacing.sm },
});
