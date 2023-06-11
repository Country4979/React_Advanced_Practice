import '../shared/loading.css';
import '../shared/spinner.css';
import './AdvertsPage.css';
import { useEffect, useState } from 'react';
import Button from '../shared/Button';
import { Link, useNavigate } from 'react-router-dom';
import Advert from './Advert';
import { UseModal } from '../modals/UseModal';
import Modal from '../modals/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getAdverts } from '../../redux/selectors';
import { advertsLoaded } from '../../redux/actions';

const EmptyList = ({ dataFiltered }) => {
    return dataFiltered ? (
        <div style={{ textAlign: 'center' }}>
            <p>Sorry, no adverts yet.</p>
            <Button as={Link} to='/adverts/new'>
                Be the first to publish one...
            </Button>
        </div>
    ) : (
        <div style={{ textAlign: 'center' }}>
            <p>Sorry, your search returned no results</p>
            <Button as={Link} to='/'>
                Go Back...
            </Button>
        </div>
    );
};

const AdvertsPage = ({ isLoading }) => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const adverts = useSelector(getAdverts);

    const onAdvertsLoaded = (adverts) => dispatch(advertsLoaded(adverts));

    const [query, setQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState({
        lifestyle: false,
        motor: false,
        mobile: false,
        work: false,
    });
    const [dataFiltered, setDataFiltered] = useState([]);
    const [querySale, setQuerySale] = useState('');
    const [maxPrice, setQueryMaxPrice] = useState(Infinity);
    const [minPrice, setQueryMinPrice] = useState(-Infinity);

    const [isOpenModalError, openModalError, closeModalError] = UseModal(false);
    const [isOpenModalErrorLogin, openModalErrorLogin, closeModalErrorLogin] =
        UseModal(false);

    /*FILTER BY SALE --> NO FUNCIONA */
    const handleChangeSale = (event) => {
        setQuerySale(event.target.value);
        console.log(event.target.value);
    };

    let filteredAdverts = adverts.filter((advert) =>
        advert.name.toUpperCase().startsWith(query.toLocaleUpperCase())
    );

    /*FILTER BY PRICE*/
    if ((minPrice || maxPrice) && Number(minPrice) < Number(maxPrice)) {
        filteredAdverts = filteredAdverts.filter(
            (advert) => advert.price >= minPrice && advert.price <= maxPrice
        );
    }
    /* -- */
    /*FILTER BY SALE --> NO FUNCIONA */
    /*.filter( advert => {
            if (querySale === "") {
                return true;
            }
            return advert.sale ? querySale === "true" : querySale === "false";
        })*/

    useEffect(() => {
        dispatch(advertsLoaded())
            .then((adverts) => {
                filteredAdverts === 0
                    ? setDataFiltered(true)
                    : setDataFiltered(false);
                onAdvertsLoaded(adverts);
            })
            .catch((error) => {
                if (error.status === 401) {
                    openModalErrorLogin();
                    setTimeout(() => navigate('/login'), 500);
                } else {
                    openModalError();
                }
            });
    }, [dispatch, filteredAdverts, navigate, onAdvertsLoaded, openModalError, openModalErrorLogin]);

    return (
        <>
            <Modal
                name='errorLogin'
                isOpen={isOpenModalErrorLogin}
                closeModal={closeModalErrorLogin}
            >
                <h2 className='modalH2'>You must be logged in to create ads</h2>
                <p className='small'>You will be redirected</p>
            </Modal>
            <Modal
                name='error'
                isOpen={isOpenModalError}
                closeModal={closeModalError}
            >
                <h3 className='modalErrorH3'>
                    An error occurred loading advertisements.
                </h3>
                <Button
                    className='noDeleteButton'
                    variant='primary'
                    onClick={closeModalError}
                >
                    Please try again later...
                </Button>
            </Modal>
            <div className='container'>
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
                    <div>
                        <div className='filterArea'>
                            <div>
                                <h1>Searching Area</h1>
                            </div>
                            {/*FILTER BY NAME*/}
                            <div className='filters'>
                                <label htmlFor='filterByName'>
                                    By name: {''}
                                </label>
                                <input
                                    name='filterByName'
                                    type='text'
                                    style={{ borderWidth: 1 }}
                                    value={query}
                                    onChange={(event) =>
                                        setQuery(event.target.value)
                                    }
                                />
                            </div>

                            {/*FILTER BY TAGS
                            <div className='filters'>
                                <label htmlFor='filterByTag'>Tags : {''}</label>
                                <input
                                    type='checkbox'
                                    id='lifestyle'
                                    name='tags'
                                    value='lifestyle'
                                />
                                <label htmlFor='lifestyle'>Lifestyle</label>
                                <input
                                    type='checkbox'
                                    id='motor'
                                    name='tags'
                                    value='motor'
                                />
                                <label htmlFor='motor'>Motor</label>
                                <input
                                    type='checkbox'
                                    id='mobile'
                                    name='tags'
                                    value='mobile'
                                />
                                <label htmlFor='mobile'>Mobile</label>
                                <input
                                    type='checkbox'
                                    id='work'
                                    name='tags'
                                    value='work'
                                />
                                <label htmlFor='work'>Work</label>
                                </div>*/}

                            {/*FILTER BY SALE
                            <div className='filters'>
                                <label htmlFor='filterBySale'>For Sale?</label>
                                <select
                                    name='filterBySale'
                                    value='selected'
                                    onChange={handleChangeSale}
                                >
                                    <option value=''>select</option>
                                    <option value={true}>Sale</option>
                                    <option value={false}>Buying</option>
                                    <option value={null}>All</option>
                                </select>
                            </div>*/}

                            {/*FILTER BY PRICE*/}
                            <div className='filters'>
                                <label htmlFor='filterByPrice'>
                                    By price: {''}
                                </label>
                                <input
                                    name='minPrice'
                                    type='number'
                                    placeholder='Min'
                                    value={minPrice}
                                    onChange={(event) =>
                                        setQueryMinPrice(event.target.value)
                                    }
                                    className='numberInputs'
                                />
                                <input
                                    name='maxPrice'
                                    type='number'
                                    placeholder='Max'
                                    value={maxPrice}
                                    onChange={(event) =>
                                        setQueryMaxPrice(event.target.value)
                                    }
                                    className='numberInputs'
                                />
                            </div>
                        </div>
                        {!!adverts.length && filteredAdverts.length ? (
                            <>
                                <div className='listContainer'>
                                    <div className='contaienrTittle'>
                                        <h1>ADVERTISEMENTS AVIABLE</h1>
                                    </div>
                                    <ul>
                                        {filteredAdverts
                                            .sort(
                                                (a, b) =>
                                                    a.createdAt > b.createdAt
                                            )
                                            .map((advert) => (
                                                <li key={advert.id}>
                                                    <Link
                                                        to={`/adverts/${advert.id}`}
                                                    >
                                                        {<Advert {...advert} />}
                                                    </Link>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <EmptyList dataFiltered={dataFiltered} />
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default AdvertsPage;
