import { StyleSheet, Text, View } from "react-native";

function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ProfileScreen