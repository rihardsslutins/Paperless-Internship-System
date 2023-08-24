// style
import "./SupervisorProfileEdit.css";
// assets
import male from "../../../assets/male.svg";
import female from "../../../assets/female.svg";
// assets
import PageButton from "../../../components/atoms/button/PageButton";
// organisms
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import UpdateProfileForm from "../../../components/organisms/form/UpdateProfileForm";

import { useState } from "react";
import Alert from "../../../components/atoms/alerts/Alert";
// redux
import { connect } from "react-redux";
// packages
import axios from 'axios';
import Cookies from "js-cookie";

const SupervisorProfileEdit = (props) => {

    const supervisor = props.user

    // Sidebar
    const icon = ['home', 'journal', 'invite', 'settings'];
    const imgAlt = ['home page', 'journal page', 'invite page', 'settings page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Uzaicinājumi', 'Iestatījumi'];
    const link = ['supervisor-home', 'supervisor-journal', 'supervisor-invites', 'supervisor-settings'];

    const [editForm, setEditForm] = useState(true);

    const handlePasswordForm = () => {
        setEditForm(false);
        handleAlertClose();
    }

    // Edit user profile
    const [name, setName] = useState(supervisor.name);
    const [surname, setSurname] = useState(supervisor.surname);
    const [phone, setPhone] = useState(supervisor.phone);
    const [company, setCompany] = useState(supervisor.company);
    const [field, setField] = useState(supervisor.field);

    const changeName = e => setName(e.target.value);
    const changeSurname = e => setSurname(e.target.value);
    const changePhone = e => setPhone(e.target.value);
    const changeCompany = e => setCompany(e.target.value);
    const changeField = e => setField(e.target.value);

    const formNames = [supervisor.name, supervisor.surname, supervisor.phone, supervisor.company, supervisor.field];
    const formLabels = ['Vārds:', 'Uzvārds:', 'Tālrunis:', 'Uzņēmums:', 'Nozare:'];
    const formTypes = ['text', 'text', 'number', 'text', 'text'];
    const onChangeArray = [changeName, changeSurname, changePhone, changeCompany, changeField];
    const formValue = [name, surname, phone, company, field];

    // Edit user password
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const changeOldPassword = e => setOldPassword(e.target.value);
    const changeNewPassword = e => setNewPassword(e.target.value);
    const changeConfirmNewPassword = e => setConfirmNewPassword(e.target.value);

    const passwordFormNames = ['oldPassword', 'newPassword', 'confirmNewPassword'];
    const passwordFormLabels = ['Pašreizējā parole:', 'Jaunā parole:', 'Apstiprināt paroli:'];
    const passwordFormTypes = ['password', 'password', 'password'];
    const passwordFormOnChange = [changeOldPassword, changeNewPassword, changeConfirmNewPassword];
    const passwordFormValue = [oldPassword, newPassword, confirmNewPassword];

    // Alert
    const [alert, setAlert] = useState('');
    const [alertType, setAlertType] = useState('');
    const handleAlertClose = () => {
        setAlert('');
        setAlertType('');
    };

    // Error handling
    const handleErrors = (errors, propertyOrder) => {
        for (let i = 0; i < propertyOrder.length; i++) {
            if (errors[propertyOrder[i]]) {
                setAlertType('warning');
                setAlert(errors[propertyOrder[i]]);
                return;
            } else {
                setAlertType('');
                setAlert('');
            }
        }
    };

    // change basic info
    const handleUpdateSupervisor = async (e) => {
        e.preventDefault();
        setAlertType('');
        setAlert('');
        try {
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/users`,
                {   
                    id: supervisor._id,
                    role: supervisor.role, 
                    name, 
                    surname, 
                    company,
                    field, 
                    phone
                },
                { 
                    headers: { 
                        Authorization: `Bearer ${Cookies.get('auth')}` 
                    } 
                }
                )
                setAlertType('success');
                setAlert('Dati tika nomainīti');
        } catch (err) {
            const errors = err.response.data.errors;
            const propertyOrder = ['name', 'surname', 'company', 'field', 'phone'];
            handleErrors(errors, propertyOrder);
        }
    }
    const handleChangePassword = async (e) => {
        e.preventDefault();
        setAlertType('');
        setAlert('');
        try {
            if (newPassword !== confirmNewPassword) {
                setAlertType('warning');
                setAlert('Jaunās paroles apstiprināšana nesakrīt');
                return;
            }
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/password`,
            {   
                id: supervisor._id,
                oldPassword,
                newPassword
            },
            { 
                headers: { 
                    Authorization: `Bearer ${Cookies.get('auth')}` 
                } 
            }
            )
            setOldPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setAlertType('success');
            setAlert('Parole tika nomainīta');
            setEditForm(true);
        } catch (err) {
            const errors = err.response.data.errors;
            const propertyOrder = ['password'];
            handleErrors(errors, propertyOrder);
        }
    }
   
    return (
        <>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="supervisor-settings" />
            <div className="dashboard-container">
                <div className="supervisor-profile-edit">
                    <img className="supervisor-profile-image" src={supervisor.gender === "male" ? male : female} alt="profile" />
                    {editForm && 
                        <div className="change-password">
                            <PageButton text='Mainīt paroli' onClick={handlePasswordForm} />
                        </div>
                    }
                    {alert && 
                        <Alert 
                            type={alertType}
                            text={alert}
                            handleAlertClose={handleAlertClose}
                        />
                    }
                        <UpdateProfileForm
                            editForm={editForm}
                            id={editForm ? formNames : passwordFormNames}
                            name={editForm ? formNames : passwordFormNames}
                            label={editForm ? formLabels : passwordFormLabels}
                            type={editForm ? formTypes : passwordFormTypes}
                            onChange={editForm ? onChangeArray : passwordFormOnChange}
                            value={editForm ? formValue : passwordFormValue}
                            onClick={editForm ? handleUpdateSupervisor : handleChangePassword}
                            buttonText={editForm ? 'Saglabāt izmaiņas' : 'Mainīt paroli'}
                        />
                </div>
            </div>
        </>
    );
}
 
const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(SupervisorProfileEdit);