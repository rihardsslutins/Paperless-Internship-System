// style
import "./SidebarItems.css";
import { Link } from "react-router-dom";

const SidebarItems = ({
    icon,
    imgAlt,
    title,
    link,
    active,
    onClick
}) => {
    return (
        <Link to={`../${link}`} className={`sidebar-item${active}`} onClick={onClick}>
            <img src={require(`../../../assets/${icon}.svg`)} alt={imgAlt} />
            <p>{title}</p>
        </Link>
    );
}
 
export default SidebarItems;