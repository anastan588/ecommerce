import React, {useEffect, useState} from "react";
import axios from "axios";
import classes from './modalWindow.module.css'
import { apiRoot } from '../login_page/createClient';
import IntegerStep from "./ModalSlider";




export type ImagesType = {
  url: string;
  dimensions: { w: number; h: number };
};







const ModalWindow = () => {
  console.log('open modal window from');

  const state = useState<ImagesType[]>([])


  const arrayImage: ImagesType[] = state[0];
  const setState = state[1];

  
    function addImage(i: number) {
      const imageObj: ImagesType = arrayImage[i]
      console.log(arrayImage[i])
      console.log(imageObj.dimensions)
      console.log(imageObj.url)
      return imageObj.url;

    }


    useEffect(() => {
      const arr: ImagesType[] = [];
    apiRoot
        .products()
        .get()
        .execute()
        .then(async (body) => {
            console.log('modal')
            console.log(body.body.results);

            const bodyProducts = body.body.results;

            const arrayImgTemp = [];

            for (let i = 0; i < bodyProducts.length; i+= 1) {
              console.log(bodyProducts[i].masterData.current.masterVariant.images)
              arrayImgTemp.push(bodyProducts[i].masterData.current.masterVariant.images as ImagesType[])
            }

            console.log(arrayImgTemp.flat());
            setState(arrayImgTemp.flat());
            console.log(arrayImage);
        });
  }, []);


  console.log('add image')
  addImage(4);


  return (
    <div className={[classes.modal, classes.modal_active].join(' ')}>
      <div className={classes.modal__content}>
        <img src={addImage(5)}></img>
        <IntegerStep countImages ={arrayImage.length} imageArray={arrayImage} />
      </div>

    </div>
  )




}

export default ModalWindow;