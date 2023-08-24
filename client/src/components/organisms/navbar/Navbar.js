// style
import "./NavbarStyle.css";
// assets
import menuOpen from "../../../assets/menuOpen.svg";
import close from "../../../assets/close.svg";
// atoms
import NavButton from "../../atoms/button/NavButton";

import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ page }) => {

    const [expanded, setExpanded] = useState('');

    const handleExpand = () => {
        setExpanded(' expanded')
    }
    const handleShrink = () => {
        setExpanded('');
    }


    return (
        <div className={`navbar${expanded}`}>
            <h2 className="logo"><Link to={'/'}>E-prakse</Link></h2>
            <img className="navbar-menu-open" src={menuOpen} alt="open navber" onClick={handleExpand} />
            <img className="navbar-menu-close" src={close} alt="close navbar" onClick={handleShrink} />
            <div className="nav-links">
                <Link to={'/register'}><NavButton text="Reģistrēties" active={page === 'register' ? '-active' : ''} /></Link>
                <Link to={'/login'}><NavButton text="Pieslēgties" active={page === 'login' ? '-active' : ''} /></Link>
            </div>
        </div>
    );
}
 
export default Navbar;