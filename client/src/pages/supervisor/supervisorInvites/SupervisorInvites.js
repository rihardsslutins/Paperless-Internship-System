// style
import "./SupervisorInvites.css";
// organisms
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import Invite from "../../../components/organisms/invite/Invite";
// react
import { useState, useEffect } from "react";
// packages
import axios from "axios";
import Cookies from "js-cookie";

const SupervisorInvites = () => {

    // Sidebar
    const icon = ['home', 'journal', 'invite', 'settings'];
    const imgAlt = ['home page', 'journal page', 'invite page', 'settings page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Uzaicinājumi', 'Iestatījumi'];
    const link = ['supervisor-home', 'supervisor-journal', 'supervisor-invites', 'supervisor-settings'];

    const [invites, setInvites] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [refreshTable, setRefreshTable] = useState(true);

    useEffect(() => {
        const getInvites = async () => {
            setIsPending(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/invites`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('auth')}`
                    }
                })
                setInvites(response.data.invites);
                setIsPending(false);
            } catch (err) {
                console.log(err);
                setIsPending(false);
            }
        }
        getInvites()
    }, [refreshTable])

    return (
        <>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="teacher-invites" />
            <div className="dashboard-container supervisor-invites">
                <h1>Uzaicinājumi</h1>
                {isPending && <div className="loading"></div>}
                {!isPending &&
                    <>
                        <Invite invites={invites} setRefreshTable={setRefreshTable} />
                        {!invites.length && <h2 className="supervisor-invites-0">Nav neviena uzaicinājuma</h2> }
                    </>
                }
            </div>
        </>
    );
}
 
export default SupervisorInvites;