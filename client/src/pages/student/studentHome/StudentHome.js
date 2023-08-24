// style
import "./StudentHome.css";
// atoms
import PageButton2 from "../../../components/atoms/button/PageButton2";
// molecules
import JournalCard from "../../../components/molecules/card/JournalCard";
// organism
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import HomeInfoProfile from "../../../components/organisms/homeInfoProfile/HomeInfoProfile";
// hooks
import { useNavigate } from "react-router-dom";
import ThemeToggleRound from "../../../components/ThemeToggle/ThemeToggleRound";
// react
import { useEffect, useState } from "react";
// redux
import { connect } from "react-redux";
// packages
import axios from "axios";
import Cookies from "js-cookie";

const StudentHome = (props) => {

    // Sidebar
    const icon = ['home', 'journal', 'settings'];
    const imgAlt = ['home page', 'journal page', 'settings page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Iestatījumi'];
    const link = ['student-home', 'student-journals', 'student-settings'];

    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);
    
    // Logged in users info
    const student = props.user

    // Active Journal
    const [internship, setInternship] = useState([])
    useEffect(() => {
        const getInternship = async () => {
            setIsPending(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/internships`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('auth')}`
                    }
                }
                )
                if (response.data.internships) {
                    response.data.internships.map((internship) => {
                        if (internship.isActive) {
                            setInternship([internship])
                        }
                    })
                }
                setIsPending(false);
            } catch (err) {
                console.log(err);
                setIsPending(false);
            }
        }
        getInternship()
    }, [])

    return (
        <>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="student-home" />
            <div className="dashboard-container">
                <div className="student-home">
                    <HomeInfoProfile user={student} role='student' /> 
                    <div className="home-student-journal-container">
                        <div className="home-student-journal">
                            <h2>Dienasgrāmata:</h2>
                            {isPending && <div className="loading"></div>}
                            {!isPending &&
                                <>
                                    {!internship.length ?
                                        <div className="student-home-no-journal">
                                            <h3>Nav aktīvas dienasgrāmatas</h3>
                                            <PageButton2 text='Izveidot dienasgrāmatu' active={''} onClick={() => navigate("../student-journal-create")} />
                                        </div>
                                    :
                                        <JournalCard journalCard={internship[0]} role="student"/>
                                    }
                                </>
                            }
                        </div>
                    </div>
                    <ThemeToggleRound />
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(StudentHome);