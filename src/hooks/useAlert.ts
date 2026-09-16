import { Alert } from 'react-native';

interface AlertProps {
    title: string;
    message: string;
    buttonText?: string;
    actionFn?: () => void;
}

export const useAlert = () => {

    const showAlert = ({
        title,
        message,
        buttonText = 'Delete',
        actionFn
    }: AlertProps) => {
        if (!actionFn) {
            return Alert.alert(
                title,
                message,
            )
        }

        Alert.alert(
            title,
            message,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: buttonText,
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
