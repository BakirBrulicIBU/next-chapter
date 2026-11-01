import { statusLabels, type Book } from "@/types";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type BookCardProps = {
  book: Book;
};

export default function BookCard({ book }: BookCardProps) {
  return (
    <Pressable
      onPress={() => console.log("Open", book.id)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image source={{ uri: book.coverUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{book.title}</Text>
        <Text>
          {book.author} · {statusLabels[book.status]} · {book.rating}/5
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 12, overflow: "hidden", backgroundColor: "#FFFFFF" },
  pressed: { opacity: 0.6 },
  image: { width: "100%", height: 160 },
  info: { padding: 12, gap: 4 },
  title: { fontSize: 18, fontWeight: "bold" },
});
