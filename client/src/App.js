import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// redux
import { useDispatch, connect } from 'react-redux';
import { setUser } from './reduxSlices/userSlice';
// hooks
import useTheme from './hooks/useTheme';

// packages
import axios from 'axios';
import Cookies from 'js-cookie';

//pages
import Home from './pages/guest/home/Home';
import Login from './pages/guest/login/Login';
import Register from './pages/guest/register/Register';
import StudentHome from './pages/student/studentHome/StudentHome';
import StudentJournals from './pages/student/studentJournals/StudentJournals';
import StudentJournal from './pages/student/studentJournal/StudentJournal';
import StudentJournalCreate from './pages/student/studentJournalCreate/StudentJournalCreate';
import StudentSettings from './pages/student/studentSettings/StudentSettings';
import StudentProfileEdit from './pages/student/studentProfileEdit/StudentProfileEdit';
import TeacherHome from './pages/teacher/teacherHome/TeacherHome';
import TeacherJournal from './pages/teacher/teacherJournal/TeacherJournal';
import TeacherStudentJournals from './pages/teacher/teacherStudentJournals/TeacherStudentJournals';
import TeacherStudentJournal from './pages/teacher/teacherStudentJournal/TeacherStudentJournal';
import TeacherInvites from './pages/teacher/teacherInvites/TeacherInvites';
import TeacherSettings from './pages/teacher/teacherSettings/TeacherSettings';
import TeacherProfileEdit from './pages/teacher/teacherProfileEdit/TeacherProfileEdit';
import SupervisorHome from './pages/supervisor/supervisorHome/SupervisorHome';
import SupervisorJournal from './pages/supervisor/supervisorJournal/SupervisorJournal';
import SupervisorStudentJournal from './pages/supervisor/supervisorStudentJournal/SupervisorStudentJournal';
import SupervisorInvites from './pages/supervisor/supervisorInvites/SupervisorInvites';
import SupervisorSettings from './pages/supervisor/supervisorSettings/SupervisorSettings';
import SupervisorProfileEdit from './pages/supervisor/supervisorProfileEdit/SupervisorProfileEdit';
import NotFound from './pages/404/NotFound';

function App(props) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [userIsReady, setUserIsReady] = useState(false);
    useEffect(() => {
        const getUser = async () => {
            try {
                if (!props.user._id) {
                    await axios
                        .get(`${process.env.REACT_APP_SERVER_URL}/users`, {
                            headers: {
                                Authorization: `Bearer ${Cookies.get('auth')}`,
                            },
                        })
                        .then((res) => res.data)
                        .then((res) => {
                            dispatch(
                                setUser({
                                    _id: res.id,
                                    name: res.name,
                                    surname: res.surname,
                                    school: res.school,
                                    gender: res.gender,
                                    field: res.field,
                                    company: res.company,
                                    phone: res.phone,
                                    email: res.email,
                                    password: res.password,
                                    internships: res.internships,
                                    teachers: res.teachers,
                                    students: res.students,
                                    interns: res.interns,
                                    role: res.role,
                                })
                            )
                        }
                        )         
                        .then(() => setUserIsReady(true))
                        .catch(() => setUserIsReady(true))
                }
                setUserIsReady(true);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, []);
    return (
        <div className={`App ${theme}`}>
            {userIsReady && (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/student-home" element={props.user.role === "student" ? <StudentHome /> : <Navigate replace to="/login" />} />
                    <Route path="/student-journals" element={props.user.role === "student" ? <StudentJournals /> : <Navigate replace to="/login" />} />
                    <Route path="/student-journal/:id" element={props.user.role === "student" ? <StudentJournal /> : <Navigate replace to="/login" />} />
                    <Route path="/student-journal-create" element={props.user.role === "student" ? <StudentJournalCreate /> : <Navigate replace to="/login" />} />
                    <Route path="/student-settings" element={props.user.role === "student" ? <StudentSettings /> : <Navigate replace to="/login" />} />
                    <Route path="/student-profile-edit" element={props.user.role === "student" ? <StudentProfileEdit /> : <Navigate replace to="/login" />} />
                    <Route path="/teacher-home" element={props.user.role === "teacher" ? <TeacherHome /> : <Navigate replace to="/login" />} />
                    <Route path="/teacher-journal" element={props.user.role === "teacher" ? <TeacherJournal /> : <Navigate replace to="/login" />} />
                    <Route path="/teacher-student-journals/:id" element={props.user.role === "teacher" ? <TeacherStudentJournals /> : <Navigate replace to="/login" />} />
                    <Route path="/teacher-student-journal/:id" element={props.user.role === "teacher" ? <TeacherStudentJournal /> : <Navigate replace to="/login" />} />
                    <Route path="/teacher-invites" element={props.user.role === "teacher" ? <TeacherInvites /> : <Navigate replace to="/login" />} />
                    <Route path="/teacher-settings" element={props.user.role === "teacher" ? <TeacherSettings /> : <Navigate replace to="/login" />} />
                    <Route path="/teacher-profile-edit" element={props.user.role === "teacher" ? <TeacherProfileEdit /> : <Navigate replace to="/login" />} />
                    <Route path="/supervisor-home" element={props.user.role === "supervisor" ? <SupervisorHome /> : <Navigate replace to="/login" />} />
                    <Route path="/supervisor-journal" element={props.user.role === "supervisor" ? <SupervisorJournal /> : <Navigate replace to="/login" />} />
                    <Route path="/supervisor-student-journal/:id" element={props.user.role === "supervisor" ? <SupervisorStudentJournal /> : <Navigate replace to="/login" />} />
                    <Route path="/supervisor-invites" element={props.user.role === "supervisor" ? <SupervisorInvites /> : <Navigate replace to="/login" />} />
                    <Route path="/supervisor-settings" element={props.user.role === "supervisor" ? <SupervisorSettings /> : <Navigate replace to="/login" />} />
                    <Route path="/supervisor-profile-edit" element={props.user.role === "supervisor" ? <SupervisorProfileEdit /> : <Navigate replace to="/login" />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(App);
