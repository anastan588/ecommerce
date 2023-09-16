import { LineItem } from "@commercetools/platform-sdk";
import { JsxElement } from "typescript";
import classes from './DrawProductCard.module.css';


type PropsInterface = {
  product: LineItem,
}


const addProduct = () => {
  console.log('add product')
}

const deleteProduct = () => {
  console.log('product less')
}

const DrawProductCardFromTheBasket = (props: PropsInterface) => {

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

  return(

      <div className={classes.myCard}>
          <div>
              <img src={imageProduct} alt="image" className={classes.imageCard} />
          </div>
          <div>
              <p className={classes.cardTitle}>{namePlants}</p>
              <p className={classes.cardContent}>Количество: {countProduct}</p>
              <p className={classes.cardPrice}> Цена за штуку: {priceProduct} EUR</p>
              
              <button className={classes.cardButton} onClick={() => addProduct()}>Добавить</button>
              <button className={classes.cardButton} onClick={() => deleteProduct()}>Уменьшить</button>
          </div> 
      </div>
  )

}

export default DrawProductCardFromTheBasket;