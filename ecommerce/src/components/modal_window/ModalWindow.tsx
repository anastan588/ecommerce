import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import classes from './modalWindow.module.css';
import { apiRoot } from '../login_page/createClient';
import IntegerStep from './ModalSlider';


export type ImagesType = {
    url: string;
    dimensions: { w: number; h: number };
};

const ModalWindow = () => {
    console.log('open modal window from');

    const state = useState<ImagesType[]>([]);
    const arrayImage: ImagesType[] = state[0];
    const setState = state[1];

    function addImage(i: number) {
        const imageObj: ImagesType = arrayImage[i];
        if (imageObj) return imageObj.url;
        return 'https://img3.procvetok.com/crop/w520h520/5c/ae/5caed97990d7c7b29166cfb030880eae.webp';
    }


    const [imageCurrent, setImageCurrent] = useState(addImage(3))



    function changeImage(i: number): void {
        console.log('changeImage');
        console.log(i);

        setImageCurrent(addImage(i))








    }

    useEffect(() => {
        const arr: ImagesType[] = [];
        apiRoot
            .products()
            .get()
            .execute()
            .then(async (body) => {
                console.log('modal');
                console.log(body.body.results);

                const bodyProducts = body.body.results;

                const arrayImgTemp = [];

                for (let i = 0; i < bodyProducts.length; i += 1) {
                    console.log(bodyProducts[i].masterData.current.masterVariant.images);
                    arrayImgTemp.push(bodyProducts[i].masterData.current.masterVariant.images as ImagesType[]);
                }

                console.log(arrayImgTemp.flat());
                setState(arrayImgTemp.flat());
                console.log(arrayImage);
            });
    }, []);

    console.log('add image');
    addImage(4);

    function closeModalWindow() {
        console.log('close modal window');
    }

    return (
        <div className={[classes.modal, classes.modal_active].join(' ')} onClick={closeModalWindow}>
            <div className={classes.modal__content} onClick={e => e.stopPropagation}>
                <img src={imageCurrent}></img>
                <IntegerStep countImages={arrayImage.length} imageArray={arrayImage} changeImage={changeImage} />
                <Button type="primary" onClick={closeModalWindow}>Primary Button</Button>
            </div>
        </div>
    );
};

export default ModalWindow;
