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

const ThemeToggleRound = () => {
    const theme = useTheme();
    const { toggleTheme } = useContext(ThemeContext);
    return (
        <div className="theme-toggle-sticky">
            {theme === 'light' && <img className="theme-toggle-round" src={lightMode} onClick={toggleTheme} alt="light mode" />}
            {theme === 'dark' && <img className={`theme-toggle-round ${theme}`} src={darkMode} onClick={toggleTheme} alt="dark mode" />}
        </div>
    );
}
 
export default ThemeToggleRound;