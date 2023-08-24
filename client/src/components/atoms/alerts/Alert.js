// style
import "./Alerts.css";
// assets
import closeCircle from "../../../assets/closeCircle.svg";

const Alert = ({
    type,
    text,
    link,
    handleAlertClose
}) => {
    return (
        <>
            {type &&
                <div className={`alert-box ${type}`}>
                    <img src={require(`../../../assets/${type}.svg`)} alt={`${type} alert icon`} />
                    <div className="alert-text">{text} {link && <a className="alert-link" href={link[1]}>{link[0]}</a>}</div>
                    <img className="close-alert" src={closeCircle} alt={`close ${type} alert`} onClick={handleAlertClose} />
                </div>
            }
        </>
    );
}
 
export default Alert;