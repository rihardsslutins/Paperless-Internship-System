// style
import "./SupervisorSettings.css";
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

const SupervisorSettings = (props) => {

    const navigate = useNavigate();

    /// Sidebar
    const icon = ['home', 'journal', 'invite', 'settings'];
    const imgAlt = ['home page', 'journal page', 'invite page', 'settings page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Uzaicinājumi', 'Iestatījumi'];
    const link = ['supervisor-home', 'supervisor-journal', 'supervisor-invites', 'supervisor-settings'];

    // Logged in users info
    const supervisor = props.user

    // Delete profile modal
    // const [displayModal, setDisplayModal] = useState(false);
    // const handleCloseModal = () => setDisplayModal(false);

    return (
        <>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="supervisor-settings" />
            <div className="dashboard-container">
                <div className="supervisor-settings">
                    <div className="supervisor-info">
                        <img className="supervisor-profile-image" src={supervisor.gender === "male" ? male : female} alt="profile" />
                        <h1>{supervisor.name} {supervisor.surname}</h1>
                        <div className="supervisor-contact-info">
                            <h3>E-pasts: {supervisor.email}</h3>
                            <h3>Tālrunis: {supervisor.phone}</h3>
                            <h3>Uzņēmums: {supervisor.company}</h3>
                            <h3>Nozare: {supervisor.field}</h3>
                        </div>
                        <PageButton text='Rediģēt profilu' onClick={() => navigate("../supervisor-profile-edit")} />
                        <div className="supervisor-theme">
                            Mājaslapas motīvs: <ThemeToggle />
                        </div>
                    </div>
                    {/* <DangerButton text='Dzēst profilu' onClick={() => setDisplayModal(true)} /> */}
                    {/* <DeleteProfileModal role='supervisor' display={displayModal} handleClose={handleCloseModal} /> */}
                </div>
            </div>
        </>
    );
}
 
const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(SupervisorSettings);