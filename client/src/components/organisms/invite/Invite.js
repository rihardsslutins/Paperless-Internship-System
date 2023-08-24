// style
import "./Invite.css";
// atoms
import DangerButton2 from "../../atoms/button/DangerButton2";
import PageButton from "../../atoms/button/PageButton";
// hooks
import useTheme from "../../../hooks/useTheme";
// packages
import axios from "axios";
import Cookies from "js-cookie";

const Invite = ({
    invites,
    setRefreshTable
}) => {

    const theme = useTheme();

    return (
        invites.map(invite => 
            <div className={`invite-box ${theme}`} key={invite._id}>         
                    <h2>{invite.subject}</h2>
                    <p>{invite.body}</p>
                    <div className="invite-button-group">
                        <PageButton text="Apstiprināt" onClick={async (e) => {
                            e.preventDefault()
                            try {
                                await axios.put(`${process.env.REACT_APP_SERVER_URL}/invites/${invite._id}`, {}, {
                                    headers: {
                                        Authorization: `Bearer ${Cookies.get('auth')}`
                                    }
                                })
                                setRefreshTable(false);
                                setRefreshTable(true);
                            } catch (err) {
                                console.log(err.message)
                            }
                        }} />
                        <DangerButton2 text="Noraidīt" onClick={async (e) => {
                            e.preventDefault()
                            try {
                                await axios.delete(`${process.env.REACT_APP_SERVER_URL}/invites/${invite._id}`, {
                                    headers: {
                                        Authorization: `Bearer ${Cookies.get('auth')}`
                                    }
                                })
                                setRefreshTable(false);
                                setRefreshTable(true);
                            } catch (err) {
                                console.log(err.message);
                            }
                        }} />
                    </div>
            </div>
        )
    );
}
 
export default Invite;