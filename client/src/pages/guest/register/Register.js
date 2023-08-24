// style
import './Register.css';
// atoms
import Alert from '../../../components/atoms/alerts/Alert';
// organisms
import Navbar from '../../../components/organisms/navbar/Navbar';
import Roles from '../../../components/organisms/roles/Roles';
import RegistrationForm from '../../../components/organisms/form/RegistrationForm';
// hooks
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// packages
import axios from 'axios';
// redux
import { connect } from 'react-redux';

const Register = (props) => {

    const [searchParams] = useSearchParams();
    const [alert, setAlert] = useState('');
    const navigate = useNavigate();
    
    // forces a refresh in order to redirect
    const refreshPage = () => {
        window.location.reload();
    }

    useEffect(() => {
        if (props.user.role) {
            navigate(`../${props.user.role}-home`);
        }
    }, [navigate, props.user.role]);

    // ROLES
    const [activeStudent, setActiveStudent] = useState(
        searchParams.get('role') === 'student' ? '-active' : ''
    );
    const [activeTeacher, setActiveTeacher] = useState(
        searchParams.get('role') === 'teacher' ? '-active' : ''
    );
    const [activeSupervisor, setActiveSupervisor] = useState(
        searchParams.get('role') === 'supervisor' ? '-active' : ''
    );

    const handleStudent = () => {
        setActiveStudent('-active');
        setActiveTeacher('');
        setActiveSupervisor('');
    };
    const handleTeacher = () => {
        setActiveTeacher('-active');
        setActiveStudent('');
        setActiveSupervisor('');
    };
    const handleSupervisor = () => {
        setActiveSupervisor('-active');
        setActiveTeacher('');
        setActiveStudent('');
    };

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

    // STUDENT
    const [studentName, setStudentName] = useState('');
    const [studentSurname, setStudentSurname] = useState('');
    const [studentGender, setStudentGender] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [studentPhone, setStudentPhone] = useState('');
    const [studentPassword, setStudentPassword] = useState('');
    const [studentConfirmPassword, setStudentConfirmPassword] = useState('');

    const changeStudentName = (e) => setStudentName(e.target.value);
    const changeStudentSurname = (e) => setStudentSurname(e.target.value);
    const changeStudentGender = (e) => setStudentGender(e.target.value);
    const changeStudentSchool = (e) => setStudentSchool(e.target.value);
    const changeStudentEmail = (e) => setStudentEmail(e.target.value);
    const changeStudentPhone = (e) => setStudentPhone(e.target.value);
    const changeStudentPassword = (e) => setStudentPassword(e.target.value);
    const changeStudentConfirmPassword = (e) => setStudentConfirmPassword(e.target.value);

    const onChangeStudentArray = [
        changeStudentName,
        changeStudentSurname,
        changeStudentSchool,
        changeStudentEmail,
        changeStudentPhone,
        changeStudentPassword,
        changeStudentConfirmPassword,
    ];
    const formLabelsStudent = [
        'Vārds:',
        'Uzvārds:',
        'Skola:',
        'E-pasts:',
        'Tālrunis:',
        'Parole:',
        'Parole atkārtoti:',
    ];
    const formNamesStudent = [
        'name',
        'surname',
        'school',
        'email',
        'phone',
        'password',
        'confirmPassword',
    ];
    const formTypesStudent = [
        'text',
        'text',
        'text',
        'email',
        'number',
        'password',
        'password',
    ];

    const handleStudentRegistration = async (e) => {
        e.preventDefault();
        setAlert('');
        try {
            if (studentPassword !== studentConfirmPassword) {
                setAlert('Lūdzu ievadi abas paroles pareizi');
                return;
            }
            await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/users`,
                {
                    name: studentName,
                    surname: studentSurname,
                    gender: studentGender,
                    school: studentSchool,
                    email: studentEmail,
                    phone: studentPhone,
                    password: studentPassword,
                },
                {
                    headers: {
                        role: 'student',
                    },
                    withCredentials: true,
                }
            ).then(() => {
                refreshPage()
            });
        } catch (err) {
            const errors = err.response.data.errors;
            const propertyOrder = [
                'name',
                'surname',
                'school',
                'gender',
                'email',
                'phone',
                'password',
            ];
            handleErrors(errors, propertyOrder);
        }
    };


    // TEACHER REGISTRATION
    const [teacherName, setTeacherName] = useState('');
    const [teacherSurname, setTeacherSurname] = useState('');
    const [teacherGender, setTeacherGender] = useState('');
    const [teacherSchool, setTeacherSchool] = useState('');
    const [teacherEmail, setTeacherEmail] = useState('');
    const [teacherPhone, setTeacherPhone] = useState('');
    const [teacherPassword, setTeacherPassword] = useState('');
    const [teacherConfirmPassword, setTeacherConfirmPassword] = useState('');

    const changeTeacherName = (e) => setTeacherName(e.target.value);
    const changeTeacherSurname = (e) => setTeacherSurname(e.target.value);
    const changeTeacherGender = (e) => setTeacherGender(e.target.value);
    const changeTeacherSchool = (e) => setTeacherSchool(e.target.value);
    const changeTeacherEmail = (e) => setTeacherEmail(e.target.value);
    const changeTeacherPhone = (e) => setTeacherPhone(e.target.value);
    const changeTeacherPassword = (e) => setTeacherPassword(e.target.value);
    const changeTeacherConfirmPassword = (e) => setTeacherConfirmPassword(e.target.value);

    const onChangeTeacherArray = [
        changeTeacherName,
        changeTeacherSurname,
        changeTeacherSchool,
        changeTeacherEmail,
        changeTeacherPhone,
        changeTeacherPassword,
        changeTeacherConfirmPassword,
    ];
    const formLabelsTeacher = [
        'Vārds:',
        'Uzvārds:',
        'Skola:',
        'E-pasts:',
        'Tālrunis:',
        'Parole:',
        'Parole atkārtoti:',
    ];
    const formNamesTeacher = [
        'teacherName',
        'teacherSurname',
        'teacherSchool',
        'teacherEmail',
        'teacherPhone',
        'teacherPassword',
        'teacherConfirmPassword',
    ];
    const formTypesTeacher = [
        'text',
        'text',
        'text',
        'email',
        'number',
        'password',
        'password',
    ];

    const handleTeacherRegistration = async (e) => {
        e.preventDefault();
        setAlert('');
        try {
            if (teacherPassword !== teacherConfirmPassword) {
                setAlert('Lūdzu ievadi abas paroles pareizi');
                return;
            }
            await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/users`,
                {
                    name: teacherName,
                    surname: teacherSurname,
                    gender: teacherGender,
                    school: teacherSchool,
                    email: teacherEmail,
                    phone: teacherPhone,
                    password: teacherPassword,
                },
                {
                    headers: {
                        role: 'teacher',
                    },
                    withCredentials: true,
                }
            ).then(() => {
                refreshPage()
            });
        } catch (err) {
            const errors = err.response.data.errors;
            const propertyOrder = [
                'name',
                'surname',
                'school',
                'gender',
                'email',
                'phone',
                'password',
            ];
            handleErrors(errors, propertyOrder);
        }
    };

    
    // SUPERVISOR REGISTRATION
    const [supervisorName, setSupervisorName] = useState('');
    const [supervisorSurname, setSupervisorSurname] = useState('');
    const [supervisorPhone, setSupervisorPhone] = useState('');
    const [supervisorEmail, setSupervisorEmail] = useState('');
    const [supervisorGender, setSupervisorGender] = useState('');
    const [supervisorCompany, setSupervisorCompany] = useState('');
    const [supervisorField, setSupervisorField] = useState('');
    const [supervisorPassword, setSupervisorPassword] = useState('');
    const [supervisorConfirmPassword, setSupervisorConfirmPassword] = useState('');

    const changeSupervisorName = (e) => setSupervisorName(e.target.value);
    const changeSupervisorSurname = (e) => setSupervisorSurname(e.target.value);
    const changeSupervisorPhone = (e) => setSupervisorPhone(e.target.value);
    const changeSupervisorEmail = (e) => setSupervisorEmail(e.target.value);
    const changeSupervisorGender = (e) => setSupervisorGender(e.target.value);
    const changeSupervisorCompany = (e) => setSupervisorCompany(e.target.value);
    const changeSupervisorField = (e) => setSupervisorField(e.target.value);
    const changeSupervisorPassword = (e) => setSupervisorPassword(e.target.value);
    const changeSupervisorConfirmPassword = (e) => setSupervisorConfirmPassword(e.target.value);

    const onChangeSupervisorArray = [
        changeSupervisorName,
        changeSupervisorSurname,
        changeSupervisorPhone,
        changeSupervisorEmail,
        changeSupervisorCompany,
        changeSupervisorField,
        changeSupervisorPassword,
        changeSupervisorConfirmPassword,
    ];
    const formLabelsSupervisor = [
        'Vārds:',
        'Uzvārds:',
        'Tālrunis:',
        'E-pasts:',
        'Uzņēmuma nosaukums:',
        'Nozare:',
        'Parole:',
        'Apstiprināt paroli:',
    ];
    const formNamesSupervisor = [
        'supervisorName',
        'supervisorSurname',
        'supervisorPhone',
        'supervisorEmail',
        'supervisorCompany',
        'supervisorField',
        'supervisorPassword',
        'supervisorConfirmPassword',
    ];
    const formTypesSupervisor = [
        'text',
        'text',
        'number',
        'email',
        'text',
        'text',
        'password',
        'password',
    ];

    const handleSupervisorRegistration = async (e) => {
        e.preventDefault();
        setAlert('');
        try {
            if (supervisorPassword !== supervisorConfirmPassword) {
                setAlert('Lūdzu ievadi abas paroles pareizi');
                return;
            }
            await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/users`,
                {
                    name: supervisorName,
                    surname: supervisorSurname,
                    gender: supervisorGender,
                    phone: supervisorPhone,
                    field: supervisorField,
                    company: supervisorCompany,
                    email: supervisorEmail,
                    password: supervisorPassword,
                },
                {
                    headers: {
                        role: 'supervisor',
                    },
                    withCredentials: true,
                }
            ).then(() => {
                refreshPage()
            });
        } catch (err) {
            const errors = err.response.data.errors;
            const propertyOrder = [
                'name',
                'surname',
                'phone',
                'gender',
                'email',
                'field',
                'company',
                'password',
            ];
            handleErrors(errors, propertyOrder);
        }
    };

    const handleInputReset = () => {
        // Student reset
        setStudentName('');
        setStudentSurname('');
        setStudentGender('');
        setStudentSchool('');
        setStudentEmail('');
        setStudentPhone('');
        setStudentPassword('');
        setStudentConfirmPassword('');
        // Teacher reset
        setTeacherName('');
        setTeacherSurname('');
        setTeacherGender('');
        setTeacherSchool('');
        setTeacherEmail('');
        setTeacherPhone('');
        setTeacherPassword('');
        setTeacherConfirmPassword('');
        // Supervisor reset
        setSupervisorName('');
        setSupervisorSurname('');
        setSupervisorGender('');
        setSupervisorField('');
        setSupervisorCompany('');
        setSupervisorEmail('');
        setSupervisorPhone('');
        setSupervisorPassword('');
        setSupervisorConfirmPassword('');
        // Reset alert
        handleAlertClose();
    };

    const handleAlertClose = () => {
        setAlert('');
    };

    return (
        <div>
            <Navbar page="register" />
            <div className="container registration">
                <h2>Reģistrācija</h2>
                <Roles
                    handleStudent={handleStudent}
                    handleTeacher={handleTeacher}
                    handleSupervisor={handleSupervisor}
                    handleInputReset={handleInputReset}
                    activeStudent={activeStudent}
                    activeTeacher={activeTeacher}
                    activeSupervisor={activeSupervisor}
                />
                {alert && (
                    <Alert
                        type="warning"
                        text={alert}
                        handleAlertClose={handleAlertClose}
                    />
                )}
                {activeStudent && (
                    <RegistrationForm
                        id={formNamesStudent}
                        name={formNamesStudent}
                        label={formLabelsStudent}
                        type={formTypesStudent}
                        onChange={onChangeStudentArray}
                        radioOnClick={changeStudentGender}
                        onClick={handleStudentRegistration}
                        buttonText="Reģistrēties kā students"
                    />
                )}
                {activeTeacher && (
                    <RegistrationForm
                        id={formNamesTeacher}
                        name={formNamesTeacher}
                        label={formLabelsTeacher}
                        type={formTypesTeacher}
                        onChange={onChangeTeacherArray}
                        radioOnClick={changeTeacherGender}
                        onClick={handleTeacherRegistration}
                        buttonText="Reģistrēties kā skolotājs"
                    />
                )}
                {activeSupervisor && (
                    <RegistrationForm
                        id={formNamesSupervisor}
                        name={formNamesSupervisor}
                        label={formLabelsSupervisor}
                        type={formTypesSupervisor}
                        onChange={onChangeSupervisorArray}
                        radioOnClick={changeSupervisorGender}
                        onClick={handleSupervisorRegistration}
                        buttonText="Reģistrēties kā prakses vadītājs"
                        supervisor=' supervisor'
                    />
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(Register);
