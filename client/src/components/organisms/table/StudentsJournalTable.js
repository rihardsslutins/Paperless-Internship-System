//style
import "./Table.css";

import { useNavigate } from "react-router-dom";

const StudentsJournalTable = ({
    headerCells,
    data,
    link,
    isPending
}) => {
    const navigate = useNavigate();

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        {headerCells.map((headerCell) => (
                            <th key={headerCell}>{headerCell}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {!isPending && data.map(record => (
                        <tr key={record._id} onClick={() => navigate(link + record._id)}>
                            <td>{record.studentFullName}</td>
                            <td>{record.studentPhone}</td>
                            <td>{record.student}</td>
                        </tr>
                    ))}
                    {isPending && 
                        <tr>
                            <td colSpan={4}><div className="loading"></div></td>
                        </tr>
                    }
                    {!isPending && !data.length &&
                        <tr>
                            <td colSpan={4} className="no-record"> Nav neviena ieraksta </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}
         
export default StudentsJournalTable;