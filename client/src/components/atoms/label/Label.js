//style
import "./Label.css";

const Label = ({ id, label }) => {
    return (
        <label htmlFor={id} className="input-label" >
            {label}
        </label>
    );
};

export default Label;
