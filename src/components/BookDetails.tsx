import type { ReactNode } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import Stars from "@/components/Stars";
import StatusPill from "@/components/StatusPill";
import { FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { Book } from "@/types";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(iso: string) {
  const [year, month, day] = iso.split("-");
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}

type BookDetailsProps = {
  book: Book;
};

export default function BookDetails({ book }: BookDetailsProps) {
  const theme = useTheme();
  const cardColors = { backgroundColor: theme.card, borderColor: theme.border };

  return (
    <View style={styles.container}>
      <Image source={{ uri: book.coverUrl }} style={styles.photo} />

      <View>
        <Text style={[styles.title, { color: theme.text }]}>{book.title}</Text>
        <Text style={[styles.author, { color: theme.muted }]}>
          {book.author}
        </Text>
      </View>

      {book.note ? (
        <View style={[styles.card, cardColors]}>
          <Text style={[styles.noteLabel, { color: theme.muted }]}>
            MY NOTE
          </Text>
          <Text style={[styles.noteText, { color: theme.text }]}>
            {book.note}
          </Text>
        </View>
      ) : null}

      <View style={[styles.card, cardColors]}>
        <Row label="Status">
          <StatusPill status={book.status} />
        </Row>
        <Row label="Rating" divider>
          <Stars rating={book.rating} />
        </Row>
        <Row label="Added" divider>
          {formatDate(book.addedAt)}
        </Row>
        <Row label="Last updated" divider>
          {formatDate(book.updatedAt)}
        </Row>
      </View>
    </View>
  );
}

type RowProps = {
  label: string;
  children: ReactNode;
  divider?: boolean;
};

// One "label ...... value" line
function Row({ label, children, divider }: RowProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.row,
        divider && styles.divider,
        { borderColor: theme.border },
      ]}
    >
      <Text style={[styles.label, { color: theme.muted }]}>{label}</Text>
      {typeof children === "string" ? (
        <Text style={[styles.value, { color: theme.text }]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    gap: Spacing.lg,
  },
  photo: { width: "100%", aspectRatio: 16 / 9, borderRadius: Radius.md },
  title: { fontSize: FontSize.hero, fontWeight: "800" },
  author: { fontSize: FontSize.title },
  card: { padding: Spacing.lg, borderRadius: Radius.md, borderWidth: 1 },
  noteLabel: {
    fontSize: FontSize.small,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: Spacing.xs,
  },
  noteText: { fontSize: FontSize.body, lineHeight: 22 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  divider: { borderTopWidth: 1 },
  label: { fontSize: FontSize.body },
  value: {
    fontSize: FontSize.body,
    fontWeight: "600",
    flexShrink: 1,
    textAlign: "right",
  },
});
