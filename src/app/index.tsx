import { FlatList, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BookCard from "@/components/BookCard";
import SummaryRow from "@/components/SummaryRow";
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
      ItemSeparatorComponent={() => <View style={{ height: GAP }} />}
      contentContainerStyle={{
        padding: PADDING,
        paddingBottom: PADDING + insets.bottom,
      }}
    />
  );
}
