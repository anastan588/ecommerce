import { LineItem } from '@commercetools/platform-sdk';
import { useContext, useEffect, useState } from 'react';
import { JsxElement } from 'typescript';
import { Context } from '../..';
import {
    addProductItemAnonim,
    addProductItemCastomer,
    changeProductAnonim,
    changeProductAuth,
    createAnonimusCart,
    createCartAuth,
    getCartsAnonimus,
    getCartsAuth,
    getQuantityAnonimus,
    getQuantityAuth,
} from '../catalog_page/requests';
import { getLocalStorage } from '../login_page/BuildClient';
import { CartType } from './BasketStore';
import classes from './DrawProductCard.module.css';

type PropsInterface = {
    product: LineItem;
};

/* const addProduct = () => {
    console.log('add product');
}; */

/* const deleteProduct = () => {
    console.log('product less');
}; */


const DrawProductCardFromTheBasket: React.FC<{ product: LineItem }> = (props: PropsInterface) => {
    const { store, cart } = useContext(Context);
    const [quantity, setQuantity] = useState(props.product.quantity);

    // name of flowers
    const namePlants = props.product.name.ru;

    // image
    const imagePlantsArr = props.product.variant.images;
    const imageProduct: string = imagePlantsArr ? imagePlantsArr[0].url : './defaultImage.jpg';

    // price of product
    const priceProduct = props.product.price.discounted?.value.centAmount;

    /* console.log(priceProduct); */

    // count in basket
    // let countProduct = props.product.quantity;
    let countProduct = quantity;
    const handleEvent = async () => {
        if (store.isAuth) {
            const tokenStore = getLocalStorage();
            const { refreshToken } = tokenStore;
            // const getCartsCastomer = await getCartsAuth(refreshToken);
            const quant = await changeProductAuth(refreshToken, props.product.id, countProduct);
            console.log(quant);
            const quantTotal = await getQuantityAuth(refreshToken);
            if (quantTotal) cart.setQuantity(quantTotal);
        } else {
            const quant = await changeProductAnonim(props.product.id, countProduct);
            console.log(quant);
            const quantTotal = await getQuantityAnonimus();
            if (quantTotal) cart.setQuantity(quantTotal);
        }
    };

    console.log(countProduct);
    const addProduct = () => {
        console.log('add product');
        console.log(countProduct);
        countProduct += 1;
        console.log(countProduct);
        setQuantity(countProduct);
        console.log(quantity);
        handleEvent();
    };

    const deleteProduct = () => {
        console.log('product less');
        console.log(countProduct);
        countProduct -= 1;
        console.log(countProduct);
        setQuantity(countProduct);
        console.log(quantity);
        handleEvent();
    };
    /* const changeProductsAnonim = async (idProd: string, q: number) => {
        const quant = await changeProductAnonim(idProd, q);
        return quant;
    } */

    /* const changeProductsAuth = async (token: string, idProd: string, q: number) => {
        const quant = await changeProductAuth(token, idProd, q);
    } */

    return (
        <div className={classes.myCard}>
            <div>
                <img src={imageProduct} alt="image" className={classes.imageCard} />
            </div>
            <div>
                <p className={classes.cardTitle}>{namePlants}</p>

                <p className={classes.cardContent}>Количество: {quantity}</p>
                <p className={classes.cardPrice}> Цена за штуку: {priceProduct} EUR</p>

                <button
                    className={classes.cardButton}
                    onClick={() => {
                        addProduct();
                    }}
                >
                    Добавить
                </button>
                <button className={classes.cardButton} onClick={() => deleteProduct()}>
                    Уменьшить
                </button>
            </div>
        </div>
    );
};

export default DrawProductCardFromTheBasket;
