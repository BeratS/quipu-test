import { Alert } from 'react-native';

interface AlertProps {
    title: string;
    message: string;
    actionFn: () => void;
}

export const useAlert = () => {

    const showAlert = ({ title, message, actionFn }: AlertProps) => {
        Alert.alert(
            title,
            message,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Sign Out',
                    style: 'destructive',
                    onPress: actionFn,
                },
            ],
        );
    };

    return {
        showAlert,
    };
};
