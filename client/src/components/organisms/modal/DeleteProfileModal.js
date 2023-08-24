// style
import "./Modal.css";
// assets
import closeBlack from "../../../assets/closeBlack.svg"
// atoms
import PageButton from "../../atoms/button/PageButton";
import DangerButton from "../../atoms/button/DangerButton";
import Alert from "../../atoms/alerts/Alert";
// molecules
import LabeledInput from "../../molecules/labeledInput/InputGroup";
// hooks
import { useState } from "react";
import useTheme from "../../../hooks/useTheme";

const DeleteProfileModal = ({
    role,
    display,
    handleClose
}) => {
    const theme = useTheme();
    const [passwordCheck, setPasswordCheck] = useState('');
    const [alert, setAlert] = useState('');

    const userPassword = {
        password: 'parole123'
    }

    const handleDeleteProfile = () => {
        if (userPassword.password === passwordCheck) {
            console.log('Delete profile from database and navigate to guest home');
            handleModel();
        } else {
            setAlert('Nepareiza parole!');
        }
    }

    let modalText;
    switch (role){
        case "student":
            modalText = 'savām';
            break;
        case "teacher":
            modalText = 'studentu';
            break;
        case "supervisor":
            modalText = 'praktikantu';
            break;
        default:
            modalText = '';
    }

    const handleModel = () => {
        handleClose();
        handleAlertClose();
    }
    const handleAlertClose = () => {
        setAlert('');
    }

    return (
        <>
            {display &&
                <div className="delete-profile-modal">
                    <div className={`modal-content ${theme}`}>
                        <div className="modal-header">
                            <h2>Profila dzēšana</h2>
                            <img src={closeBlack} alt="close modal" onClick={handleModel} />
                        </div>
                        <div className="modal-body">
                            <h3>Ja dzēsīsiet profilu, tad Jums vairs nebūs pieejas {modalText} dienasgrāmatām.</h3>
                            <h3>Profila dzēšana ir neatgriezeniska darbība!</h3>
                            {alert && <Alert type="warning" text={alert} handleAlertClose={handleAlertClose} />}
                            <LabeledInput
                                id='password'
                                name='password'
                                label='Ievadiet paroli, lai dzēstu profilu:'
                                type='password'
                                onChange={e => setPasswordCheck(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer">
                            <PageButton text="Atcelt" onClick={handleModel} />
                            <DangerButton text="Dzēst profilu" onClick={handleDeleteProfile} />
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
 
export default DeleteProfileModal;