import SelectInput from "../../atoms/input/SelectInput";
import Label from "../../atoms/label/Label";

const SelectInputGroup = ({
    options,
    setChosen
}) => {
    return (
        <div className="input-group">
            <Label id='selectTeacher' label='Prakses vadītājs (skola):' />
            <SelectInput 
                options={options}
                setChosen={setChosen}
            />
        </div>
    );
}
 
export default SelectInputGroup;