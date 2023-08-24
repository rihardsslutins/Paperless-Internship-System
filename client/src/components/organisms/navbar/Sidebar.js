// style
import "./NavbarStyle.css";
// assets
import menuOpen from "../../../assets/menuOpen.svg";
import sidebarClose from "../../../assets/sidebarClose.svg"
import close from "../../../assets/close.svg";
// molecules
import SidebarItems from "../../molecules/sidebarItems/SidebarItems";

import { useState } from "react";
import Cookies from "js-cookie";

const Sidebar = ({
    icon,
    imgAlt,
    title,
    link,
    page
}) => {

    const [expanded, setExpanded] = useState('');

    const handleExpand = () => {
        setExpanded(' expanded')
    }
    const handleShrink = () => {
        setExpanded('');
    }

    let sidebarItemArray = [];
    for (let i = 0; i < icon.length; i++) {
        sidebarItemArray.push(
            <SidebarItems 
                icon={icon[i]}
                imgAlt={imgAlt[i]}
                title={title[i]}
                link={link[i]}
                active={page === link[i] ? '-active' : ''}
                key={[i]}
            />
        );
    }

    const handleLogout = () => {
        Cookies.remove('auth');
        window.location.reload();
    }

    return (
        <div className={`sidebar${expanded}`}>
            <div className="sidebar-header">
                <img className="sidebar-menu-open" src={menuOpen} alt="open sidebar" onClick={handleExpand}/>
                <div className="sidebar-menu-expanded">
                    <img className="sidebar-menu-close" src={sidebarClose} alt="close sidebar" onClick={handleShrink}/>
                    <img className="sidebar-menu-close-mobile" src={close} alt="close sidebar" onClick={handleShrink}/>
                </div>
                <h2>E-prakse</h2>
            </div>
            <div className="sidebar-body">
                {sidebarItemArray.map(e => e)}
            </div>
            <div className="sidebar-footer">
                <SidebarItems icon="logout" imgAlt="logout" title="Iziet" active="" link="login" onClick={handleLogout} />
            </div>
        </div>
    );
}
 
export default Sidebar;