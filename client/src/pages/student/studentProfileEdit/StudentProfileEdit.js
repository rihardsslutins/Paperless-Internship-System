// style
import "./StudentProfileEdit.css";
// assets
import male from "../../../assets/male.svg";
import female from "../../../assets/female.svg";
import Alert from "../../../components/atoms/alerts/Alert";
// assets
import PageButton from "../../../components/atoms/button/PageButton";
// organisms
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import UpdateProfileForm from "../../../components/organisms/form/UpdateProfileForm";
// redux
import { connect } from "react-redux";
// packages
import axios from 'axios';
import Cookies from "js-cookie";

import { useState } from "react";

const StudentProfileEdit = (props) => {

    const student = props.user

    // Sidebar
    const icon = ['home', 'journal', 'settings'];
    const imgAlt = ['home page', 'journal page', 'settings page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Iestatījumi'];
    const link = ['student-home', 'student-journals', 'student-settings'];

    const [editForm, setEditForm] = useState(true);

    const handlePasswordForm = () => {
        setEditForm(false);
        handleAlertClose();
    }

    // Edit user profile
    const [name, setName] = useState(student.name);
    const [surname, setSurname] = useState(student.surname);
    const [school, setSchool] = useState(student.school);
    const [phone, setPhone] = useState(student.phone);

    const changeName = e => setName(e.target.value);
    const changeSurname = e => setSurname(e.target.value);
    const changeSchool = e => setSchool(e.target.value);
    const changePhone = e => setPhone(e.target.value);

    const formNames = [student.name, student.surname, student.school, student.phone];
    const formLabels = ['Vārds:', 'Uzvārds:', 'Skola:', 'Tālrunis:'];
    const formTypes = ['text', 'text', 'text', 'number'];
    const onChangeArray = [changeName, changeSurname, changeSchool, changePhone];
    const formValue = [name, surname, school, phone];

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
    const handleUpdateStudent = async (e) => {
        e.preventDefault();
        setAlertType('');
        setAlert('');
        try {
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/users`,
                {   
                    id: student._id,
                    role: student.role, 
                    name, 
                    surname, 
                    school, 
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
            const propertyOrder = ['name', 'surname', 'school', 'phone'];
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
                    id: student._id,
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
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="student-settings" />
            <div className="dashboard-container">
                <div className="student-profile-edit">
                    <img className="student-profile-image" src={student.gender === "male" ? male : female} alt="profile" />
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
                            onClick={editForm ? handleUpdateStudent : handleChangePassword}
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

export default connect(mapStateToProps)(StudentProfileEdit);