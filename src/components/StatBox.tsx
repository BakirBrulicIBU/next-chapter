import { StyleSheet, Text, View } from "react-native";

import { FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

type StatBoxProps = {
  value: number;
  label: string;
};

export default function StatBox({ value, label }: StatBoxProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.box,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
      <Text style={[styles.label, { color: theme.muted }]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    padding: Spacing.lg,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  value: { fontSize: FontSize.hero, fontWeight: "800" },
  label: { fontSize: FontSize.small },
});
