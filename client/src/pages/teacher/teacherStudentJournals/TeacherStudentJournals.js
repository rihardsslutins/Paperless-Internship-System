// style
import "./TeacherStudentJournals.css";
// organisms
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import CardGrid from "../../../components/organisms/cardGrid/CardGrid";
// react & react-router-dom
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// packages
import axios from "axios";
import Cookies from "js-cookie";

const TeacherStudentJournals = () => {

    const { id } = useParams();

    // Sidebar
    const icon = ['home', 'journal', 'invite', 'settings'];
    const imgAlt = ['home page', 'journal page', 'invite page', 'settings page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Uzaicinājumi', 'Iestatījumi'];
    const link = ['teacher-home', 'teacher-journal', 'teacher-invites', 'teacher-settings'];

    const [internships, setInternships] = useState([]);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        const getStudentInternships = async () => {
            setIsPending(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/internships/teacher/${id}`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('auth')}`
                    }
                })
                setInternships(response.data.internships)
                setIsPending(false);
            } catch (err) {
                console.log(err);
                setIsPending(false);
            }
        }
        getStudentInternships()
    }, [id])

    return (
        <div>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="teacher-journal" />
            <div className="dashboard-container">
                <div className="teacher-students-journal">
                    {internships.length ? <h1>Dienasgrāmatas - {internships[0].studentFullName}</h1> : null}
                    {isPending && <div className="loading"></div>}
                    {!isPending && internships && <CardGrid internships={internships} role="teacher" />}
                </div>
            </div>
        </div>
    );
}

export default TeacherStudentJournals;