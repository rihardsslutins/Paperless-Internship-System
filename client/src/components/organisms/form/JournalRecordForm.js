// style
import "./Forms.css";
// atoms
import PageButton from "../../atoms/button/PageButton";
// molecules
import TextareaGroup from "../../molecules/labeledInput/TextareaGroup";
import InputGroupValue from "../../molecules/labeledInput/InputGroupValue";
import DangerButton from "../../atoms/button/DangerButton2";

const JournalRecordForm = ({
    formTitle,
    id,
    name,
    label,
    type,
    value,
    onClick,
    onChange,
    buttonText,
    cancelButtonText,
    cancelButton
}) => {
    let inputArray = [];
    for (let i = 0; i < name.length; i++) {
        if(i === 1) {
            inputArray.push(
                <TextareaGroup 
                    id={id[i]}
                    onChange={onChange[i]}
                    type={type[i]}
                    name={name[i]}
                    value={value[i]}
                    label={label[i]}
                    key={[i]} 
                />
            );
        } else {
            inputArray.push(
                <InputGroupValue
                    id={id[i]}
                    onChange={onChange[i]}
                    type={type[i]}
                    value={value[i]}
                    name={name[i]}
                    label={label[i]}
                    key={[i]}
                />
            );
        }
    }
    return (
        <div className="journal-record-form">
            <h2>{formTitle}</h2>
            <form>
                {inputArray.map((element) => element)}
                <div className="journal-record-from-flex">
                    {cancelButton && <DangerButton text={cancelButtonText} onClick={cancelButton} />}
                    <PageButton onClick={onClick} text={buttonText} />
                </div>
            </form>
        </div>
    );
}
 
export default JournalRecordForm;