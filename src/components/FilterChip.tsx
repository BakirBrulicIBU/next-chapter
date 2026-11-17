import { Pressable, StyleSheet, Text } from "react-native";

import { FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

type FilterChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export default function FilterChip({
  label,
  selected,
  onPress,
}: FilterChipProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={[
        styles.chip,
        selected
          ? { backgroundColor: theme.primary, borderColor: theme.primary }
          : { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <Text
        style={[
          styles.label,
          { color: selected ? theme.onPrimary : theme.text },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  label: { fontSize: FontSize.body, fontWeight: "600" },
});
