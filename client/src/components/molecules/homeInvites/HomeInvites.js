// style
import "./HomeInvites.css";
// assets
import noInvites from "../../../assets/noInvites.svg";
// hooks
import { useNavigate } from "react-router-dom";
import useTheme from "../../../hooks/useTheme";

const HomeInvites = ({
    invites,
    role,
    isPending
}) => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <div className="invite-container">
        <h2>Uzaicinājumi</h2>
        <div className={`invite-notifications ${theme}`}>
            {isPending && 
                <div className="invite-loading-container">
                    <div className="loading"></div>
                </div>
            }
            {!isPending &&
                <>
                    {invites.length ?
                        invites.map((invite) => (
                            <div key={invite._id} className={`home-invite ${theme}`} onClick={() => role === 'supervisor' ? navigate("../supervisor-invites") : navigate("../teacher-invites")}>
                                <p>{invite.body}</p>
                            </div>
                        ))
                    :
                        <div className="home-no-invites-container">
                            <div className="home-no-invites">
                                <img src={noInvites} alt="no invites" />
                                <p>Nav uzaicinājumu</p>
                            </div>
                        </div>
                    }
                </>
            }
        </div>
    </div>
    );
}
 
export default HomeInvites;