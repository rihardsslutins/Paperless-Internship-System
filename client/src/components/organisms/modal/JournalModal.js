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
// packages
import axios from "axios";
import Cookies from "js-cookie";

const JournalModal = ({
    email,
    id,
    display,
    handleClose,
    setRefreshTable
}) => {

    const theme = useTheme();

    // Alert
    const [alert, setAlert] = useState('');
    const handleAlertClose = () => {
        setAlert('');
    }
    const [passwordCheck, setPasswordCheck] = useState('');
    const [endingDate, setEndingDate] = useState('');

    const handleEndJournal = async (e) => {
        e.preventDefault()
        try {
            setAlert('');
                await axios.put(`${process.env.REACT_APP_SERVER_URL}/internships/${id}`,
                    {
                        email,
                        password: passwordCheck,
                        endingDate
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('auth')}`
                        }
                    }
                )
                handleModel();
                setRefreshTable(false);
                setRefreshTable(true);
        } catch (err) {
            const errors = err.response.data.errors;
            const propertyOrder = ['password', 'endingDate'];
            handleErrors(errors, propertyOrder);
        }
    }

    // Error handling
    const handleErrors = (errors, propertyOrder) => {
        for (let i = 0; i < propertyOrder.length; i++) {
            if (errors[propertyOrder[i]]) {
                setAlert(errors[propertyOrder[i]]);
                return;
            } else {
                setAlert('');
            }
        }
    };

    const handleModel = () => {
        handleClose();
        handleAlertClose();
    }

    return (
        <>
            {display && 
                <div className="journal-modal">
                    <div className={`modal-content ${theme}`}>
                        <div className="modal-header">
                            <h2>Dienasgrāmatas noslēgšana</h2>
                            <img src={closeBlack} alt="close modal" onClick={handleModel} />
                        </div>
                        <div className="modal-body">
                            <h3>Ja noslēgsiet dienasgrāmatu, tad šajā dienasgrāmatā vairs nebūs iespējams pievienot jaunus ierakstus, kā arī prakses vadītājs nevarēs Jums ielikt atzīmes!</h3>
                            {alert && <Alert type="warning" text={alert} handleAlertClose={handleAlertClose} />}
                            <div className="journal-modal-inputs">
                                <LabeledInput
                                    id='endDate'
                                    name='endDate'
                                    label='Prakses beigu datums:'
                                    type='date'
                                    onChange={e => setEndingDate(e.target.value)}
                                />
                                <LabeledInput
                                    id='companyName'
                                    name='companyName'
                                    label='Ievadiet savu paroli, lai noslēgtu praksi:'
                                    type='password'
                                    onChange={e => setPasswordCheck(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <PageButton text="Atcelt" onClick={handleModel} />
                            <DangerButton text="Noslēgt praksi" onClick={handleEndJournal} />
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
 
export default JournalModal;