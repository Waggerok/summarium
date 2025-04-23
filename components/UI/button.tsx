import { PressableProps, Text, Pressable } from "react-native"

export function Button({ text, ...props }: PressableProps & {text: string}) {
    return (
        <Pressable {...props}>
            <Text className="text-white">{text}</Text>
        </Pressable>
    )
}
