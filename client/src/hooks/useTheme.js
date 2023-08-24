import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

const useTheme = () => {
    const { theme } = useContext(ThemeContext);
    return theme;
}
 
export default useTheme;