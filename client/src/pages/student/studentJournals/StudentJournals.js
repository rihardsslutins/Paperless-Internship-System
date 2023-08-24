// style
import './StudentJournals.css';
// atoms
import PageButton2 from '../../../components/atoms/button/PageButton2';
// organisms
import Sidebar from '../../../components/organisms/navbar/Sidebar';
import CardGrid from '../../../components/organisms/cardGrid/CardGrid';
// packages
import axios from 'axios';
import Cookies from 'js-cookie';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const StudentJournals = () => {

    // Sidebar
    const icon = ['home', 'journal', 'settings'];
    const imgAlt = ['home page', 'journal page', 'settings page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Iestatījumi'];
    const link = ['student-home', 'student-journals', 'student-settings'];

    const [internships, setInternships] = useState('')
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        const getInternships = async () => {
            setIsPending(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/internships`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('auth')}`,
                    },
                });
                setInternships(response.data.internships);
                setIsPending(false);
            } catch (err) {
                console.log(err);
                setIsPending(false);
            }
        }
        getInternships()
    }, [])

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
                <div className="student-journals-header">
                    <h1>Dienasgrāmatas</h1>
                    <Link to="../student-journal-create">
                        <PageButton2 text="Izveidot jaunu" active="" />
                    </Link>
                </div>
                {isPending && <div className="loading"></div>}
                {!isPending && 
                    <CardGrid internships={internships} role="student" />
                }
            </div>
        </>
    );
};

export default StudentJournals;
