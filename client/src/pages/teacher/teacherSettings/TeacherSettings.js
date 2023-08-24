// style
import "./TeacherSettings.css";
// assets
import male from "../../../assets/male.svg";
import female from "../../../assets/female.svg";
// atoms
// import DangerButton from "../../../components/atoms/button/DangerButton";
import PageButton from "../../../components/atoms/button/PageButton";
// components
import Sidebar from "../../../components/organisms/navbar/Sidebar";
// import DeleteProfileModal from "../../../components/organisms/modal/DeleteProfileModal";
import ThemeToggle from "../../../components/ThemeToggle/ThemeToggle";
// hooks
import { useNavigate } from "react-router-dom";
// redux
import { connect } from "react-redux";

const TeacherSettings = (props) => {

    const navigate = useNavigate();

    // Sidebar
    const icon = ['home', 'journal', 'invite', 'settings'];
    const imgAlt = ['home page', 'journal page', 'invite page', 'settings page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Uzaicinājumi', 'Iestatījumi'];
    const link = ['teacher-home', 'teacher-journal', 'teacher-invites', 'teacher-settings'];

    // Logged in users info
    const teacher = props.user

    // Delete profile modal
    // const [displayModal, setDisplayModal] = useState(false);
    // const handleCloseModal = () => setDisplayModal(false);

    return (
        <>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="teacher-settings" />
            <div className="dashboard-container">
                <div className="teacher-settings">
                    <div className="teacher-info">
                        <img className="teacher-profile-image" src={teacher.gender === "male" ? male : female} alt="profile" />
                        <h1>{teacher.name} {teacher.surname}</h1>
                        <div className="teacher-contact-info">
                            <h3>E-pasts: {teacher.email}</h3>
                            <h3>Tālrunis: {teacher.phone}</h3>
                            <h3>Skola: {teacher.school}</h3>
                        </div>
                        <PageButton text='Rediģēt profilu' onClick={() => navigate("../teacher-profile-edit")} />
                        <div className="teacher-theme">
                            Mājaslapas motīvs: <ThemeToggle />
                        </div>
                    </div>
                    {/* <DangerButton text='Dzēst profilu' onClick={() => setDisplayModal(true)} /> */}
                    {/* <DeleteProfileModal role='teacher' display={displayModal} handleClose={handleCloseModal} /> */}
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(TeacherSettings);
