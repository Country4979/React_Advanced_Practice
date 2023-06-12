import { useParams, useNavigate } from 'react-router-dom';
import Button from '../shared/Button';
import { useState, useEffect } from 'react';
import { deleteAdvert, getAdvert } from './service';
import Advert from './Advert';
import { UseModal } from '../modals/UseModal';
import Modal from '../modals/Modal';
import '../shared/loading.css';
import './AdvertPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAdvertById, getIsLogged, getUi } from '../../redux/selectors';
import { advertLoad } from '../../redux/actions';

const AdvertPage = () => {
    const navigate = useNavigate();
    //const isLogged = useSelector(getIsLogged);
    const { id } = useParams();
    const advert = useSelector(getAdvertById(id));
    const dispatch = useDispatch();
    const { error, isLoading } = useSelector(getUi);

    //const [isLoading, setIsLoading] = useState(true);

    //--MODAL WINDOWS
    const [isOpenModal1, openModal1, closeModal1] = UseModal(false);
    const [isOpenModal2, openModal2, closeModal2] = UseModal(false);
    const [isOpenModal3, openModal3, closeModal3] = UseModal(false);
    const [isOpenModalError, openModalError, closeModalError] = UseModal(false);

    UseModal(false);

    const openModals2 = () => {
        if (isOpenModal1) {
            closeModal1();
        }
        openModal2();
    };

    const openModals3 = () => {
        if (isOpenModal2) {
            closeModal2();
        }
        openModal3();
    };

    const closeModals3 = () => {
        navigate('/adverts');
    };
    //----

    const handleDelete = () => {
        console.log('Esto es handle delete');
        /*deleteAdvert(params.id).then(() => {
            openModals3();
            setTimeout(() => {
                navigate('/adverts');
            }, 500);
        });*/
    };
    useEffect(() => {
        dispatch(advertLoad(id)).catch((error) => {
            if (error.status === 404) {
                return navigate('/404');
            }
        });
    }, [dispatch, id, navigate]);

    return (
        <>
            {isLoading ? (
                <div className='loadingPage'>
                    <div className='loadingInfo'>
                        <h1>LOADING....</h1>
                        <div className='spinner' id='spinner'>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <Modal
                        name='error'
                        isOpen={isOpenModalError}
                        closeModal={closeModalError}
                    >
                        <h3 className='modalErrorH3'>
                            An error occurred loading advertisement.
                        </h3>
                        <Button
                            className='noDeleteButton'
                            variant='primary'
                            onClick={closeModalError}
                        >
                            Please try again later...
                        </Button>
                    </Modal>
                    <Modal
                        name='modal1'
                        isOpen={isOpenModal1}
                        closeModal={closeModal1}
                    >
                        <h2 className='modalH2'>DELETING ADVERTISEMENT</h2>
                        <h3 className='modalH3'>
                            Are you sure you want to delete this ad?
                        </h3>
                        <Button
                            onClick={openModals2}
                            className='buttons deleteButton'
                        >
                            Yes
                        </Button>
                        <Button
                            onClick={closeModal1}
                            className='buttons noDeleteButton'
                        >
                            No
                        </Button>
                    </Modal>
                    <Modal
                        name='modal2'
                        isOpen={isOpenModal2}
                        closeModal={closeModal2}
                    >
                        <h2 className='modalH2'>DELETING ADVERTISEMENT</h2>
                        <h3 className='modalH3'>
                            Are you REALLY sure you want to delete this ad?
                        </h3>
                        <p>This action will permanently delete your ad!!</p>
                        <Button
                            onClick={handleDelete}
                            className='buttons deleteButton'
                        >
                            Yes
                        </Button>
                        <Button
                            onClick={closeModal2}
                            className='buttons noDeleteButton'
                        >
                            No
                        </Button>
                    </Modal>
                    <Modal
                        name='modal3'
                        isOpen={isOpenModal3}
                        closeModal={closeModal3}
                    >
                        <h2 className='modalH2'>ADVERTISEMENT DELETED</h2>
                        <h3 className='modalH3'>(I told you...)</h3>
                        <Button
                            onClick={closeModals3}
                            className='buttons noDeleteButton'
                        >
                            Ok
                        </Button>
                    </Modal>
                    <div className='productContainer'>
                        <Advert {...advert} className='product' />
                    </div>

                    <Button
                        id='deleteAdd'
                        className='buttons deleteButton'
                        onClick={openModal1}
                        disabled={error}
                    >
                        Delete Adv
                    </Button>
                </>
            )}
        </>
    );
};

export default AdvertPage;
