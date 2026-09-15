import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { CONSTANTS } from "../Constants";

function AppHeaderActions() {
  const navigation = useNavigation<NavStackType>();

  const handleNavigateToProfile = () => {
    navigation.navigate(CONSTANTS.SCREENS.PROFILE);
  }

  return (
    <TouchableOpacity
      style={styles.iconButton}
      onPress={handleNavigateToProfile}>
      <Text>👤</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    marginRight: 10,
  },
});

export default AppHeaderActions;