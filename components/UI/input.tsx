import { commonStyles } from "@/styles/styles";
import { TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  icon?: React.ReactNode;
}

export default function Input({icon, ...props}: InputProps) {
  return (

    <View style={commonStyles.inputWrapper}>
      {icon && <View style={{marginRight: 10}}>{icon}</View>}
      <TextInput 
        style={commonStyles.input}
        {...props}
        placeholderTextColor='gray'
      />
    </View>

    
  );
}