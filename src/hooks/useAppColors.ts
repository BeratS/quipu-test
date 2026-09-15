import { useColorScheme } from 'react-native';
import { darkColors, lightColors } from '../styles/colors';
import { createStyles } from '../styles/global.style';

export const useAppStyle = () => {
    const scheme = useColorScheme();

    const styleColors = scheme === 'dark' ? darkColors : lightColors;

    return {
        colors: styleColors,
        styles: createStyles(styleColors),
    };
};
