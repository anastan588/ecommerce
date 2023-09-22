import React, { SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import classes from './modalWindow.module.css';
import './modalWindowStyles.css'
import { apiRoot } from '../login_page/createClient';
import IntegerStep, { changeStartImage } from './ModalSlider';

export type ImagesType = {
    url: string;
    dimensions: { w: number; h: number };
};

type ModalActiveType = {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    path: string;
};


let indexPlants: number = 0;
let pathToStartImage: string = 'https://img3.procvetok.com/crop/w520h520/5c/ae/5caed97990d7c7b29166cfb030880eae.webp';



export function setStartImageForModalWindow(pathToImage: string, indexProduct: number ) {
    indexPlants = indexProduct;
    pathToStartImage = pathToImage;
    /* setImageCurrent(pathToStartImage); */



    

}

const ModalWindow = ({ active, setActive, path }: ModalActiveType) => {

    let startValueModal: number = 25;

    const state = useState<ImagesType[]>([]);
    const arrayImage: ImagesType[] = state[0];
    const setState = state[1];

    function addImage(i: number) {
        const imageObj: ImagesType = arrayImage[i];
        if (imageObj) return imageObj.url;
        return 'https://img3.procvetok.com/crop/w520h520/5c/ae/5caed97990d7c7b29166cfb030880eae.webp';
    }

    const [imageCurrent, setImageCurrent] = useState(pathToStartImage);
    

    function changeImage(i: number): void {

        setImageCurrent(addImage(i));
    }

    useEffect(() => {
        const arr: ImagesType[] = [];
        apiRoot
            .products()
            .get()
            .execute()
            .then(async (body) => {

                const bodyProducts = body.body.results;

                const arrayImgTemp = [];

                for (let i = 0; i < bodyProducts.length; i += 1) {
                    arrayImgTemp.push(bodyProducts[i].masterData.current.masterVariant.images as ImagesType[]);
                }

                setState(arrayImgTemp.flat());
            });
    }, []);

    useEffect(() => {
        
        const temp = arrayImage.map(item => item.url).indexOf(pathToStartImage);
        if (temp !== -1) startValueModal = temp + 1;
        setImageCurrent(pathToStartImage);
        changeStartImage(startValueModal);








    }, [pathToStartImage, active])

    
    function closeModalWindow() {
        setActive(false);
    }

    return (
        <div
            className={active ? [classes.modal, classes.modal_active].join(' ') : classes.modal}
            onClick={closeModalWindow}
        >
            <div className={classes.modal__content} onClick={(e) => e.stopPropagation()}>
                <img src={imageCurrent} className={classes.imageCurrent}></img>
                <IntegerStep countImages={arrayImage.length} imageArray={arrayImage} changeImage={changeImage}  />
                <Button type="primary" onClick={closeModalWindow} className={classes.modalButton}>
                    Close Modal Window
                </Button>
            </div>
        </div>
    );
};

export default ModalWindow;
