//import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../shared/Button';
import { login, logout } from './service';
import CheckBox from './Checbox';
import { useChecked } from './useChecked';
import './LoginPage.css';
import '../shared/Buttons.css';
import { UseModal } from '../modals/UseModal';
import Modal from '../modals/Modal';

const LoginPage = ({ isLogged, onLogin, onLogout }) => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorMs, setErrorMs] = useState('');
    const [success, setSuccess] = useState(false);
    const resetError = () => {
        setError(null);
    };
    const [isOpenModalError, openModalError, closeModalError] = UseModal(false);
    const [isOpenModalSuccess, openModalSuccess, closeModalSuccess] = UseModal(false);
    const location = useLocation();

    const handleSubmit = async (event) => {
        event.preventDefault();

        resetError();
        setIsLoading(true);
        try {
            await login(credentials, checked);
            setIsLoading(false);
            //Logged in:
            onLogin();
            setSuccess(true)
            console.log(success)
            openModalSuccess()
            // Redirect to pathname
            const to = location.state?.from?.pathname || '/';
            setTimeout(() => navigate(to), 3000);
        } catch (error) {
            setError(error);

            error.message === 'Network Error'
                ? setErrorMs('An error occurred while logging in')
                : setErrorMs('Incorrect username or password');
            openModalError();
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        });
    };

    const handleClickLogout = async () => {
        await logout();
        onLogout();
    };

    const [checked, handleClickCheckBox] = useChecked(false);

    const buttonDisabled =
        !credentials.email || !credentials.password || isLogged;
    const logoutButtonDisabbled = isLogged;

    return (
        <>
            <Modal
                name='success'
                isOpen={isOpenModalSuccess}
                closeModal={closeModalSuccess}
            >
                <h3 className='modalErrorH3'>Successful login!!</h3>
                <small>You will be re-directed.</small>
            </Modal>
            <Modal
                name='error'
                isOpen={isOpenModalError}
                closeModal={closeModalError}
            >
                <h3 className='modalErrorH3'>{errorMs}.</h3>
                <Button
                    className='noDeleteButton'
                    variant='primary'
                    onClick={closeModalError}
                >
                    Please try again...
                </Button>
            </Modal>
            <div className='infoContainer'>
                <div className='leftSide' id='leftSide'>
                    <h1 id='textLogin'>Already Logged?</h1>
                    <p>
                        Please{' '}
                        <Button
                            className='noDeleteButton'
                            variant='primary'
                            onClick={handleClickLogout}
                            disabled={!logoutButtonDisabbled}
                        >
                            logout
                        </Button>{' '}
                        before to access AlaPop.
                    </p>
                </div>

                <div className='rigthSide'>
                    <form id='logUser' onSubmit={handleSubmit}>
                        <label htmlFor='email'>email:</label>
                        <input
                            type='email'
                            name='email'
                            onChange={handleChange}
                            value={credentials.email}
                        />
                        <br />
                        <label htmlFor='password'>Password:</label>
                        <input
                            type='password'
                            name='password'
                            onChange={handleChange}
                            value={credentials.password}
                        />
                        <br />
                        <Button
                            className='noDeleteButton'
                            variant='primary'
                            type='submit'
                            disabled={buttonDisabled}
                        >
                            Login
                        </Button>
                        <br />
                        <CheckBox
                            name='rememberLogin'
                            cheked={checked}
                            setChecked={handleClickCheckBox}
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
