import { StyleSheet, Text, View } from "react-native";

import { FontSize } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

type StarsProps = {
  rating: number;
};

export default function Stars({ rating }: StarsProps) {
  const theme = useTheme();

  return (
    <View style={styles.row} accessibilityLabel={`${rating} of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Text
          key={n}
          style={[
            styles.star,
            { color: n <= rating ? theme.star : theme.starOff },
          ]}
        >
          ★
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 2 },
  star: { fontSize: FontSize.body },
});
