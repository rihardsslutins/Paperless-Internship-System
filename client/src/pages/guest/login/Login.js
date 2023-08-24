//style
import './Login.css';

// redux
import { connect } from 'react-redux';

// packages
import axios from 'axios';

// react and hooks
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//organisms
import LoginForm from '../../../components/organisms/form/LoginForm';
import Navbar from '../../../components/organisms/navbar/Navbar';
import Alert from '../../../components/atoms/alerts/Alert';

const Login = (props) => {
    // forces a refresh in order to redirect
    const refreshPage = () => {
        window.location.reload();
    }
    const [alert, setAlert] = useState('');
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Error handling
    const handleErrors = (errors, propertyOrder) => {
        for (let i = 0; i < propertyOrder.length; i++) {
            if (errors[propertyOrder[i]]) {
                setAlert(errors[propertyOrder[i]]);
                return;
            } else {
                setAlert('');
            }
        }
    };

    const changeEmail = (e) => setEmail(e.target.value);
    const changePassword = (e) => setPassword(e.target.value);

    const onChangeArray = [changeEmail, changePassword];

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email) {
            setAlert('Lūdzu ievadi e-pastu');
        } else if (!password) {
            setAlert('Lūdzu ievadi paroli');
        } else {
            try {
                await axios
                    .post(
                        `${process.env.REACT_APP_SERVER_URL}/users/login`,
                        { email, password },
                        { withCredentials: true }
                    )
                    .then(() => {
                        refreshPage()
                    });
            } catch (err) {
                const errors = err.response.data.errors;
                const propertyOrder = ['email', 'password'];
                handleErrors(errors, propertyOrder);
            }
        }
    };

    const handleAlertClose = () => {
        setAlert('');
    };

    const formLabels = ['E-pasts:', 'Parole:'];
    const formNames = ['email', 'password'];
    const formTypes = ['email', 'password'];
    useEffect(() => {
        if (props.user.role) {
            navigate(`../${props.user.role}-home`);
        }
    }, [navigate, props.user.role]);

    return (
        <div>
            <Navbar page="login" />
            <div className="container login">
                <h2 className="login-title">Pieslēgties</h2>
                {alert && (
                    <Alert
                        type="warning"
                        text={alert}
                        handleAlertClose={handleAlertClose}
                    />
                )}
                <LoginForm
                    id={formNames}
                    name={formNames}
                    label={formLabels}
                    type={formTypes}
                    onClick={handleLogin}
                    onChange={onChangeArray}
                    buttonText="Pieslēgties"
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(Login);
