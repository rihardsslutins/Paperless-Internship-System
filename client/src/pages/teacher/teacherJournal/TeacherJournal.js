// style
import "./TeacherJournal.css";
// atoms
import SearchInput from "../../../components/atoms/input/SearchInput";
// organisms
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import StudentsTable from "../../../components/organisms/table/StudentsTable";
// hooks
import { useEffect, useState } from "react";
// packages
import axios from 'axios'
import Cookies from "js-cookie";

const TeacherJournal = () => {

    const [isPending, setIsPending] = useState(false);

    // Sidebar
    const icon = ['home', 'journal', 'invite', 'settings'];
    const imgAlt = ['home page', 'journal page', 'invite page', 'settings page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Uzaicinājumi', 'Iestatījumi'];
    const link = ['teacher-home', 'teacher-journal', 'teacher-invites', 'teacher-settings'];

    // Search input
    const [searchQuery, setSearchQuery] = useState('');
    const changeSearchQuery = (e) => setSearchQuery(e.target.value);

    const [internships, setInternships] = useState([]);
    const [studentSearchList, setStudentSearchList] = useState([]);

    // Gets all students
    useEffect(() => {
        const getInternships = async () => {
            setIsPending(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/internships`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('auth')}`
                    }
                })
                setInternships(response.data.internships);
                setIsPending(false); 
            } catch (err) {
                setIsPending(false);
            }
        }
        getInternships()
    }, [])

    // Gets students based on search query
    useEffect(() => {
        let searchList = [];
        internships.map((internship) => {
            if (internship.studentFullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                internship.studentPhone.toString().includes(searchQuery) ||
                internship.student.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
                searchList.push(internship);
            }
        })
        setStudentSearchList(searchList);
    }, [searchQuery, internships])

    // Table
    const headerCells = ['Vārds', 'Tālrunis', 'E-pasts'];

    return (
        <div>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="teacher-journal" />
            <div className="dashboard-container">
                <div className="teacher-journal">
                    <h1>Studenti</h1>
                    <div className="teacher-journal-table-filter">
                        <SearchInput onChange={changeSearchQuery} />
                    </div>
                    <StudentsTable 
                        headerCells={headerCells} 
                        data={searchQuery ? studentSearchList : internships} 
                        link="../teacher-student-journals/"
                        isPending={isPending}
                    />
                </div>
            </div>
        </div>
    );
}

export default TeacherJournal;