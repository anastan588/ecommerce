import { LineItem } from '@commercetools/platform-sdk';
import { Button } from 'antd';
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
    removeItemAnonim,
    removeItemCastomer,
    removeProductItemAnonim,
    removeProductItemCastomer,
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

    // count in basket
    const countProduct1 = props.product.quantity;

    // promoCode

    let priceAfterPromoCode: number | undefined;

    const arrTemp = props.product.discountedPricePerQuantity;
    if (arrTemp.length > 0) {
        priceAfterPromoCode = arrTemp[0].discountedPrice.value.centAmount;
    }

    // count in basket
    // let countProduct = props.product.quantity;
    let countProduct = quantity;
    const handleEvent = async () => {
        if (store.isAuth) {
            const tokenStore = getLocalStorage();
            const { refreshToken } = tokenStore;
            // const getCartsCastomer = await getCartsAuth(refreshToken);
            const quant = await changeProductAuth(refreshToken, props.product.id, countProduct);
            if(quant) {cart.setProducts(quant)}
            const quantTotal = await getQuantityAuth(refreshToken);
            if (quantTotal) cart.setQuantity(quantTotal);
        } else {
            const quant = await changeProductAnonim(props.product.id, countProduct);
            if(quant) {cart.setProducts(quant)}
            const quantTotal = await getQuantityAnonimus();
            if (quantTotal) cart.setQuantity(quantTotal);
        }
    };

    const addProduct = () => {
        countProduct += 1;
        setQuantity(countProduct);
        handleEvent();
    };

    const deleteProduct = () => {
        if (countProduct > 0) {
            countProduct -= 1;
            setQuantity(countProduct);
            handleEvent();
        }
    };

    const deleteItem = async () => {
        if (store.isAuth) {
            const tokenStore = getLocalStorage();
            const { refreshToken } = tokenStore;
            // const getCartsCastomer = await getCartsAuth(refreshToken);
            const itemProduct = await removeItemCastomer(refreshToken, props.product.id);
            if (itemProduct) {
                cart.setProducts(itemProduct);
                const arr = itemProduct.slice(0);
                const lengthArr = arr.map((item) => item.quantity);
                const length = lengthArr.reduce((acc, item) => {
                    return acc + item;
                }, 0);
                cart.setQuantity(length);
            }
        } else {
            const itemProduct = await removeItemAnonim(props.product.id);
            if (itemProduct) {
                cart.setProducts(itemProduct);
                const arr = itemProduct.slice(0);
                const lengthArr = arr.map((item) => item.quantity);
                const length = lengthArr.reduce((acc, item) => {
                    return acc + item;
                }, 0);
                cart.setQuantity(length);
            }
        }
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


                <div className={classes.priceContainer}>
                    <p className={priceAfterPromoCode ? [classes.oldPrice].join(' ') : [classes.cardPrice].join(' ')}>
                        {priceProduct}
                    </p>
                    <p
                        className={
                            priceAfterPromoCode ? [classes.pricePromoCode].join(' ') : [classes.displayNone].join(' ')
                        }
                    >
                        {priceAfterPromoCode}
                    </p>
                    <p className={classes.cardPrice}>EUR</p>
                </div>

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
                <Button style={{}} type="primary" onClick={deleteItem}>
                    Удалить товар
                </Button>
            </div>
        </div>
    );
};

export default DrawProductCardFromTheBasket;
