import { StyleSheet, Text, View } from "react-native";
import { CONSTANTS } from "../Constants";

function AppHeaderLogo() {
    return (
        <View style={styles.mainContainer}>
            <Text>{CONSTANTS.APP_NAME}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    paddingVertical: 12
  }
});

export default AppHeaderLogo;