import { StyleSheet } from "react-native";
import colors from "./colors";

const componentsStyles = StyleSheet.create({
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000',
        height: '100%'
    },
    button: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 48
    }
}) 

export default componentsStyles;
