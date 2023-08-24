import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// redux
import { connect } from 'react-redux';

//atoms
import PageButton from '../../../components/atoms/button/PageButton';
//organisms
import Navbar from '../../../components/organisms/navbar/Navbar';
import RegisterModal from '../../../components/organisms/modal/RegisterModal';
//image
import homePage from '../../../assets/homePage.png';
//style
import './Home.css';

const Home = (props) => {
    const navigate = useNavigate();
    const [displayStudent, setDisplayStudent] = useState(false);
    const [displayTeacher, setDisplayTeacher] = useState(false);
    const [displayMentor, setDisplayMentor] = useState(false);

    const handleClose = () => {
        setDisplayStudent(false);
        setDisplayTeacher(false);
        setDisplayMentor(false);
    };
    useEffect(() => {
        if (props.user.role) {
            navigate(`${props.user.role}-home`);
        }
    }, [props.user.role]);
    return (
        <div>
            <Navbar />
            <div className="container guest-home">
                <div>
                    <h1>Kas Jūs esat?</h1>
                    <div className="home-button-grid">
                        <PageButton
                            text="Students"
                            onClick={() => {
                                setDisplayStudent(true);
                                setDisplayTeacher(false);
                                setDisplayMentor(false);
                            }}
                        />
                        <PageButton
                            text="Skolotājs"
                            onClick={() => {
                                setDisplayStudent(false);
                                setDisplayTeacher(true);
                                setDisplayMentor(false);
                            }}
                        />
                        <PageButton
                            text="Prakses vadītājs"
                            onClick={() => {
                                setDisplayStudent(false);
                                setDisplayTeacher(false);
                                setDisplayMentor(true);
                            }}
                        />
                    </div>
                    <p>
                        Atvieglojiet saziņu prakses laikā starp studentiem, skolotājiem un prakses vadītājiem.
                        Izvēlies savu lomu un reģistrējies mājaslapai, lai fiziskās prakses dienasgrāmatas aizstātu ar digitālām.
                    </p>
                </div>
                <img
                    src={homePage}
                    alt="home page"
                    className="guest-home-image"
                />
                <RegisterModal
                    title="Students"
                    body="Reģistrējies mājaslapai kā students, lai aizstātu savu fizisko prakses dienasgrāmatu ar digitālu un vieglāk veiktu ierakstus dienasgrāmatā."
                    display={displayStudent}
                    handleClose={handleClose}
                    buttonText="Reģistrēties kā students"
                    role="student"
                />
                <RegisterModal
                    title="Skolotājs"
                    body="Reģistrējies mājaslapai, lai vieglāk apskatītu ko studenti dara un kā tiem klājas prakses laikā, kā arī varēsiet jebkurā laikā redzēt, kā viņus novērtē prakses vadītājs."
                    display={displayTeacher}
                    handleClose={handleClose}
                    buttonText="Reģistrēties kā skolotājs"
                    role="teacher"
                />
                <RegisterModal
                    title="Prakses vadītājs"
                    body="Reģistrējies mājaslapai, lai jebkurā brīdī varētu apskatīt praktikantu ierakstus dienasgrāmatā, kā arī vigli un ātri ielikt vērtējumus."
                    display={displayMentor}
                    handleClose={handleClose}
                    buttonText="Reģistrēties kā prakses vadītājs"
                    role="supervisor"
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(Home);
