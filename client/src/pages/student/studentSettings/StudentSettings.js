// style
import "./StudentSettings.css";
// assets
import male from "../../../assets/male.svg";
import female from "../../../assets/female.svg";
// atoms
// import DangerButton from "../../../components/atoms/button/DangerButton";
import PageButton from "../../../components/atoms/button/PageButton";
import Alert from "../../../components/atoms/alerts/Alert";
// molecules
import InputButtonGroup from "../../../components/molecules/labeledInput/InputButtonGroup";
// components
import Sidebar from "../../../components/organisms/navbar/Sidebar";
// import DeleteProfileModal from "../../../components/organisms/modal/DeleteProfileModal";
import ThemeToggle from "../../../components/ThemeToggle/ThemeToggle";
// redux
import { connect } from "react-redux";
// hooks
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// packages
import axios from "axios";
import Cookies from "js-cookie";

const StudentSettings = (props) => {
    
    const student = props.user
    const navigate = useNavigate();

    // Sidebar
    const icon = ['home', 'journal', 'settings'];
    const imgAlt = ['home page', 'journal page', 'settings page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Iestatījumi'];
    const link = ['student-home', 'student-journals', 'student-settings'];

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

    // Add teacher
    const [teacherEmail, setTeacherEmail] = useState('');
    const handleAddTeacher = async (e) => {
        setAlertType('');
        setAlert('');
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/invites`, {
                sender: student.email,
                receiver: teacherEmail
            },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('auth')}`
                }
            })
            setAlertType('success');
            setAlert('Uzaicinājums tika nosūtīts skolotājam!');
            setTeacherEmail('');
        } catch (err) {
            const errors = err.response.data.errors;
            console.log(errors);
            const propertyOrder = ['sender', 'receiver'];
            handleErrors(errors, propertyOrder);
        }
    }

    const [pendingTeachers, setPendingTeachers] = useState([])
    
    useEffect(() => {
        const getPendingTeachers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/invites/teachers`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('auth')}`
                    }
                })
                setPendingTeachers(response.data.invites)
            } catch (err) {
                console.log(err)
            }
        }
        getPendingTeachers()
    })
    // Alerts
    const [alert, setAlert] = useState('');
    const [alertType, setAlertType] = useState('');
    const handleAlertClose = () => {
        setAlert('');
        setAlertType('');
    };

    // Delete profile modal
    // const [displayModal, setDisplayModal] = useState(false);
    // const handleCloseModal = () => setDisplayModal(false);

    return (
        <>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="student-settings" />
            <div className="dashboard-container">
                <div className="student-settings">
                    <div className="student-info">
                        <img className="student-profile-image" src={student.gender === "male" ? male : female} alt="profile" />
                        <h1>{student.name} {student.surname}</h1>
                        <div className="student-contact-info">
                            <h3>E-pasts: {student.email}</h3>
                            <h3>Tālrunis: {student.phone}</h3>
                            <h3>Skola: {student.school}</h3>
                        </div>
                        <PageButton text='Rediģēt profilu' onClick={() => navigate("../student-profile-edit")} />
                        <div className="student-theme">
                            Mājaslapas motīvs: <ThemeToggle />
                        </div>
                        <div className="student-teachers">
                            <h3>Skolotāji</h3>
                            <div className="student-teachers-grid">
                                {!student.teachers.length && !pendingTeachers.length &&
                                    <p>Nav pievienots neviens skolotājs</p>
                                }
                                {student.teachers &&
                                        student.teachers.map((teacher) => (
                                            <p key={teacher._id}>{teacher.fullName}</p>
                                        ))
                                }
                                {pendingTeachers.length ?
                                        pendingTeachers.map((teacher) => (
                                            <p key={teacher._id} className="pending-teacher">{teacher.receiverFullName}</p>
                                        ))
                                    :
                                        null
                                }
                            </div>
                            <div className="add-teacher">
                                {alert && 
                                    <Alert 
                                        type={alertType}
                                        text={alert}
                                        handleAlertClose={handleAlertClose}
                                    />
                                }
                                <InputButtonGroup 
                                    type='email'
                                    onChange={(e) => setTeacherEmail(e.target.value)}
                                    name='teacherEmail'
                                    value={teacherEmail}
                                    placeholder='Skolotāja e-pasts'
                                    text='Pievienot'
                                    onClick={handleAddTeacher}
                                />
                            </div>
                        </div>
                    </div>
                    {/* <DangerButton text='Dzēst profilu' onClick={() => setDisplayModal(true)} />
                    <DeleteProfileModal role='student' display={displayModal} handleClose={handleCloseModal} /> */}
                </div>
            </div>
        </>
    );
}
 
const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(StudentSettings);