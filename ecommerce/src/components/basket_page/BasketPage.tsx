import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { LineItem, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import BackGround from '../../images/backgrounds/background3.jpg';
import { apiRootAnonimusClientCastomer } from '../catalog_page/ClientsBuilderCastomer';
import { getLocalStorage } from '../login_page/BuildClient';
import { getClientWithToken } from '../login_page/createClient';
import RequestProductInBasketFromServer from './RequestProductInBasketFromServer';
import DrawProductCardFromTheBasket from './DrawProductCardFromTheBasket';
import classes from './BasketPage.module.css';
import { Context } from '../..';

import {
    addCodeAnonim,
    addCodeAuth,
    deleteAnonim,
    deleteAuth,
    getCartsAnonimus,
    removeCodeAnonim,
    removeCodeAuth,
} from '../catalog_page/requests';

const getProductsFromServerForAnonymUser = async (
    setProductInBasket: React.Dispatch<React.SetStateAction<LineItem[]>>,
    setCountProduct: React.Dispatch<React.SetStateAction<number>>,
    setSummaryCost: React.Dispatch<React.SetStateAction<number>>,
    setBasketEmpty: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const getCartsAnonym = await getCartsAnonimus();
    /* console.log('in getProductFromServerForAnonymUser function');
    console.log(getCartsAnonym); */
    const temp = await apiRootAnonimusClientCastomer
        .me()
        .activeCart()
        .get()
        .execute()
        .then((body) => {
            console.log('the get Carts anonymousID from');
            console.log(body.body.lineItems);
            const arr = body.body.lineItems;

            setProductInBasket(arr);
            setBasketEmpty(arr.length === 0);
            const count = arr.reduce((acc, item) => acc + item.quantity, 0);
            setCountProduct(count);

            let costSummary: number = 0;
            arr.map((item) => {
                const price: number = item.price.discounted?.value.centAmount || 1;
                const countFlower: number = item.quantity;
                const sum = price * countFlower;
                costSummary += sum;
                return 1;
            });

            setSummaryCost(costSummary);
        })
        .catch((e) => console.log(e));
};

const getProductsFromServer = async (
    setProductInBasket: React.Dispatch<React.SetStateAction<LineItem[]>>,
    setBasketEmpty: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const { token } = getLocalStorage();
    const mapToken = getLocalStorage();
    const arrayProductInBasket = await RequestProductInBasketFromServer(mapToken.refreshToken);

    console.log('arrayProductInBasket');
    console.log(arrayProductInBasket);

    if (arrayProductInBasket) {
        setProductInBasket(arrayProductInBasket);
        setBasketEmpty(arrayProductInBasket.length === 0);
    }
};

const clearBasketOnServer = async () => {
    console.log('clear Basket on server');
};

const defineCostOfAllFlowers = async (
    setSummaryCost: React.Dispatch<React.SetStateAction<number>>,
    setCountProduct: React.Dispatch<React.SetStateAction<number>>
) => {
    let costSummary: number = 0;
    let countProduct: number = 0;
    const { token } = getLocalStorage();
    const mapToken = getLocalStorage();
    const arrayProductInBasket = await RequestProductInBasketFromServer(mapToken.refreshToken);
    console.log('arrayProductCost');

    

    if (arrayProductInBasket) {
        arrayProductInBasket.map((item) => {

            let price: number | undefined;

            if (item.discountedPricePerQuantity.length > 0) {
                price = item.discountedPricePerQuantity[0].discountedPrice.value.centAmount;
            } else {
                price = item.price.discounted?.value.centAmount || 0
            }
            /* const price: number = item.price.discounted?.value.centAmount || 1; */
            const count: number = item.quantity;
            countProduct += count;
            const sum = price * count;
            costSummary += sum;

            return 1;
        });

        console.log('costSummary')
        console.log(costSummary);

        setSummaryCost(costSummary);
        setCountProduct(countProduct);
    }
};

const clearBasket = async () => {
    clearBasketOnServer();
};

const lineItemsDiscountAnonim = async (code: string) => {
    const arr = await addCodeAnonim(code);
};

const lineItemsDiscountAuth = async (code: string) => {
    const tokenStore = getLocalStorage();
    const { refreshToken } = tokenStore;
    const arr = await addCodeAuth(refreshToken, code);
};

const BasketPage = () => {
    const { store, cart } = useContext(Context);
    /* console.log('start Basket'); */
    const [productsArrayInBasket, setProductInBasket] = useState<LineItem[]>([]);
    const [summaryCost, setSummaryCost] = useState(0);
    const [countOfProduct, setCountProduct] = useState(0);
    const [basketEmpty, setBasketEmpty] = useState(true);
    const [promoCode, setPromoCodeValue] = useState('');
    const [loading, setLoading] = useState(false);
    let quantity = cart.getQuantity();

    useEffect(() => {
        if (store.isAuth) {
            getProductsFromServer(setProductInBasket, setBasketEmpty);
            /* productsArrayInBasket.forEach(product => DrawProductCardFromTheBasket(product)); */
            defineCostOfAllFlowers(setSummaryCost, setCountProduct);
        } else {
            /* console.log('unauthorizated1111'); */
            getProductsFromServerForAnonymUser(setProductInBasket, setCountProduct, setSummaryCost, setBasketEmpty);
           
        }

        quantity = cart.getQuantity();
        console.log(quantity);
    }, [quantity]);
    console.log('productArrayInBasket');
    console.log(productsArrayInBasket);

    const handleEvent = async () => {
        if (store.isAuth) {
            const tokenStore = getLocalStorage();
            const { refreshToken } = tokenStore;
            // const getCartsCastomer = await getCartsAuth(refreshToken);
            const arr = await deleteAuth(refreshToken).finally(() => setLoading(false));
            if (arr) setProductInBasket(arr);
            setProductInBasket([]);
            cart.setQuantity(0);
            cart.setProducts([]);
            setSummaryCost(0);
        } else {
            const arr = await deleteAnonim().finally(() => setLoading(false));
            if (arr) setProductInBasket(arr);
            setProductInBasket([]);
            console.log(productsArrayInBasket);
            cart.setQuantity(0);
            cart.setProducts([]);
            setSummaryCost(0);
        }
    };

    const removePromoCode = async () => {
        const codeId = localStorage.getItem('promoCode');
        if (codeId) {
            if (store.isAuth) {
                const tokenStore = getLocalStorage();
                const { refreshToken } = tokenStore;
                const cartCastomer = await removeCodeAuth(refreshToken, codeId);
                if (cartCastomer) { cart.setProducts(cartCastomer); setProductInBasket(cartCastomer)}
            } else {
                const cartAnonim = await removeCodeAnonim(codeId);
                if (cartAnonim) { cart.setProducts(cartAnonim); setProductInBasket(cartAnonim)}
            }
        }
    };

    return (
        <div>
            <img
                src={BackGround}
                alt="mainPage"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
            />

            <div
                className={basketEmpty ? ['page_title main', classes.displayBlock].join(' ') : classes.displayNone}
                style={{
                    position: 'relative',
                    zIndex: 1,
                }}
            >
               <p>Корзина пуста. Добавить товар можно в странице Каталога<Link to="/catalog"> ЗДЕСЬ</Link></p> 
            </div>

            <div
                className={!basketEmpty ? ['page_title main', classes.displayBlock].join(' ') : classes.displayNone}
                style={{
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <div className={classes.basketTitleBlock}>
                    <div className={classes.promoCodeBlock}>
                        <p>Введи промокод:</p>
                        <input
                            type="text"
                            className={classes.inputPromoCode}
                            value={promoCode}
                            onChange={(event) => {
                                setPromoCodeValue(event.target.value);
                            }}
                        ></input>

                        <Button
                            type="default"
                            onClick={() => {
                                /* console.log(promoCode); */
                                if(!store.isAuth) {
                                    lineItemsDiscountAnonim(promoCode);
                                } else {
                                    lineItemsDiscountAuth(promoCode);
                                    defineCostOfAllFlowers(setSummaryCost, setCountProduct);



                                }
                                
                            }}
                        >
                            Add PromoCode
                        </Button>
                        <Button type="default" onClick={removePromoCode}>
                            Remove PromoCode
                        </Button>
                    </div>
                    <Button type="primary" loading={loading} onClick={handleEvent} className={classes.clearBasketBtn}>
                        Очистить корзину
                    </Button>
                </div>

                <div className={classes.basketContainer}>
                    {productsArrayInBasket.map((product: LineItem) => {
                        return (
                            <div>
                                <DrawProductCardFromTheBasket product={product} />
                            </div>
                        );
                    })}
                </div>
                <div>
                    <div className={classes.totalPrice}>Всего товаров: {cart.getQuantity()}</div>
                    <div className={classes.totalPrice}>Итого стоимость: {summaryCost} EUR</div>
                </div>
            </div>
        </div>
    );
};

export default observer(BasketPage);
