import { statusLabels, type Book } from "@/types";
import { Image, ScrollView, StyleSheet, Text } from "react-native";

type BookDetailsProps = {
  book: Book;
};

export default function BookDetails({ book }: BookDetailsProps) {
  const stars = "★".repeat(book.rating) + "☆".repeat(5 - book.rating);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: book.coverUrl }} style={styles.image} />
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>
      <Text>Status: {statusLabels[book.status]}</Text>
      <Text>Rating: {stars}</Text>
      {book.note ? <Text>Note: {book.note}</Text> : null}
      <Text>Added: {book.addedAt}</Text>
      <Text>Last updated: {book.updatedAt}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 8 },
  image: { width: "100%", height: 300, borderRadius: 12 },
  title: { fontSize: 26, fontWeight: "bold" },
  author: { fontSize: 18, color: "#666" },
});
