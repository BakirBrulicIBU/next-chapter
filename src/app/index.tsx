import { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
import SummaryRow from "@/components/SummaryRow";
import { FontSize, Spacing } from "@/constants/theme";
import { fetchBooks } from "@/data/api";
import { useTheme } from "@/hooks/use-theme";
import type { Book } from "@/types";

const PADDING = Spacing.xl;
const GAP = Spacing.md;

type Status = "loading" | "error" | "ready";

export default function Index() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const theme = useTheme();

  const [books, setBooks] = useState<Book[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [attempt, setAttempt] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

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

  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const cardWidth = Math.floor(
    (width - 2 * PADDING - (columns - 1) * GAP) / columns,
  );

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
      data={books}
      keyExtractor={(book) => book.id}
      numColumns={columns}
      columnWrapperStyle={columns > 1 ? { gap: GAP } : undefined}
      renderItem={({ item }) => (
        <BookCard book={item} style={{ width: cardWidth }} />
      )}
      ListHeaderComponent={<SummaryRow books={books} />}
      ListHeaderComponentStyle={{ marginBottom: Spacing.xl }}
      ListEmptyComponent={
        <EmptyState
          title="No books yet"
          message="Your books will appear here."
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
});
