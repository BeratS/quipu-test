import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";
import { CONSTANTS } from "../Constants";

function AppHeaderActions() {
  const navigation = useNavigation<NavStackType>();

  const handleLogout = () => {
    navigation.navigate(CONSTANTS.SCREENS.SIGN_IN);
  }

  return (
    <TouchableOpacity onPress={handleLogout}>
      <Text>Logout</Text>
    </TouchableOpacity>
  );
}


export default AppHeaderActions;