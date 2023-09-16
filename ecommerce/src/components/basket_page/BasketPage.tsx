import React from 'react';
import { LineItem, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { apiRootAnonimusClientCastomer } from '../catalog_page/ClientsBuilderCastomer';
import { getLocalStorage } from '../login_page/BuildClient';
import { getClientWithToken } from '../login_page/createClient';



const requestProductInBasketFromServer = async (token: string) => {
    console.log('getCartsAuth'); // это я добавил для тестирования
    const client = getClientWithToken(token);
    const apiRootToken = createApiBuilderFromCtpClient(client);
    console.log('token in getCartsAuth');
    console.log(token);
    const answer = await apiRootToken
        .withProjectKey({ projectKey: 'rsschool-final-task-stage2' })
        .me()
        .activeCart()
        .get()
        .execute()
        .then((body) => {
            return body.body.lineItems;
        })
        .catch((e) => {
            console.log(e);
        });
        return answer;

};

const addProduct = () => {
    console.log('add product')
}

const deleteProduct = () => {
    console.log('product less')
}

const drawProductCardInTheBasket = (product: LineItem) => {
    const currentProduct = product.variant;
    console.log(product);
    const {name} = product;

    // name of flowers
    const namePlants = name.ru;

    // image
    const imagePlantsArr = currentProduct.images;
    const imageProduct: string = imagePlantsArr ? imagePlantsArr[0].url : './defaultImage.jpg';

    // price of product
    const priceProduct = product.price.discounted?.value.centAmount;

    console.log(priceProduct);

    // count in basket
    const countProduct = product.quantity;

    return(
        <div>
            <div>
                <img src={imageProduct} alt="image" />
            </div>
            <div>
                <p>{namePlants}</p>
                <p>{priceProduct} EUR</p>
                <p>Count: {countProduct}</p>
                <button onClick={() => addProduct}>Add product</button>
                <button onClick={() => deleteProduct}>Delete Product</button>
            </div> 
        </div>
    )

}


const getProductsFromServer = async () => {
    const {token} = getLocalStorage();
    const mapToken = getLocalStorage();
    const arrayProductInBasket = await requestProductInBasketFromServer(mapToken.refreshToken);
    console.log('arrayProductInBasket')
    console.log(arrayProductInBasket);

    arrayProductInBasket?.forEach((item) => {
        drawProductCardInTheBasket(item);

    })



}


const BasketPage = () => {
    console.log('start Basket');
    getProductsFromServer();




/*     console.log('token');
    
    console.log(token)
    const obj = getCartsAuth(token);
    console.log('obj');
    console.log(obj); */









    return (
        <div>
            <h2>Basket page1111</h2>
        </div>
    )
};

export default BasketPage;
