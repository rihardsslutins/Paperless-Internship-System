// style
import "./CardGrid.css";
// molecules
import JournalCard from "../../molecules/card/JournalCard";

const CardGrid = ({
    internships,
    role
}) => {
    let activeInternships = [];
    let inactiveInternships = [];
    for (let i = 0; i < internships.length; i++) {
        internships[i].isActive ?
            activeInternships.push(internships[i])
        :
            inactiveInternships.push(internships[i])
    }
    return (
        <>
            {!internships.length ? 
                <h2 className="no-journals"> Nav nevienas dienasgrāmatas</h2>
            :
                <div>
                    <div className="journals-active">
                        <h2>Aktīvs</h2>
                            {activeInternships.length ?
                                    <div className="journals-grid">
                                        {activeInternships.map((activeInternship) => (
                                                <JournalCard journalCard={activeInternship} key={activeInternship._id} role={role}  />
                                        ))}
                                    </div>
                                :
                                    <h3>Nav nevienas aktīvas dienasgrāmatas</h3>
                            }
                    </div>
                    <div className="journals-finished">
                        <h2>Pabeigts</h2>
                            {inactiveInternships.length ?
                                    <div className="journals-grid">
                                        {inactiveInternships.map((inactiveInternship) => (
                                            <JournalCard journalCard={inactiveInternship} key={inactiveInternship._id} role={role}  />
                                        ))}
                                    </div>
                                :
                                    <h3>Nav nevienas pabeigtas dienasgrāmatas</h3>
                            }
                        
                    </div>
                </div>
            }
        </>
    );
}
 
export default CardGrid;