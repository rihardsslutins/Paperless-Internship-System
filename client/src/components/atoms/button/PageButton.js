//style
import "./ButtonStyles.css";

const PageButton = ({
    onClick, 
    text
}) => {
    return (
        <>
            <button className="page-button" onClick={onClick}>{text}</button>
        </>
    );
};

export default PageButton;