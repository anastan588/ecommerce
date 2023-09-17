import React, { useContext, useEffect, useState } from 'react';
import { LineItem, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import BackGround from '../../images/backgrounds/background3.jpg';
import { apiRootAnonimusClientCastomer } from '../catalog_page/ClientsBuilderCastomer';
import { getLocalStorage } from '../login_page/BuildClient';
import { getClientWithToken } from '../login_page/createClient';
import RequestProductInBasketFromServer from './RequestProductInBasketFromServer';
import DrawProductCardFromTheBasket from './DrawProductCardFromTheBasket';
import classes from './BasketPage.module.css';
import { Context } from '../..';
import { getCartsAnonimus } from '../catalog_page/requests';


const getProductsFromServerForAnonymUser = async (setProductInBasket: React.Dispatch<React.SetStateAction<LineItem[]>>, setCountProduct: React.Dispatch<React.SetStateAction<number>>, setSummaryCost: React.Dispatch<React.SetStateAction<number>>) => {
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
            const count = arr.reduce((acc, item) => acc + item.quantity, 0);
            setCountProduct(count);

            let costSummary: number = 0;
            arr.map((item) => {
                const price: number = item.price.discounted?.value.centAmount || 1;
                const countFlower: number = item.quantity;
                const sum = price * countFlower;
                costSummary += sum;
                return 1;
            })

            setSummaryCost(costSummary);
            






        })
        .catch((e) => console.log(e));
}

const getProductsFromServer = async (setProductInBasket: React.Dispatch<React.SetStateAction<LineItem[]>>) => {
    const { token } = getLocalStorage();
    const mapToken = getLocalStorage();
    const arrayProductInBasket = await RequestProductInBasketFromServer(mapToken.refreshToken);
    console.log('arrayProductInBasket');
    console.log(arrayProductInBasket);

    if (arrayProductInBasket) setProductInBasket(arrayProductInBasket);


};


const clearBasketOnServer = async () => {
    console.log('clear Basket on server');

}

const defineCostOfAllFlowers = async (setSummaryCost: React.Dispatch<React.SetStateAction<number>>, setCountProduct: React.Dispatch<React.SetStateAction<number>>) => {
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

const BasketPage = () => {
    const { store, cart } = useContext(Context);
    console.log('start Basket');
    const [productsArrayInBasket, setProductInBasket] = useState<LineItem[]>([]);
    const [summaryCost, setSummaryCost] = useState(0);
    const [countOfProduct, setCountProduct] = useState(0)

    useEffect(() => {
        if (store.isAuth) {
            getProductsFromServer(setProductInBasket);
            /* productsArrayInBasket.forEach(product => DrawProductCardFromTheBasket(product)); */
            defineCostOfAllFlowers(setSummaryCost, setCountProduct);
        } else {
            console.log('unauthorizated1111');
            getProductsFromServerForAnonymUser(setProductInBasket, setCountProduct, setSummaryCost);
        }


    }, [])
    console.log('productArrayInBasket');
    console.log(productsArrayInBasket);

    return (
        <div>
            <img
                src={BackGround}
                alt="mainPage"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
            />

            <div className="page_title main"
                style={{
                    position: 'relative',
                    zIndex: 1,
                }}>
                <div className={classes.basketTitleBlock}>
                    <div>Поле для промокода</div>
                    <div onClick={() => clearBasket()} className={classes.clearBasketBtn}>Очистить корзину</div>
                </div>

                <div className={classes.basketContainer}>
                    {
                        productsArrayInBasket.map((product: LineItem) => {
                            return (
                                <div>
                                    <DrawProductCardFromTheBasket product={product} />
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <div className={classes.totalPrice}>Всего товаров: {countOfProduct}</div>
                    <div className={classes.totalPrice}>Итого стоимость: {summaryCost} EUR</div>
                </div>
            </div>
        </div>
    )

};

export default BasketPage;
