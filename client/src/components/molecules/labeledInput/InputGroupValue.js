//style
import "./InputGroup.css";

// atoms
import Input from '../../atoms/input/Input';
import Label from '../../atoms/label/Label';

const InputGroupValue = ({ 
    id, 
    onChange, 
    type, 
    name,
    value,
    placeholder,
    label
}) => {
    return (
        <div className="input-group">
            <Label id={id} label={label} />
            <Input
                id={id}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
};

export default InputGroupValue;
