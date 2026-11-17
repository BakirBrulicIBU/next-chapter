import { StyleSheet, View } from "react-native";

import StatBox from "@/components/StatBox";
import { Spacing } from "@/constants/theme";
import type { Book } from "@/types";

type SummaryRowProps = { books: Book[] };

export default function SummaryRow({ books }: SummaryRowProps) {
  const reading = books.filter((b) => b.status === "reading").length;
  const finished = books.filter((b) => b.status === "finished").length;

  return (
    <View style={styles.row}>
      <StatBox value={books.length} label="Books" />
      <StatBox value={reading} label="Reading" />
      <StatBox value={finished} label="Finished" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: Spacing.sm },
});
