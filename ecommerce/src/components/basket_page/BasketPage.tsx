import React, { useEffect, useState } from 'react';
import { LineItem, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { apiRootAnonimusClientCastomer } from '../catalog_page/ClientsBuilderCastomer';
import { getLocalStorage } from '../login_page/BuildClient';
import { getClientWithToken } from '../login_page/createClient';
import RequestProductInBasketFromServer from './RequestProductInBasketFromServer';
import DrawProductCardFromTheBasket from './DrawProductCardFromTheBasket';
import classes from './BasketPage.module.css';


const getProductsFromServer = async (setProductInBasket: React.Dispatch<React.SetStateAction<LineItem[]>>) => {
    const {token} = getLocalStorage();
    const mapToken = getLocalStorage();
    const arrayProductInBasket = await RequestProductInBasketFromServer(mapToken.refreshToken);
    console.log('arrayProductInBasket')
    console.log(arrayProductInBasket);

    if(arrayProductInBasket) setProductInBasket(arrayProductInBasket);


/*     arrayProductInBasket?.forEach((item) => {
        const newArrayWithProductsFromBasket = [...productsArrayInBasket, item];
        setProductInBasket(newArrayWithProductsFromBasket)

    }) */
}


const BasketPage = () => {
    console.log('start Basket');
    const [productsArrayInBasket, setProductInBasket] = useState<LineItem[]>([]);

    useEffect(() => {
        getProductsFromServer(setProductInBasket);
        /* productsArrayInBasket.forEach(product => DrawProductCardFromTheBasket(product)); */
    }, [])

    console.log('productArrayInBasket');
    console.log(productsArrayInBasket);






/*     console.log('token');
    
    console.log(token)
    const obj = getCartsAuth(token);
    console.log('obj');
    console.log(obj); */









    return (
        <div>
            <h2>Basket page1111</h2>
            <div>Поле для промокода</div>
            <div>Очистить корзину</div>

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

            <div>Итого стоимость</div>










            
        </div>
    )
};

export default BasketPage;


