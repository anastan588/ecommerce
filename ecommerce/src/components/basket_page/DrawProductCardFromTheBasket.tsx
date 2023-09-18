import { LineItem } from '@commercetools/platform-sdk';
import { useState } from 'react';
import { JsxElement } from 'typescript';
import { changeProductAnonim, changeProductAuth } from '../catalog_page/requests';
import classes from './DrawProductCard.module.css';

type PropsInterface = {
    product: LineItem;
};

/* const addProduct = () => {
    console.log('add product');
}; */

const deleteProduct = () => {
    console.log('product less');
};

const DrawProductCardFromTheBasket = (props: PropsInterface) => {
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
    let countProduct = props.product.quantity;
    const addProduct = () => {
        console.log('add product');
        countProduct += 1;
        console.log(countProduct);
        setQuantity(countProduct);
    };

    const changeProductsAnonim = async (idProd: string, q: number) => {
        const quant = await changeProductAnonim(idProd, q);
        return quant;
    }
    
    const changeProductsAuth = async (token: string, idProd: string, q: number) => {
        const quant = await changeProductAuth(token, idProd, q);
    }

    return (
        <div className={classes.myCard}>
            <div>
                <img src={imageProduct} alt="image" className={classes.imageCard} />
            </div>
            <div>
                <p className={classes.cardTitle}>{namePlants}</p>
                <p className={classes.cardContent}>Количество: {quantity}</p>
                <p className={classes.cardPrice}> Цена за штуку: {priceProduct} EUR</p>

                <button className={classes.cardButton} onClick={() => { addProduct(); changeProductsAnonim(props.product.id, quantity)} }>
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
