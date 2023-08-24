// style
import "./HomeProfile.css";
// assets
import male from "../../../assets/male.svg";
import female from "../../../assets/female.svg";
// hooks
import useTheme from "../../../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const HomeProfile = ({
    user,
    role
}) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [profileLink, setProfileLink] = useState('');

    useEffect(() => {
        switch (role) {
        case "teacher":
            setProfileLink('teacher');
            break;
        case "student":
            setProfileLink('student');
            break;
        case "supervisor":
            setProfileLink('supervisor');
            break;
    }
    }, [])

    return (
        <div className={`home-profile ${theme}`} onClick={() => navigate(`../${profileLink}-settings`)}>
            <img className="home-profile-image" src={user.gender === "male" ? male : female} alt="profile" />
            <h1>{user.name} {user.surname}</h1>
            <div className="home-profile-contact-info">
                {user.email && <h3>E-pasts: {user.email}</h3>}
                {user.phone && <h3>Tālrunis: {user.phone}</h3>}
                {user.school && <h3>Skola: {user.school}</h3>}
                {user.company && <h3>Uzņēmums: {user.company}</h3>}
                {user.field && <h3>Nozare: {user.field}</h3>}
            </div>
        </div>
    );
}
 
export default HomeProfile;