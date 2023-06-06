import Button from '../shared/Button';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { UseModal } from '../modals/UseModal';
import Modal from '../modals/Modal';
import { logout } from '../auth/service';
import '../shared/vars.css';
import './Navbar.css';
import { useState } from 'react';

const Navbar = ({ isLogged, onLogout }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isOpenModalLogout, openModaleLogout, closeModaleLogout] =
        UseModal(false);
    const [isOpenModalError, openModalError, closeModalError] = UseModal(false);
    const [
        isOpenModalLogoutSuccess,
        openModalLogoutSuccess,
        closeModalLogoutSuccess,
    ] = UseModal(false);
    const [isOpenModalLoginNew, openModaleLoginNew, closeModaleLoginNew] =
        UseModal(false);
    const [isOpenModalLoginHome, openModaleLoginHome, closeModaleLoginHome] =
        UseModal(false);

    const navigate = useNavigate();

    const openModalLoginNew = () => {
        if (!isLogged) {
            openModaleLoginNew();
        } else {
            navigate('adverts/new');
        }
    };
    const openModalLoginHome = () => {
        if (!isLogged) {
            openModaleLoginHome();
        } else {
            navigate('adverts');
        }
    };

    const handleClick = () => {
        openModaleLogout();
    };

    const handleClickLogout = async () => {
        closeModaleLogout();
        try {
            await logout();
            openModalLogoutSuccess();
            setTimeout(() => {
                closeModalLogoutSuccess();
                onLogout();
            }, 3000);
        } catch (error) {
            setIsLoading(true);
            openModalError();
        }
    };

    const buttonDisabbled = isLogged;

    return (
        <>
            <Modal
                name='error'
                isOpen={isOpenModalError}
                closeModal={closeModalError}
            >
                <h3 className='modalErrorH3'>
                    An error occurred while logging out
                </h3>
                <Button
                    className='noDeleteButton'
                    variant='primary'
                    onClick={closeModalError}
                >
                    Try again later...
                </Button>
            </Modal>
            <Modal
                className='modalLogout'
                isOpen={isOpenModalLogout}
                closeModal={closeModaleLogout}
            >
                <h1 className='modalLogout'>
                    Are you sure you want to logout?
                </h1>
                <Button onClick={handleClickLogout} className='deleteButton'>
                    Yes, I want
                </Button>
                <Button
                    onClick={closeModaleLogout}
                    variant='primary'
                    className='noDeleteButton'
                    style={{ borderWidth: '1px' }}
                >
                    No
                </Button>
            </Modal>
            <Modal
                name='success'
                isOpen={isOpenModalLogoutSuccess}
                closeModal={closeModalLogoutSuccess}
            >
                <h3 className='modalErrorH3'>Successful logout!!</h3>
                <p>See you soon!</p>
                <Button
                    className='noDeleteButton'
                    variant='primary'
                    onClick={closeModalLogoutSuccess}
                >
                    OK
                </Button>
            </Modal>

            <Modal
                className='modalLoginHome'
                isOpen={isOpenModalLoginHome}
                closeModal={closeModaleLoginHome}
            >
                <p>
                    You are not logged in now. You need to{' '}
                    <NavLink
                        to='/login'
                        as={Button}
                        className='NavBarButton'
                        variant='primary'
                        onClick={closeModaleLoginHome}
                    >
                        login
                    </NavLink>{' '}
                    to view ads and access other features of the App.
                </p>
                <NavLink
                    className='NavLinkButton'
                    to='/login'
                    as={Button}
                    variant='primary'
                    onClick={closeModaleLoginHome}
                >
                    LOGIN
                </NavLink>{' '}
            </Modal>

            <Modal
                className='modalLoginNew'
                isOpen={isOpenModalLoginNew}
                closeModal={closeModaleLoginNew}
            >
                <p>
                    You are not logged yet. You need to{' '}
                    <NavLink
                        to='/login'
                        as={Button}
                        className='NavBarButton'
                        variant='primary'
                        onClick={closeModaleLoginNew}
                    >
                        login
                    </NavLink>{' '}
                    to create ads and access other features of the App.
                </p>
                <NavLink
                    className='NavLinkButton'
                    to='/login'
                    as={Button}
                    variant='primary'
                    onClick={closeModaleLoginHome}
                >
                    LOGIN
                </NavLink>{' '}
            </Modal>

            <div className='navbar'>
                <div id='logged'></div>
                <Button
                    name='toNewAdv'
                    className='NavBarButton noDeleteButton'
                    variant='primary'
                    onClick={openModalLoginNew}
                    disabled={!buttonDisabbled}
                >
                    New Adv.
                </Button>

                <Button
                    className='NavBarButton noDeleteButton'
                    variant='primary'
                    disabled={!buttonDisabbled}
                    onClick={handleClick}
                >
                    Logout
                </Button>

                <Button
                    name='toHome'
                    className='NavBarButton noDeleteButton'
                    variant='primary'
                    onClick={openModalLoginHome}
                    //disabled={!buttonDisabbled}
                >
                    Home
                </Button>
            </div>
        </>
    );
};

export default Navbar;
