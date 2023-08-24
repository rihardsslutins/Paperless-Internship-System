// style
import "./Forms.css";
// atoms
import PageButton from '../../atoms/button/PageButton';
// molecules
import InputGroupValue from "../../molecules/labeledInput/InputGroupValue";
import SelectInputGroup from "../../molecules/labeledInput/SelectInputGroup";

const JournalForm = ({
    id,
    onChange,
    type,
    name,
    label,
    value,
    placeholder,
    onClick,
    options,
    setChosen,
    defaultFormOption,
    buttonText
}) => {
    let inputArray = [];
    for (let i = 0; i < name.length; i++) {
        name[i] === 'teacher' ?
            inputArray.push(
                <SelectInputGroup 
                    options={options}
                    setChosen={setChosen}
                    defaultFormOption={defaultFormOption}
                    key={[i]}
                />
            )
        :
            inputArray.push(
                <InputGroupValue
                    id={id[i]}
                    onChange={onChange[i]}
                    type={type[i]}
                    name={name[i]}
                    value={value[i]}
                    label={label[i]}
                    placeholder={placeholder[i]}
                    key={[i]}
                />
            );
    }
    return (
        <form className="journal-form">
            {inputArray.map((element) => element)}
            <PageButton onClick={onClick} text={buttonText} />
        </form>
    );
};

export default JournalForm;