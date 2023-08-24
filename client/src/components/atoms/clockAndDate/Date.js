const ClockAndDate = () => {
    
    const days = ['Svētdiena', 'Pirmdiena', 'Otrdiena', 'Trešdiena', 'Ceturtdiena', 'Piektdiena', 'Sestdiena'];
    const months = ['janvāris', 'februāris', 'marts', 'aprilis', 'maijs', 'jūnijs', 'jūlijs', 'augusts', 'septembris', 'oktobris', 'novembris', 'decembris'];
    
    const today = new Date();
    const todaysDate = days[today.getDay()] + ', ' + today.getFullYear() + '. gada ' + today.getDate() + '. ' + months[today.getMonth()];

    return (
        <p>{todaysDate}</p>
    );
}
 
export default ClockAndDate;