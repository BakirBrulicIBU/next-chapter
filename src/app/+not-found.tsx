import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { FontSize, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export default function NotFoundScreen() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Not found" }} />
      <Text style={[styles.title, { color: theme.text }]}>
        This page does not exist
      </Text>
      <Link href="/" replace style={[styles.link, { color: theme.primary }]}>
        Go to the list
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
    padding: Spacing.lg,
  },
  title: { fontSize: FontSize.title, fontWeight: "700" },
  link: { fontSize: FontSize.body, fontWeight: "600" },
});
