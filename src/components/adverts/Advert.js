import React from 'react';
import defaultPhoto from '../../assets/Sin_imagen.jpg';

const Advert = (advs) => {
    const advDate = new Date(advs.createdAt);

    const photos = (photo) => {
        if (photo) {
            return advs.photo;
        } else {
            return defaultPhoto;
        }
    };

    return (
        <>
            <div className='productInfo' id='advertOnly'>
                <div className='productName'>
                    <h1>{advs.name}</h1>
                    <small>Created at: {`${advDate.toUTCString()}`}</small>
                </div>

                <div className='productData'>
                    <p>
                        {' '}
                        Is
                        {advs.sale ? (
                            <span id='isSale'> for sale </span>
                        ) : (
                            <span id='isSale'> purchased </span>
                        )}
                        this product by:
                    </p>
                    <h2>{advs.price} €</h2>
                </div>

                <div className='product-img'>
                    <img
                        className='productPhoto'
                        src={photos(advs.photo)}
                        alt='imagen del producto en venta'
                    ></img>
                </div>

                <div className='typeTag'>
                    <p>
                        Tags:{' '}
                        {advs.tags === undefined
                            ? ''
                            : advs.tags.join(', ').toLocaleUpperCase()}
                    </p>
                </div>
            </div>
        </>
    );
};

export default Advert;
