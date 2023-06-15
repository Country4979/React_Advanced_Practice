import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../shared/Button';
import { UseModal } from '../modals/UseModal';
import Modal from '../modals/Modal';
import './NewAdvertPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLogged, getTags, getUi } from '../../redux/selectors';
import { advertCreate, getTagsListed } from '../../redux/actions';

const NewAdvertPage = () => {
    const isLogged = useSelector(getIsLogged);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector(getUi);

    const [data, setData] = useState({
        name: '',
        sale: true,
        price: '',
        tags: [],
        photo: null,
    });

    const tags = [useSelector(getTags)];
    const [isOpenModalError, openModalError, closeModalError] = UseModal(false);
    const [isOpenModalErrorLogin, openModalErrorLogin, closeModalErrorLogin] =
        UseModal(false);
    const [isOpenModalSuccess, openModalSuccess, closeModalSuccess] =
        UseModal(false);

        const handleChange = (e) => {
            const { name, value, type, files, selectedOptions } = e.target;
            if (type === "file") {
              // Si el input es de tipo file, se guarda el archivo
              setData((prevData) => ({
                ...prevData,
                [name]: files[0], // Se usa el nombre del input (photo) para actualizar el estado
              }));
            } else if (type === "select-multiple") {
              // Si el input es de tipo select-multiple, se guarda un array con los valores seleccionados
              const selectedValues = Array.from(selectedOptions, (option) => option.value);
              setData((prevData) => ({
                ...prevData,
                [name]: selectedValues, // Se usa el nombre del input (tags) para actualizar el estado
              }));
            } else {
              // Si no, se guarda el valor del input
              setData((prevData) => ({
                ...prevData,
                [name]: value, // Se usa el nombre del input (name, sale o price) para actualizar el estado
              }));
            }
          };

    //const [tagsList, setTagsList] = useState([]);

    //const [tags, setTags] = useState([]);

    const handleReset = () => {
        setData({ name: '', price: '', photo: null, tags: [], sale: '' });
    };

    /*const handleChangeTags = (event) => {
        //Adds the selected option to an array
        const selectedTags = Array.from(
            event.target.selectedOptions,
            (option) => option.value
        );

        setData({ ...data, tags: selectedTags });
    };*/

    const handleSubmit = (event) => {
        event.preventDefault();
        //const datas = new FormData();
        try {
            dispatch(advertCreate(data));
            openModalSuccess();
        } catch (error) {
            if (error.status === 401) {
                openModalErrorLogin();
                navigate('/login');
            } else {
                openModalError();
            }
        }
        /*try {

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

            openModalSuccess();

            //    navigate(`/adverts/${advert.id}`);
*/
    };

    const isDisabled =
        isLoading ||
        data.name.length <= 0 ||
        data.price.length <= 0 ||
        data.sale === undefined ||
        !data.tags;

    useEffect(() => {
        dispatch(getTagsListed());
        console.log('tags: ', data.tags);
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
                                        name='name'
                                        size='25'
                                        value={data.name}
                                        onChange={handleChange}
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
                                        name='photo'
                                        onChange={handleChange}
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
                                            name='tags'
                                            type='select-multiple'
                                            multiple
                                            size={5}
                                            onChange={handleChange}
                                        >
                                            <option value=''>
                                                Select tags:
                                            </option>
                                            {tags[0].map((tag, index) => {
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
                                        name='sale'
                                        id='addSelect'
                                        onChange={handleChange}
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
                                            name='price'
                                            minLength='1'
                                            size='5'
                                            placeholder='Price'
                                            onChange={handleChange}
                                            value={data.price}
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
