import { LineItem } from "@commercetools/platform-sdk";
import { JsxElement } from "typescript";


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

      <div>
          <div>
              <img src={imageProduct} alt="image" />
          </div>
          <div>
              <p>{namePlants}</p>
              <p>{priceProduct} EUR</p>
              <p>Count: {countProduct}</p>
              <button onClick={() => addProduct()}>Add product</button>
              <button onClick={() => deleteProduct()}>Delete Product</button>
          </div> 
      </div>
  )

}

export default DrawProductCardFromTheBasket;