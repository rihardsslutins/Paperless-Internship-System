//style
import "./ButtonStyles.css";

const DangerButton = ({ onClick, text }) => {
    return (
        <>
            <button className="danger-button-2" onClick={onClick}>{text}</button>
        </>
    );
};

export default DangerButton;