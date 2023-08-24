//style
import "./InputGroup.css";

// atoms
import Textarea from '../../atoms/input/Textarea';
import Label from '../../atoms/label/Label';

const TextareaGroup = ({ 
    id, 
    onChange, 
    type, 
    name,
    value,
    placeholder, 
    label 
}) => {
    return (
        <div className="textarea-group">
            <Label id={id} label={label} />
            <Textarea
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

export default TextareaGroup;