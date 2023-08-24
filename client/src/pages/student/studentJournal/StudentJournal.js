// style
import './StudentJournal.css';
// atoms
import PageButton2 from '../../../components/atoms/button/PageButton2';
import DangerButton from '../../../components/atoms/button/DangerButton';
import Alert from '../../../components/atoms/alerts/Alert';
// organisms
import Sidebar from '../../../components/organisms/navbar/Sidebar';
import JournalRecordForm from '../../../components/organisms/form/JournalRecordForm';
import JournalModal from '../../../components/organisms/modal/JournalModal';
import JournalTable from '../../../components/organisms/table/JournalTable';
// packages
import axios from 'axios';
import Cookies from 'js-cookie';

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const StudentJournal = (props) => {

    const navigate = useNavigate();
    const role = props.user.role;
    
    const { id: _id } = useParams();
    const [internship, setInternship] = useState('');
    const [journal, setJournal] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [refreshTable, setRefreshTable] = useState(true);

    // Sidebar
    const icon = ['home', 'journal', 'settings'];
    const imgAlt = ['home page', 'journal page', 'settings page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Iestatījumi'];
    const link = ['student-home', 'student-journals', 'student-settings'];

    // Table
    const headerCells = ['Datums', 'Izpildītā darba īss raksturojums', 'Izpildes laiks', 'Vērtējums'];

    // Journal record form
    const [date, setDate] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [hoursSpent, setHoursSpent] = useState('');

    const changeDate = (e) => setDate(e.target.value);
    const changeTaskDescription = (e) => setTaskDescription(e.target.value);
    const changeHoursSpent = (e) => setHoursSpent(e.target.value);

    const onChangeArray = [changeDate, changeTaskDescription, changeHoursSpent];
    const formLabels = ['Datums:', 'Izpildītā darba īss raksturojums:', 'Izpildes laiks:'];
    const formNames = ['date', 'taskDesc', 'time'];
    const formTypes = ['date', 'text', 'number'];
    const formValues = [date, taskDescription, hoursSpent];

    // Journal record edit form
    const [editRecord, setEditRecord] = useState('');
    const [editId, setEditId] = useState('');
    const [editDate, setEditDate] = useState('');
    const [editTaskDescription, setEditTaskDescription] = useState('');
    const [editHoursSpent, setEditHoursSpent] = useState('');
    
    // Get record info when editRecord changes
    useEffect(() => {
        setEditId(editRecord ? editRecord._id : '');
        setEditDate(editRecord ? editRecord.date  : '');
        setEditTaskDescription(editRecord ? editRecord.taskDescription : '');
        setEditHoursSpent(editRecord ? editRecord.hoursSpent : '');
    }, [editRecord])

    const changeEditDate = (e) => setEditDate(e.target.value);
    const changeEditTaskDescription = (e) => setEditTaskDescription(e.target.value);
    const changeEditHoursSpent = (e) => setEditHoursSpent(e.target.value);
    const onChangeEditArray = [changeEditDate, changeEditTaskDescription, changeEditHoursSpent];
    const formEditValues = [editDate, editTaskDescription, editHoursSpent];

    // Alert
    const [alert, setAlert] = useState('');
    const [alertType, setAlertType] = useState('');
    const handleAlertClose = () => {
        setAlert('');
        setAlertType('');
    };

    useEffect(() => {
        const getInternship = async () => {
            setIsPending(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/internships/${_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('auth')}`,
                    }
                }
                );
                setInternship(response.data.internship)
                setJournal(response.data.internship.journal)
                setIsPending(false);
            } catch (err) {
                console.log(err);
                setIsPending(false);
            }
        }
        getInternship()
    }, [refreshTable, _id]);

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

    // Add record to journal
    const handleAddJournalRecord = async (e) => {
        e.preventDefault();
        setAlertType('');
        setAlert('');
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/journals`,
            { 
                _id, 
                date,
                taskDescription, 
                hoursSpent
            },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('auth')}`,
                }
            })
            setAlertType('success');
            setAlert('Ieraksts tika pievienots dienasgrāmatai!');
            setDate('');
            setRefreshTable(false);
            setRefreshTable(true);
            setTaskDescription('');
            setHoursSpent('');
        } catch (err) {
            const errors = err.response.data.errors;
            const propertyOrder = ['date', 'taskDescription', 'hoursSpent'];
            handleErrors(errors, propertyOrder);
        }
    };

    // Updating existing record
    const handleUpdateJournalRecord = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/journals/${editId}`,
            {
                role,
                id: _id,
                date: editDate,
                hoursSpent: editHoursSpent,
                taskDescription: editTaskDescription
            }, 
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('auth')}`
                }
            }
            )
            setAlertType('success');
            setAlert('Ieraksts tika pārveidots!');
            setDate('');
            setRefreshTable(false);
            setRefreshTable(true);
            setTaskDescription('');
            setHoursSpent('');
        } catch (err) {
            const errors = err.response.data.errors;
            const propertyOrder = ['date', 'taskDescription', 'hoursSpent'];
            handleErrors(errors, propertyOrder);
        }
    }

    // Cancel journal update
    const handleResetEdit = (e) => {
        e.preventDefault();
        setEditRecord('');
    }

    // Journal modal
    const [displayModal, setDisplayModal] = useState(false);
    const handleClose = () => setDisplayModal(false);

    return (
        <>
            <Sidebar
                icon={icon}
                imgAlt={imgAlt}
                title={title}
                link={link}
                page="student-journals"
            />
            <div className="dashboard-container">
                {isPending && <div className="loading"></div>}
                {!isPending &&
                    <>
                        {internship._id && (
                            <div className="student-journal">
                                <div className="student-journal-header">
                                    <PageButton2
                                        text="Atpakaļ"
                                        active=""
                                        onClick={() => navigate("../student-journals")}
                                    />
                                    <h1>{internship.company}</h1>
                                    {internship.isActive && (
                                        <DangerButton
                                            text="Noslēgt praksi"
                                            onClick={() => setDisplayModal(true)}
                                        />
                                    )}
                                    <div className="student-journal-info">
                                        <p>Prakses vadītājs: {internship.supervisorFullName}</p>
                                        <p>Skolotāja: {internship.teacherFullName}</p>
                                        <p>Praktikants: {internship.studentFullName}</p>
                                    </div>
                                </div>
                                <JournalTable 
                                    headerCells={headerCells} 
                                    data={journal}
                                    role={role}
                                    setEditRecord={setEditRecord}
                                    setAlert={setAlert}
                                    setAlertType={setAlertType}
                                />
                                {alert &&
                                    <Alert
                                        type={alertType}
                                        text={alert}
                                        handleAlertClose={handleAlertClose}
                                    />
                                }
                                {/* Add record form */}
                                {internship.isActive && !editRecord && (
                                    <JournalRecordForm
                                        formTitle='Ieraksta pievienošana'
                                        id={formNames}
                                        name={formNames}
                                        label={formLabels}
                                        type={formTypes}
                                        value={formValues}
                                        onClick={handleAddJournalRecord}
                                        onChange={onChangeArray}
                                        buttonText="Pievienot"
                                    />
                                )}
                                {/* Update record form */}
                                {internship.isActive && editRecord && (
                                    <JournalRecordForm
                                        formTitle='Ieraksta rediģēšana'
                                        id={formNames}
                                        name={formNames}
                                        label={formLabels}
                                        type={formTypes}
                                        value={formEditValues}
                                        onClick={handleUpdateJournalRecord}
                                        onChange={onChangeEditArray}
                                        buttonText="Saglabāt izmaiņas"
                                        cancelButtonText="Atcelt"
                                        cancelButton={handleResetEdit}
                                    />
                                )}
                                {internship.isActive && (
                                    <JournalModal
                                        email={props.user.email}
                                        id={_id}
                                        display={displayModal}
                                        handleClose={handleClose}
                                        setRefreshTable={setRefreshTable}
                                    />
                                )}
                            </div>
                        )}
                        {!internship._id && <h2>Šāda dienasgrāmata nepastāv</h2>}
                    </>
                }
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(StudentJournal);
