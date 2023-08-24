// style
import "./HomeStudents.css";
// assets
import noStudent from "../../../assets/noStudent.svg";
// atoms
import PageButton2 from "../../atoms/button/PageButton2";
// hooks
import { useNavigate } from "react-router-dom";
import useTheme from "../../../hooks/useTheme";

const HomeStudents = ({
    internships,
    role,
    isPending
}) => {

    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <div className="home-students">
            <div className={`home-student-title ${theme}`}>
                <span></span>
                {role === 'supervisor' ?
                    <>
                        <h2>Praktikanti</h2>
                        <PageButton2 text='Visi praktikanti' active='' onClick={() => navigate("../supervisor-journal")} />
                    </>
                :
                    <>
                        <h2>Studenti</h2>
                        <PageButton2 text='Visi studenti' active='' onClick={() => navigate("../teacher-journal")}/>
                    </>
                }
            </div>
            <div className={`home-students-list ${theme}`}>
                {isPending && 
                    <div className="student-loading-container">
                        <div className="loading"></div>
                    </div>
                }
                {!isPending &&
                    <>
                        {internships.length ?
                            <table>
                                <tbody>
                                    {internships.map((internship) => (
                                        <tr key={internship._id} className="home-student" 
                                            onClick={() => role === 'supervisor' ? 
                                                    navigate("../supervisor-student-journal/" + internship._id)
                                                :
                                                    navigate("../teacher-student-journals/" + internship._id)
                                            }
                                        >
                                            <td>{internship.studentFullName}</td>
                                            <td>{internship.studentPhone}</td>
                                            <td>{internship.student}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        :
                            <div className="home-no-students-container">
                                <div className="home-no-students">
                                    <img src={noStudent} alt="no students" />
                                    {role === 'supervisor' ?
                                        <p>Nav praktikantu</p>
                                    :
                                        <p>Nav studentu</p>
                                    }
                                </div>
                            </div>
                        }
                    </>
                }
            </div>
        </div>
    );
}
 
export default HomeStudents;