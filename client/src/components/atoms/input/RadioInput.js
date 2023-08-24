// style
import "./Inputs.css";
//hooks
import useTheme from "../../../hooks/useTheme";


const RadioInput = ({
    radioLabel,
    name,
    id,
    text,
    radioOnClick,
    radioValue
}) => {
    const theme = useTheme();
    return (
        <label className={`radio-input-item ${theme}`} htmlFor={radioLabel}>
            <input className="radio-input-field" type="radio" name={name} id={id} value={radioValue} onClick={radioOnClick}/>
            <span className="radio-checkmark"></span>
            {text}
        </label>
    );
}
 
export default RadioInput;