import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    authLogin,
    authLoginRequest,
    authlogout,
    closeModal,
    openModal,
} from '../../store/actions';
import Button from '../shared/Button';
import './LoginPage.css';
import '../shared/Buttons.css';
//import { UseModal } from '../modals/UseModal';
import Modal from '../modals/Modal';
import { getIsLogged, getModalstate, getUi } from '../../store/selectors';

const LoginPage = () => {
    const isLogged = useSelector(getIsLogged);
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const dispatch = useDispatch();

    const { isLoading, error } = useSelector(getUi);
    const modalWindow = useSelector(getModalstate);
    const [errorMs, setErrorMs] = useState('');

    const onLogout = () => dispatch(authlogout());

    const handleSubmit = async (event) => {
        event.preventDefault();

        dispatch(authLoginRequest());
        try {
            await dispatch(authLogin(credentials));
        } catch (error) {
            error.message === 'Network Error'
                ? setErrorMs('An error occurred while logging in')
                : setErrorMs('Incorrect username or password');
            dispatch(openModal('error')); // open error modal window
        }
    };

    const closeModals = () => {
        dispatch(closeModal()); // close modal modal window
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === 'checkbox') {
            setCredentials((prevCredentials) => ({
                ...prevCredentials,
                [name]: checked,
            }));
        } else {
            setCredentials((prevCredentials) => ({
                ...prevCredentials,
                [name]: value,
            }));
        }
    };

    const handleClickLogout = async () => {
        onLogout();
    };

    const buttonDisabled =
        isLoading || !credentials.email || !credentials.password;
    const logoutButtonDisabbled = isLogged;

    return (
        <>
            {modalWindow.isOpen && (
                <Modal
                    isOpen={modalWindow.isOpen}
                    closeModal={closeModals}
                    modalType={modalWindow.modalType}
                >
                    {modalWindow.modalType === 'success' ? (
                        <>
                            <h3 className='modalErrorH3'>Successful login!!</h3>
                            <small>You will be re-directed.</small>
                        </>
                    ) : (
                        <>
                            <h3 className='modalErrorH3'>
                                {error.message === 'Network Error'
                                    ? 'An error occurred while logging in'
                                    : 'Incorrect username or password'}
                                .
                            </h3>
                            <Button
                                className='noDeleteButton'
                                variant='primary'
                                onClick={closeModals}
                            >
                                Please try again...
                            </Button>
                        </>
                    )}
                </Modal>
            )}
            <div className='infoContainer'>
                <div className='leftSide' id='leftSide'>
                    <h1 id='textLogin'>Already Logged?</h1>
                    <p>
                        Please{' '}
                        <Button
                            data-testid='logoutButton'
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
                            data-testid='email'
                            type='email'
                            name='email'
                            onChange={handleChange}
                            value={credentials.email}
                        />
                        <br />
                        <label htmlFor='password'>Password:</label>
                        <input
                            data-testid='password'
                            type='password'
                            name='password'
                            onChange={handleChange}
                            value={credentials.password}
                        />
                        <br />
                        <Button
                            data-testid='loginButton'
                            className='noDeleteButton'
                            variant='primary'
                            type='submit'
                            disabled={buttonDisabled}
                        >
                            Login
                        </Button>
                        <br />
                        <label>
                            Remember Login?
                            <input
                                type='checkbox'
                                name='rememberMe'
                                checked={credentials.rememberMe}
                                onChange={handleChange}
                            />
                        </label>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
