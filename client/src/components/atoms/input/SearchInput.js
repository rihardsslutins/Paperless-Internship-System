// style
import "./Inputs.css";
// assets
import search from "../../../assets/search.svg";

const SearchInput = ({onChange}) => {
    return (
        <div className="search-input">
            <img src={search} alt="search icon" />
            <input type="text" className="input-field" placeholder="Meklēt..." onChange={onChange} />
        </div>
    );
}
 
export default SearchInput;