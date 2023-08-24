//style
import "./ButtonStyles.css";

const NavButton = ({ text, active }) => {
    return (
        <>
            <button className={`nav-button${active}`}>{text}</button>
        </>
    );
};

export default NavButton;
