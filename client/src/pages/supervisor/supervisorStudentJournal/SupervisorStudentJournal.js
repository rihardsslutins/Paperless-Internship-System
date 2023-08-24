// style
import "./SupervisorStudentJournal.css";
// atoms
import PageButton2 from "../../../components/atoms/button/PageButton2";
import PageButton from "../../../components/atoms/button/PageButton";
import DangerButton2 from "../../../components/atoms/button/DangerButton2";
import Alert from "../../../components/atoms/alerts/Alert";
// molecules
import InputGroup from "../../../components/molecules/labeledInput/InputGroup";
// organisms
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import JournalTable from "../../../components/organisms/table/JournalTable";
// react & react router dom
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
// packages
import axios from 'axios';
import Cookies from "js-cookie";
import moment from "moment";

const SupervisorStudentJournal = (props) => {

    const navigate = useNavigate();
    const { id } = useParams();
    const role = props.user.role;

    const [internship, setInternship] = useState([]);
    const [refreshTable, setRefreshTable] = useState(true);
    const [isPending, setIsPending] = useState(false);

    // Sidebar
    const icon = ['home', 'journal', 'invite', 'settings'];
    const imgAlt = ['home page', 'journal page', 'invite page', 'settings page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Uzaicinājumi', 'Iestatījumi'];
    const link = ['supervisor-home', 'supervisor-journal', 'supervisor-invites', 'supervisor-settings'];

    // Table
    const headerCells = ['Datums', 'Izpildītā darba īss raksturojums', 'Izpildes laiks', 'Vērtējums'];

    // Add grade
    const [editRecord, setEditGrade] = useState();
    const [grade, setGrade] = useState('');

    // Alert
    const [alert, setAlert] = useState('');
    const [alertType, setAlertType] = useState('');
    const handleAlertClose = () => {
        setAlert('');
        setAlertType('');
    };

    useEffect(() => {
        const getStudentInternship = async () => {
            setIsPending(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/internships/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('auth')}`
                    }
                }
                );
            setInternship(response.data.internship);
            setIsPending(false);
            } catch (err) {
                console.log(err);
                setIsPending(false);
            }
        }
        getStudentInternship()
    }, [refreshTable, id])
    
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

    const handleAddGrade = async (e) => {
        e.preventDefault();
        setAlertType('');
        setAlert('');
        try {
            console.log(`${editRecord[0]}`)
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/journals/${editRecord[0]}`,
            { 
                id,
                grade,
                role
            }, 
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('auth')}`
                }
            })
            setAlertType('success');
            setAlert('Atzīme tika ielikta ' + moment(editRecord[1]).locale('lv').format('LL') + ' ierakstam!');
            setRefreshTable(false);
            setRefreshTable(true);
            setEditGrade();
            setGrade('');
        } catch (err) {
            const errors = err.response.data.errors;
            const propertyOrder = ['grade'];
            handleErrors(errors, propertyOrder);
        }
    }
    const handleReset = () => {
        setEditGrade();
        setGrade('');
        handleAlertClose();
    }

    return (
        <div>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="supervisor-journal" />
            <div className="dashboard-container">
                {isPending && <div className="loading"></div>}
                {!isPending &&
                    <>
                        {internship._id && (
                            <div className="supervisor-student-journal">
                                <div className="supervisor-student-journal-header">
                                    <PageButton2 text="Atpakaļ" active="" onClick={() => navigate("../supervisor-journal")} />
                                    <h1>{internship.company}</h1>
                                    <div className="supervisor-student-journal-info">
                                        <p>Prakses vadītājs: {internship.supervisorFullName}</p>
                                        <p>Skolotāja: {internship.teacherFullName}</p>
                                        <p>Praktikants: {internship.studentFullName}</p>
                                    </div>
                                </div>
                                <JournalTable 
                                    headerCells={headerCells} 
                                    data={internship.journal} 
                                    setEditGrade={setEditGrade} 
                                    setAlert={setAlert}
                                    role={role}
                                />
                                {alert && <Alert text={alert} type={alertType} handleAlertClose={handleAlertClose} />}
                                {editRecord && 
                                    <div className="supervisor-journal-form">
                                        <InputGroup 
                                            onChange={e => setGrade(e.target.value)}
                                            type='number'
                                            name='grade'
                                            label={`Atzīme ${moment(editRecord[1]).locale('lv').format('LL')} ierakstam:`}
                                            placeholder={editRecord[2] ? `Pašreizējā atzīme ${editRecord[2]}` : ''}
                                        />
                                        <div className="supervisor-journal-form-buttons">
                                            <DangerButton2 
                                                text='Atcelt' 
                                                onClick={handleReset} 
                                            />
                                            <PageButton 
                                                onClick={handleAddGrade}
                                                text='Ielikt atzīmi'
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                        )}
                        {!internship._id && <h2>Šāda dienasgrāmata nepastāv</h2>}
                    </>
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(SupervisorStudentJournal);