import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { LineItem, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import BackGround from '../../images/backgrounds/background3.jpg';
import { apiRootAnonimusClientCastomer } from '../catalog_page/ClientsBuilderCastomer';
import { getLocalStorage } from '../login_page/BuildClient';
import { getClientWithToken } from '../login_page/createClient';
import RequestProductInBasketFromServer from './RequestProductInBasketFromServer';
import DrawProductCardFromTheBasket from './DrawProductCardFromTheBasket';
import classes from './BasketPage.module.css';
import { Context } from '../..';

import { addCodeAnonim, addCodeAuth, getCartsAnonimus } from '../catalog_page/requests';

const getProductsFromServerForAnonymUser = async (
    setProductInBasket: React.Dispatch<React.SetStateAction<LineItem[]>>,
    setCountProduct: React.Dispatch<React.SetStateAction<number>>,
    setSummaryCost: React.Dispatch<React.SetStateAction<number>>,
    setBasketEmpty: React.Dispatch<React.SetStateAction<boolean>>
) => {

    const getCartsAnonym = await getCartsAnonimus();
    console.log('in getProductFromServerForAnonymUser function');
    console.log(getCartsAnonym);
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
            const price: number = item.price.discounted?.value.centAmount || 1;
            const count: number = item.quantity;
            countProduct += count;
            const sum = price * count;
            costSummary += sum;

            return 1;
        });

        setSummaryCost(costSummary);
        setCountProduct(countProduct);
    }
};

const clearBasket = async () => {
    clearBasketOnServer();
};

const lineItemsDiscountAnonim = async (code: string, setProductInBasket: React.Dispatch<React.SetStateAction<LineItem[]>>) => {
   apiRootAnonimusClientCastomer
    .me()
    .activeCart()
    .get()
    .execute()
    .then((body) => {
        console.log(body);
        console.log(body.body.anonymousId);
        console.log(code);
        const { id } = body.body;
        const { version } = body.body;
        const arr = () => {
            return (
                apiRootAnonimusClientCastomer
                    .me()
                    .carts()
                    .withId({ ID: id })
                    .post({ body: { version, actions: [{ action: 'addDiscountCode', code }] } })
                    .execute()
                    // eslint-disable-next-line @typescript-eslint/no-shadow
                    .then((body) => {
                        /* console.log(body);
                        console.log(body.body.lineItems); */

                        const arrayProductAfterPromoCode = body.body.lineItems;
                        console.log('arrayAfterPromoCode');

                        setProductInBasket(arrayProductAfterPromoCode);



                        arrayProductAfterPromoCode.map((item) => {
                            console.log(item);
                            console.log(item.discountedPricePerQuantity[0].discountedPrice.value.centAmount)
                            
                            return 1;
                        })








                        return body.body.lineItems;
                    })
                    .catch((e) => {
                        console.log(e);
                    })
            );
        };
        console.log(arr());
        return arr();
    })
    .catch((e) => console.log(e));













}

const lineItemsDiscountAuth = async (token: string, code: string) => {
    const arr = await addCodeAuth(token, code);
}

const lineItemsDiscountAuth1 = async (code: string, setProductInBasket: React.Dispatch<React.SetStateAction<LineItem[]>>) => {
    /* const arr = await addCodeAuth(token, code); */
    const { token, refreshToken } = getLocalStorage();
    const client = getClientWithToken(refreshToken);
    const apiRootToken = createApiBuilderFromCtpClient(client);
    console.log(token);
    const arrTemp = apiRootToken
        .withProjectKey({ projectKey: 'rsschool-final-task-stage2' })
        .me()
        .activeCart()
        .get()
        .execute()
        .then((body) => {
            const cartId = body.body.id;
            const { version } = body.body;
            const arr = () => {
                return (
                    apiRootToken
                        .withProjectKey({ projectKey: 'rsschool-final-task-stage2' })
                        .me()
                        .carts()
                        .withId({ ID: cartId })
                        .post({ body: { version, actions: [{ action: 'addDiscountCode', code }] } })
                        .execute()
                        // eslint-disable-next-line @typescript-eslint/no-shadow
                        .then((body) => {
                            console.log('i am in then of lineItemsDiscountAuth1')
                            const arrayProductAfterPromoCode = body.body.lineItems;
                            console.log('arrayAfterPromoCode');
    
                            setProductInBasket(arrayProductAfterPromoCode);
    
    
    
                            arrayProductAfterPromoCode.map((item) => {
                                console.log(item);
                                console.log(item.discountedPricePerQuantity[0].discountedPrice.value.centAmount)
                                
                                return 1;
                            })





                            return body.body.lineItems;
                        })
                        .catch((e) => {
                            console.log(e);
                        })
                );
            }; console.log(arr());
            return arr();
        })
        .catch((e) => {
            console.log(e);
        });





}

const deleteAnonim = async () => {
    const arr = await deleteAnonim();
}

const deleteAuth = async () => {
    const arr = await deleteAuth();
}

const BasketPage = () => {
    const { store, cart } = useContext(Context);
    console.log('start Basket');
    const [productsArrayInBasket, setProductInBasket] = useState<LineItem[]>([]);
    const [summaryCost, setSummaryCost] = useState(0);
    const [countOfProduct, setCountProduct] = useState(0);
    const [basketEmpty, setBasketEmpty] = useState(true);
    const [promoCode, setPromoCodeValue] = useState('');

    useEffect(() => {
        if (store.isAuth) {
            getProductsFromServer(setProductInBasket, setBasketEmpty);
            /* productsArrayInBasket.forEach(product => DrawProductCardFromTheBasket(product)); */
            defineCostOfAllFlowers(setSummaryCost, setCountProduct);
        } else {
            console.log('unauthorizated1111');
            getProductsFromServerForAnonymUser(setProductInBasket, setCountProduct, setSummaryCost, setBasketEmpty);
        }
    }, []);
    console.log('productArrayInBasket');
    console.log(productsArrayInBasket);

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
                            value={promoCode}
                            onChange={(event) => {
                                setPromoCodeValue(event.target.value);
                            }}
                        ></input>

                        <button
                            onClick={() => {
                                console.log(promoCode);
                                if(!store.isAuth) {
                                    lineItemsDiscountAnonim(promoCode, setProductInBasket);
                                } else {
                                    lineItemsDiscountAuth1(promoCode, setProductInBasket)



                                }
                                
                            }}
                        >
                            Add PromoCode
                        </button>
                    </div>
                    <div onClick={deleteAnonim} className={classes.clearBasketBtn}>
                        Очистить корзину
                    </div>
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
                    <div className={classes.totalPrice}>Всего товаров: {countOfProduct}</div>
                    <div className={classes.totalPrice}>Итого стоимость: {summaryCost} EUR</div>
                </div>
            </div>
        </div>
    );
};

export default BasketPage;
