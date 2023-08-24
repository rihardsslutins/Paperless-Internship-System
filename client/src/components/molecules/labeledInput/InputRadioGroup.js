// style
import RadioInput from "../../atoms/input/RadioInput";
import Label from "../../atoms/label/Label";
import "./InputGroup.css";

//atmos


const InputRadioGroup = ({ 
    radioGroupLabel, 
    radioLabel, 
    name,
    id,
    text,
    radioOnClick,
    radioValue
}) => {
    let inputRadioArray = [];
    for (let i = 0; i < name.length; i++) {
        inputRadioArray.push(
            <RadioInput 
                radioLabel={radioLabel[i]} 
                name={name[i]} 
                id={id[i]}
                text={text[i]}
                radioValue={radioValue[i]}
                radioOnClick={radioOnClick}
                key={[i]}
            />
        )
    }
    return (
        <div className="input-radio-group">
            <Label label={radioGroupLabel} />
            <div className="radio-input">
                {inputRadioArray.map((element) => element)}
            </div>
        </div>
    );
}
 
export default InputRadioGroup;