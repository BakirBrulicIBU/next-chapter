import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import Stars from "@/components/Stars";
import StatusPill from "@/components/StatusPill";
import { FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { Book } from "@/types";

type BookCardProps = {
  book: Book;
  style?: StyleProp<ViewStyle>;
};

export default function BookCard({ book, style }: BookCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={() => console.log("Open", book.id)}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
        pressed && styles.pressed,
        style,
      ]}
    >
      <View>
        <Image source={{ uri: book.coverUrl }} style={styles.photo} />
        <StatusPill status={book.status} style={styles.badge} />
      </View>

      <View style={styles.info}>
        <View style={styles.text}>
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
            {book.title}
          </Text>
          <Text
            style={[styles.author, { color: theme.muted }]}
            numberOfLines={1}
          >
            {book.author}
          </Text>
          <Stars rating={book.rating} />
        </View>
        <Text style={[styles.chevron, { color: theme.muted }]}>›</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: Radius.md, borderWidth: 1, overflow: "hidden" },
  pressed: { opacity: 0.7 },
  photo: { width: "100%", aspectRatio: 16 / 9 },
  badge: { position: "absolute", top: Spacing.sm, right: Spacing.sm },
  info: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  text: { flex: 1, gap: Spacing.xs },
  title: { fontSize: FontSize.title, fontWeight: "700" },
  author: { fontSize: FontSize.body },
  chevron: { fontSize: FontSize.hero },
});
