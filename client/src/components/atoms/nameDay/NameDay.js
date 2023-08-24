import { namedays } from "vardadienas";

const NameDay = () => {

    // Gets todays date
    const today = new Date();
    // Formats date to be based on this format mm-dd
    const date = ('0' + (today.getMonth()+1)).slice(-2) + '-' + ('0' + (today.getDate())).slice(-2);
    // Gets the correct array of todays date and saves it in const
    const nameday = (namedays[date]);

    return (
        <div>
            {/* Iterates through nameday array and comma is added 
            after every word and dot is added after the last word */}
            <b>Vārda dienas:</b> {nameday.map((name, index) => `${name}${index === nameday.length - 1 ? '.' : ', '}`)}
        </div>
    );
}
 
export default NameDay;