// style
import "./SupervisorJournal.css";
// atoms
import SearchInput from "../../../components/atoms/input/SearchInput";
// organisms
import Sidebar from "../../../components/organisms/navbar/Sidebar";
// import SelectInput from "../../../components/atoms/input/SelectInput";
import StudentsJournalTable from "../../../components/organisms/table/StudentsJournalTable";
// hooks
import { useEffect, useState } from "react";
// packages
import axios from 'axios'
import Cookies from "js-cookie";


const SupervisorJournal = () => {

    const [isPending, setIsPending] = useState(false);

    // Sidebar
    const icon = ['home', 'journal', 'invite', 'settings'];
    const imgAlt = ['home page', 'journal page', 'invite page', 'settings page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Uzaicinājumi', 'Iestatījumi'];
    const link = ['supervisor-home', 'supervisor-journal', 'supervisor-invites', 'supervisor-settings'];

    // Search input
    const [searchQuery, setSearchQuery] = useState('');
    const changeSearchQuery = (e) => setSearchQuery(e.target.value);

    const [internships, setInternships] = useState([]);
    const [internSearchList, setInternSearchList] = useState([]);

    // Gets all interns
    useEffect(() => {
        const getInternships = async () => {
            setIsPending(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/internships`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('auth')}`
                    }
                })
                setInternships(response.data.internships);
                setIsPending(false); 
            } catch (err) {
                console.log(err);
                setIsPending(false);
            }
        }
        getInternships()
    }, [])

    // Gets interns based on search query
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
        setInternSearchList(searchList);
    }, [searchQuery, internships])

    // Table
    const headerCells = ['Vārds', 'Tālrunis', 'E-pasts'];

    return (
        <div>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="supervisor-journal" />
            <div className="dashboard-container">
                <div className="supervisor-journal">
                    <h1>Praktikanti</h1>
                    <div className="supervisor-journal-table-filter">
                        <SearchInput onChange={changeSearchQuery} />
                    </div>
                    <StudentsJournalTable 
                        headerCells={headerCells} 
                        data={searchQuery ? internSearchList : internships} 
                        link="../supervisor-student-journal/"
                        isPending={isPending}
                    />
                </div>
            </div>
        </div>
    );
}

export default SupervisorJournal;