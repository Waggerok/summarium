import { PressableProps, Text, Pressable, StyleProp, TextStyle } from "react-native"

type ButtonProps = PressableProps & {
    text: string,
    textStyle?: StyleProp<TextStyle>
}

export function Button({ text, textStyle, ...props }: ButtonProps) {

    return (
        <Pressable {...props}>
            <Text style={textStyle}>{text}</Text>
        </Pressable>
    )
}
