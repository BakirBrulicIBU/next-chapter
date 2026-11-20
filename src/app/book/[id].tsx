import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

import EmptyState from "@/components/EmptyState";
import { getBook } from "@/data/api";
import { useTheme } from "@/hooks/use-theme";

export default function BookDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const book = getBook(id);

  if (!book) {
    return (
      <EmptyState
        title="Book not found"
        message="This book does not exist or was deleted."
      />
    );
  }

  return <Text style={{ color: theme.text }}>{book.title}</Text>;
}
