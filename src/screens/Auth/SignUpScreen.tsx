import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";

function SignInScreen() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('SignUp Screen')}>
      <Text>Sign Up</Text>
    </TouchableOpacity>
  );
}


export default SignInScreen;