import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../shared/Button';
import { createNewAdvert, getTagList } from './service';
import { UseModal } from '../modals/UseModal';
import Modal from '../modals/Modal';
import './NewAdvertPage.css';
import Layout from '../layout/Layout';
import { useSelector } from 'react-redux';

const NewAdvertPage = () => {
    const isLogged = useSelector(state => state.auth)
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenModalError, openModalError, closeModalError] = UseModal(false);
    const [isOpenModalErrorLogin, openModalErrorLogin, closeModalErrorLogin] =
        UseModal(false);
    const [isOpenModalSuccess, openModalSuccess, closeModalSuccess] =
        UseModal(false);
    const [tagsList, setTagsList] = useState([]);

    const [name, setName] = useState('');
    const [sale, setSale] = useState(true);
    const [price, setPrice] = useState('');
    const [tags, setTags] = useState([]);

    const [data, setData] = useState({
        name: '',
        sale: true,
        price: '',
    });

    const handleReset = () => {
        setPrice('');
        setName('');
    };
    const handleChangeName = (event) => {
        const nameCharacter = event.target.value;
        setName(nameCharacter);
        setData({ ...data, name: nameCharacter });
    };

    const handleChangeSale = () => {
        const sale = document.getElementById('addSelect').value;
        setData({ ...data, sale: sale });
        console.log(sale);
    };

    const handleChangePrice = (event) => {
        const priceNumber = event.target.value;
        setPrice(priceNumber);
        setData({ ...data, price: priceNumber });
    };

    const handleChangeTags = (event) => {
        //Adds the selected option to an array
        const selectedTags = Array.from(
            event.target.selectedOptions,
            (option) => option.value
        );

        setData({ ...data, tags: selectedTags });
    };

    const handleChangePhoto = (event) => {
        setData({ ...data, photo: event });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const datas = new FormData();
        try {
            setIsLoading(true);
            //Add datas to datas State
            datas.append('name', data.name);
            datas.append('sale', data.sale);
            datas.append('price', data.price);
            datas.append('tags', data.tags);
            if (!!data.photo) {
                datas.append('photo', data.photo);
            }
            //Send object datas to endpoint
            const advert = await createNewAdvert(datas);
            setIsLoading(false);
            openModalSuccess();
            setTimeout(() => {
                navigate(`/adverts/${advert.id}`);
            }, 3000);
        } catch (error) {
            if (error.status === 401) {
                setIsLoading(false);
                openModalErrorLogin();
                setTimeout(() => navigate('/login'), 4000);
            } else {
                setIsLoading(false);
                openModalError();
            }
        }
    };

    const isDisabled =
        isLoading ||
        name.length <= 0 ||
        price.length <= 0 ||
        sale === undefined ||
        !data.tags;

    useEffect(() => {
        setIsLoading(true);
        getTagList().then((tags) => setTagsList(tags));
        setIsLoading(false);
    }, []);
    return (
        <>
            {isLogged ? (
                <>
                    {isLoading ? (
                        <div className='loadingPage'>
                            <div className='loadingInfo'>
                                <h1 className='loading h1'>LOADING....</h1>
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
                                name='success'
                                isOpen={isOpenModalSuccess}
                                closeModal={closeModalSuccess}
                            >
                                <h1>Advertisement successfully created!!</h1>
                            </Modal>
                            <Modal
                                name='errorLogin'
                                isOpen={isOpenModalErrorLogin}
                                closeModal={closeModalErrorLogin}
                            >
                                <h2 className='modalH2'>
                                    You must be logged in to create ads
                                </h2>
                                <p className='small'>You will be redirected</p>
                            </Modal>
                            <Modal
                                name='error'
                                isOpen={isOpenModalError}
                                closeModal={closeModalError}
                            >
                                <h3 className='modalErrorH3'>
                                    An error occurred while creating the
                                    advertisement.
                                </h3>
                                <Button
                                    className='noDeleteButton'
                                    variant='primary'
                                    onClick={closeModalError}
                                >
                                    Please try again.
                                </Button>
                            </Modal>
                            <div className='newAdvTittle'>
                                <h1>
                                    Do you want to buy somthing?
                                    <br />
                                    To sell something, maybe?
                                </h1>
                            </div>
                            <div className='createAddForm'>
                                <form
                                    id='createAddForm'
                                    onSubmit={handleSubmit}
                                    encType='multipart/form-data'
                                >
                                    <label htmlFor='addName' className='tittle'>
                                        Name:
                                    </label>
                                    <input
                                        type='text'
                                        id='addName'
                                        name='addName'
                                        size='25'
                                        value={name}
                                        onChange={handleChangeName}
                                        required
                                    />
                                    <br />
                                    <label
                                        htmlFor='addPhoto'
                                        className='tittle'
                                    >
                                        Photo:
                                    </label>
                                    <input
                                        content-type='multipart/form-data'
                                        type='file'
                                        id='addPhoto'
                                        name='addPhoto'
                                        onChange={(event) =>
                                            handleChangePhoto(
                                                event.target.files[0]
                                            )
                                        }
                                    />
                                    <br />
                                    <div className='tags'>
                                        <label
                                            htmlFor='addTag'
                                            className='labels'
                                        >
                                            Available tags:
                                        </label>
                                        <select
                                            id='selectedTags'
                                            multiple
                                            size={5}
                                            onChange={handleChangeTags}
                                        >
                                            <option value=''>
                                                Select tags:
                                            </option>
                                            {tagsList.map((tag, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={tag}
                                                    >
                                                        {tag}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        <br />
                                        <small>
                                            ~ Keep control to select more than
                                            one Tag ~
                                        </small>
                                    </div>

                                    <label
                                        htmlFor='addSelect'
                                        className='tittle'
                                    >
                                        This article is :
                                    </label>
                                    <select
                                        name='addSelect'
                                        id='addSelect'
                                        onChange={handleChangeSale}
                                        required
                                    >
                                        <option value={true}>FOR SALE</option>
                                        <option value={false}>
                                            FOR PURCHASE
                                        </option>
                                    </select>
                                    <label
                                        htmlFor='addPrice'
                                        className='tittle'
                                    >
                                        by:
                                    </label>
                                    <br />
                                    <h2 className='productData'>
                                        <input
                                            className='inputPrice'
                                            type='number'
                                            id='addPrice'
                                            name='addPrice'
                                            minLength='1'
                                            size='5'
                                            placeholder='Price'
                                            onChange={handleChangePrice}
                                            value={price}
                                            required
                                        />{' '}
                                        €
                                    </h2>
                                    <div className='buttonsArea'>
                                        <Button
                                            type='submit'
                                            id='submit'
                                            variant='primary'
                                            className='noDeleteButton'
                                            onClick={handleSubmit}
                                            disabled={isDisabled}
                                        >
                                            Create Advert
                                        </Button>
                                        <Button
                                            type='reset'
                                            id='resetButton'
                                            variant='primary'
                                            className='noDeleteButton'
                                            onClick={handleReset}
                                        >
                                            Reset info
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </>
                    )}
                </>
            ) : (
                navigate('/login')
            )}
        </>
    );
};

export default NewAdvertPage;
