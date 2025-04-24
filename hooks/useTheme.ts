import { useUIStore } from "@/store/store";
import { darkTheme, lightTheme } from "@/styles";

export const useTheme = () => {
    const themeMode = useUIStore((state) => state.theme);
    return themeMode === 'light' ? lightTheme : darkTheme;
}