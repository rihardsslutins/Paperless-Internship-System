// style
import "./ThemeToggle.css";
// icons
import lightMode from "../../assets/lightMode.svg";
import darkMode from "../../assets/darkMode.svg";
// hooks
import { useContext } from "react";
import useTheme from "../../hooks/useTheme";
// context
import { ThemeContext } from "../../contexts/ThemeContext";

const ThemeToggle = () => {
    const theme = useTheme();
    const { toggleTheme } = useContext(ThemeContext);
    return (
        <>
            {theme === 'light' && <span className="toggle-theme" onClick={toggleTheme} ><img src={lightMode} alt="light mode" /> Gaišais</span>}
            {theme === 'dark' && <span className="toggle-theme" onClick={toggleTheme} ><img src={darkMode} alt="dark mode" /> Tumšais</span>}
        </>
    );
}
 
export default ThemeToggle;