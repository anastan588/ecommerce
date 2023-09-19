import { LineItem } from '@commercetools/platform-sdk';
import { JsxElement } from 'typescript';
import classes from './DrawProductCard.module.css';

type PropsInterface = {
    product: LineItem;
};

const addProduct = () => {
    console.log('add product');
};

const deleteProduct = () => {
    console.log('product less');
};

const DrawProductCardFromTheBasket = (props: PropsInterface) => {
  /* console.log('in drawProductCard') */
    // name of flowers
    const namePlants = props.product.name.ru;

    // image
    const imagePlantsArr = props.product.variant.images;
    const imageProduct: string = imagePlantsArr ? imagePlantsArr[0].url : './defaultImage.jpg';

    // price of product
    const priceProduct = props.product.price.discounted?.value.centAmount;

    /* console.log(priceProduct); */

    // count in basket
    const countProduct = props.product.quantity;

    // promoCode

    let priceAfterPromoCode: number | undefined;

    /* console.log('in object for promoCode'); */
    const arrTemp = props.product.discountedPricePerQuantity;
    /* console.log(arrTemp);
    console.log(Array.isArray(arrTemp)); */
    if (arrTemp.length > 0) {
        /* console.log(arrTemp[0].discountedPrice.value.centAmount);
        console.log(typeof arrTemp[0].discountedPrice.value.centAmount) */
        priceAfterPromoCode = arrTemp[0].discountedPrice.value.centAmount;
    }



    return (
        <div className={classes.myCard}>
            <div>
                <img src={imageProduct} alt="image" className={classes.imageCard} />
            </div>
            <div>
                <p className={classes.cardTitle}>{namePlants}</p>
                <p className={classes.cardContent}>Количество: {countProduct}</p>
                <p className={classes.cardPrice}> Цена за штуку:</p>
                <div className={classes.priceContainer}>
                    <p className={priceAfterPromoCode ? [classes.oldPrice].join(' ') : [classes.cardPrice].join(' ')}> {priceProduct}</p>
                    <p className={priceAfterPromoCode ? [classes.pricePromoCode].join(' ') : [classes.displayNone].join(' ')}> {priceAfterPromoCode}</p>
                    <p className={classes.cardPrice}>EUR</p>
                </div>
                

                <button className={classes.cardButton} onClick={() => addProduct()}>
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
