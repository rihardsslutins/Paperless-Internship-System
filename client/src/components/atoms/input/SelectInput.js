//style
import "./Inputs.css";
// hooks
import useTheme from "../../../hooks/useTheme";
import { useEffect, useState } from "react";

const SelectInput = ({
    options,
    setChosen,
    defaultFormOption
}) => {
    const theme = useTheme();
    const [selected, setSelected] = useState(defaultFormOption);
    useEffect(() => {
        setChosen(selected);
    })

    return (
        <select className={`select-input ${theme}`} value={selected} onChange={e => setSelected(e.target.value)}>
            {options.map((option) =>
                <option value={option[0]} key={option[0]}>{option[1]}</option>
            )}
        </select>
    );
}
 
export default SelectInput;