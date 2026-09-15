import { StyleSheet, Text, View } from "react-native";
import { CONSTANTS } from "../Constants";

function AppHeaderLogo() {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.logoText}>{CONSTANTS.APP_NAME}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AppHeaderLogo;