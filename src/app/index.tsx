import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BookCard from "@/components/BookCard";
import SummaryRow from "@/components/SummaryRow";
import { Spacing } from "@/constants/theme";
import { books } from "@/data/books";

const PADDING = Spacing.xl;
const GAP = Spacing.md;

export default function Index() {
  const insets = useSafeAreaInsets();

  return (
    <FlatList
      data={books}
      keyExtractor={(book) => book.id}
      renderItem={({ item }) => <BookCard book={item} />}
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
