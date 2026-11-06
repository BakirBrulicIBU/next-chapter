import { StyleSheet, Text, type StyleProp, type TextStyle } from "react-native";

import { FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { statusLabels, type BookStatus } from "@/types";

type StatusPillProps = {
  status: BookStatus;
  style?: StyleProp<TextStyle>;
};

export default function StatusPill({ status, style }: StatusPillProps) {
  const theme = useTheme();

  const colors = {
    finished: { color: theme.finished, backgroundColor: theme.finishedSoft },
    reading: { color: theme.reading, backgroundColor: theme.readingSoft },
    "to-read": { color: theme.toRead, backgroundColor: theme.toReadSoft },
  }[status];

  return (
    <Text style={[styles.pill, colors, style]}>{statusLabels[status]}</Text>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: "flex-start",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.pill,
    overflow: "hidden",
    fontSize: FontSize.small,
    fontWeight: "600",
  },
});
