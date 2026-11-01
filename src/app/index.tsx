import BookCard from "@/components/BookCard";
import { books } from "@/data/books";
import { ScrollView, Text } from "react-native";

export default function Index() {
  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Text>{books.length} books</Text>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </ScrollView>
  );
}
