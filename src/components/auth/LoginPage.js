import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    authLoginFailure,
    authLoginRequest,
    authLoginSuccess,
    authLogout,
    uiResetError,
} from '../../redux/actions';
import Button from '../shared/Button';
import { login, logout } from './service';
import CheckBox from './Checbox';
import { useChecked } from './useChecked';
import './LoginPage.css';
import '../shared/Buttons.css';
import { UseModal } from '../modals/UseModal';
import Modal from '../modals/Modal';
import { getUi } from '../../redux/selectors';

const LoginPage = ({ isLogged }) => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoading, error } = useSelector(getUi);

    const [errorMs, setErrorMs] = useState('');
    const [success, setSuccess] = useState(false);

    const [isOpenModalError, openModalError, closeModalError] = UseModal(false);
    const [isOpenModalSuccess, openModalSuccess, closeModalSuccess] =
        UseModal(false);

    const onLogin = () => dispatch(authLoginSuccess());
    const onLogout = () => dispatch(authLogout());
    const handleSubmit = async (event) => {
        event.preventDefault();

        dispatch(authLoginRequest());
        try {
            await login(credentials, checked);

            //Logged in:
            onLogin();
            setSuccess(true);
            console.log('estado success', success);
            openModalSuccess();
            // Redirect to pathname
            const to = location.state?.from?.pathname || '/';
            //setTimeout(() => navigate(to), 500);
            navigate(to);
        } catch (error) {
            dispatch(authLoginFailure(error));
            error.message === 'Network Error'
                ? setErrorMs('An error occurred while logging in')
                : setErrorMs('Incorrect username or password');
            openModalError();
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
        isLoading || !credentials.email || !credentials.password || isLogged;
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
