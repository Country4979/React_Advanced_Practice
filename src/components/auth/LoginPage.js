import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin, authLoginRequest, authlogout } from '../../store/actions';
import Button from '../shared/Button';
import './LoginPage.css';
import '../shared/Buttons.css';
import { UseModal } from '../modals/UseModal';
import Modal from '../modals/Modal';
import { getIsLogged, getUi } from '../../store/selectors';

const LoginPage = () => {
    const isLogged = useSelector(getIsLogged);
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const dispatch = useDispatch();

    const { isLoading, error } = useSelector(getUi);

    const [errorMs, setErrorMs] = useState('');

    const [isOpenModalError, openModalError, closeModalError] = UseModal(false);
    const [isOpenModalSuccess, closeModalSuccess] = UseModal(false);

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
            openModalError();
        }
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
            <Modal
                name='success'
                isOpen={isOpenModalSuccess}
                closeModal={closeModalSuccess}
            >
                <h3 className='modalErrorH3'>Successful login!!</h3>
                <small>You will be re-directed.</small>
            </Modal>
            {error && (
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
