// style
import "./Cards.css";
// atoms
import PageButton from "../../atoms/button/PageButton";

import { Link } from "react-router-dom";
// hooks
import useTheme from "../../../hooks/useTheme";
// packages
import moment from "moment";

const JournalCard = ({ 
    journalCard, 
    role 
}) => {
    const theme = useTheme();

    return (
        <div className={`journal-card ${theme}`}>
                <h4 className="journal-card-company">{journalCard.company}</h4>
                <p className="journal-card-mentor">{journalCard.supervisorFullName}</p>
                <div className="journal-card-teacher">
                    <p>Skolotājs:</p>
                    <p>{journalCard.teacherFullName}</p>
                </div>
                <div className="journal-card-date">
                    <p>Datums:</p>
                    <p>{moment(journalCard.startingDate).locale('lv').format('LL')}{journalCard.endingDate && " - " + moment(journalCard.endingDate).locale('lv').format('LL')}</p>
                </div>
                {!journalCard.isPending &&
                    <>
                        {role === 'student' ?
                                <Link to={`../student-journal/${journalCard._id}`}><PageButton text="Apskatīt" /></Link>
                        :
                            <Link to={`../teacher-student-journal/${journalCard._id}`}><PageButton text="Apskatīt" /></Link>
                        }
                    </>
                }
                {journalCard.isPending && <div className="journal-pending">Gaida prakses vadītāja apstiprinājumu</div>}
        </div>
    );
}
 
export default JournalCard;