// style
import "./HomeInfo.css";
// atoms
import Date from "../../../components/atoms/clockAndDate/Date";
import NameDay from "../../../components/atoms/nameDay/NameDay";
import Clock from "../../../components/atoms/clockAndDate/Clock";

const HomeInfo = () => {
    return (
        <div className="home-info">
            <NameDay />
            <Clock />
            <Date />
        </div>
    );
}
 
export default HomeInfo;