//style
import "./ButtonStyles.css";
// hook
import useTheme from "../../../hooks/useTheme";

const PageButton2 = ({ onClick, text, active }) => {
    const theme = useTheme();
    return (
        <>
            <button className={`page-button-2${active} ${theme}`} onClick={onClick}>{text}</button>
        </>
    );
};

export default PageButton2;