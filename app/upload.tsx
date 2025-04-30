import UploadComponent from "@/components/uploadComponent";
import { useTheme } from "@/hooks";
import { commonStyles } from "@/styles";
import { View } from "react-native";


const Upload = () => {

    const theme = useTheme()

    return (
        <View style={[commonStyles.container, {backgroundColor: theme.bg}]}>
            <UploadComponent/>
        </View>
    );
};

export default Upload