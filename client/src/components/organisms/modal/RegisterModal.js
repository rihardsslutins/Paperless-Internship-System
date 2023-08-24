// style
import "./Modal.css";
// atoms
import PageButton from "../../atoms/button/PageButton";
// assets
import closeBlack from "../../../assets/closeBlack.svg"
//hooks
import useTheme from "../../../hooks/useTheme";
import { Link } from "react-router-dom";

const RegisterModal = ({title, body, display, handleClose, buttonText, role}) => {
    const theme = useTheme();
    return (
        <>
        {display && 
            <div className="modal">
                <div className={`modal-content ${theme}`}>
                    <div className="modal-header">
                        <h2>{title}</h2>
                        <img src={closeBlack} alt="close modal" onClick={handleClose} />
                    </div>
                    <div className="modal-body">
                        <p>{body}</p>
                    </div>
                    <div className="modal-footer">
                        <Link to={`/register?role=${role}`}><PageButton text={buttonText} /></Link>
                    </div>
                </div>
            </div>
        }
        </>
    );
}
 
export default RegisterModal;