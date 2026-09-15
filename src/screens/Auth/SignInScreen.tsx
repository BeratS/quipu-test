import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";
import { CONSTANTS } from "../../Constants";

function SignInScreen() {
  const navigation = useNavigation<NavStackType>();

  const handleSignIn = () => {
    navigation.navigate(CONSTANTS.SCREENS.MAIN_APP);
  };

  return (
    <TouchableOpacity onPress={handleSignIn}>
      <Text>Sign In</Text>
    </TouchableOpacity>
  );
}


export default SignInScreen;