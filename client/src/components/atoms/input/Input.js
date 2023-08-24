//style
import "./Inputs.css";
// hooks
import useTheme from "../../../hooks/useTheme";

const Input = ({ 
    id, 
    onChange, 
    type, 
    name,
    value,
    placeholder 
}) => {
    const theme = useTheme();
    return (
        <input
            className={`input-field ${theme}`}
            type={type}
            name={name}
            id={id}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
};

export default Input;
