// style
import "./Forms.css";
// atoms
import PageButton from '../../atoms/button/PageButton';
import PageButton2 from '../../atoms/button/PageButton2';
// molecules
import InputGroup from '../../molecules/labeledInput/InputGroup';

import { useNavigate } from "react-router-dom";
import InputGroupValue from "../../molecules/labeledInput/InputGroupValue";

const UpdateProfileForm = ({
    id,
    name,
    label,
    type,
    onChange,
    value,
    onClick,
    buttonText,
    editForm
}) => {

    const navigate = useNavigate();

    const formClass = editForm ? "update-profile" : "change-password";

    let inputArray = [];
    for (let i = 0; i < name.length; i++) {
        if (editForm) {
            inputArray.push(
                <InputGroupValue
                    id={id[i]}
                    name={name[i]}
                    label={label[i]}
                    type={type[i]}
                    onChange={onChange[i]}
                    value={value[i]}
                    key={[i]}
                />
            );
        } else {
            inputArray.push(
                <InputGroupValue
                    id={id[i]}
                    name={name[i]}
                    label={label[i]}
                    type={type[i]}
                    onChange={onChange[i]}
                    value={value[i]}
                    key={[i]}
                />
            );
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        navigate(-1);
    }

    return (
        <form className="edit-profile-form">
            <div className={`${formClass}-form-grid`}>
                {inputArray.map((element) => element)}
                <div className="edit-profile-buttons">
                    <PageButton onClick={onClick} text={buttonText} />
                    <PageButton2 text='Atpakaļ' active='' onClick={handleCancel}/>
                </div>
            </div>
        </form>
    );
};

export default UpdateProfileForm;