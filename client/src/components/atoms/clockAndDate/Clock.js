// hooks
import { useState, useEffect } from "react";

const Clock = () => {

    const [clock, setClock] = useState();

    useEffect(() => {
        setInterval(() => {
            const time = new Date();
            setClock(time.toLocaleTimeString('en-GB'));
        }, 1000);
    }, []);

    return (
        <h2>{clock}</h2>
    );
}
 
export default Clock;