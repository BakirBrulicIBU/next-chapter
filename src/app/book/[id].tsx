import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function BookDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <Text>Details of book {id}</Text>;
}
