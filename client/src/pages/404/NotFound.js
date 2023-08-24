// style
import "./NotFound.css";
// assets
import NotFoundImage from "../../assets/404.png";
// atoms
import PageButton from "../../components/atoms/button/PageButton";
// redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const NotFound = (props) => {
    return (
        <div className="not-found">
            <div className="not-found-info">
                <h1>Lapa, kuru meklējat, neeksistē!</h1>
                <h2>Pārbaudiet adresi un mēģiniet velreiz vai arī dodaties uz sākuma lapu.</h2>
                <Link to={props.user.role ? `${props.user.role}-home` : '/'} ><PageButton text="Sākuma lapa" /></Link>
            </div>
            <img src={NotFoundImage} alt="Not found" />
        </div>
    );
}
 
const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(NotFound);