import React, { useState, useEffect, Fragment, useContext } from 'react';
import axios from 'axios';
import { isTemplateMiddle } from 'typescript';

import { Avatar, Card, Carousel, Col, Row } from 'antd';
import { observer } from 'mobx-react-lite';
import { apiRoot } from '../login_page/createClient';
import classes from './productPage.module.css';
import './productStyles.css';
import ModalWindow, { setStartImageForModalWindow } from '../modal_window/ModalWindow';
import ButtonProduct from './Button_product';
import { CategoryType, Obj } from '../catalog_page/productsStore';
import { Context } from '../..';
import BackGround from '../../images/backgrounds/background3.jpg';

const { Meta } = Card;

const contentStyle: React.CSSProperties = {
    /* margin: 0, */
    /* height: '160px', */
    /* color: '#fff', */
    /* lineHeight: '160px', */
    /* textAlign: 'center', */
    /* background: '#364d79' */
};

const onChange = (currentSlide: number) => {
    /* console.log(currentSlide); */
};

type ImagesType = {
    url: string;
    dimensions: { w: number; h: number };
};

type AttributesPlants = { name: string; value: string };

type ValuePlantsType = { centAmount: number; currencyCode: string; fractionDigits: number; type: string };

type PricePlantsObj = { id: string; value: ValuePlantsType; discounted: { value: ValuePlantsType } };

type MasterVariantType = {
    images: ImagesType[];
    attributes: AttributesPlants[];
    prices: PricePlantsObj[];
};

type MasterDataCurrent = {
    categories?: CategoryType[];
    masterVariant: MasterVariantType;
    name: { 'en-US': string; ru: string };
    description: { 'en-US': string; ru: string };
};

type MasterDataType = {
    current: MasterDataCurrent;
};

type ProductType = {
    id?: string;
    key?: string;
    masterData?: MasterDataType;
};

type AttributesAllObj = {
    [key: string]: string;
};

let idPlants: string = '37e040f3-3e80-4197-b3fc-64afbbc2dc35';
let indexPlants: number = 0;

export function updateID(id: string) {
    /*     console.log('idPlants');
    console.log(idPlants); */
    idPlants = id;
    /* console.log(idPlants); */
}

const ProductPage: React.FC = observer(() => {
    const products = useContext(Context);
    const objItem: Obj = products.products.getProductItem()[0];
    console.log(objItem);
    const state = useState({});
    const product: ProductType = state[0];
    const setProduct = state[1];
    const attributesObj: AttributesAllObj = {
        'country-of-origin': 'Страна происхождения',
        Group: 'Группа',
        Flavor: 'Аромат',
        'Landscape-use': 'Использование в ландшафте',
        'growing-area': 'Место выращивания',
        'type-of-packing': 'Вид упаковки',
        'flower-color': 'Окрас цветка',
        'light-requirements': 'Требования к освещению',
        'flowering-period': 'Период цветения',
        Height: 'Высота',
        'fetal-weight': 'Вес плодов',
        form: 'Форма',
        'fruit-color': 'Цвет плодов',
        group: 'Группа',
        'growth-patterns': 'Характер роста',
        height: 'Высота',
        pulp: 'Мякоть',
        'ripening-rate': 'Скорость созревания',
        'type-of-pollination': 'Тип опыления',
    };

    useEffect(() => {
        apiRoot
            .products()
            .get()
            .execute()
            .then((body) => {
                /* console.log('body.body.results')
                console.log(body.body.results); */

                const productCard = body.body.results.filter((item, index) => {
                    if (item.id === idPlants) {
                        indexPlants = index;
                        return item;
                    }
                    return false;
                });
                /* console.log('control')
                console.log(productCard[0]);
                console.log(body.body.results[0]); */

                setProduct(productCard[0]);

                /* setProduct(body.body.results[0]); */
            });
    }, []);

    const pathImage = product.masterData?.current.masterVariant.images[0].url;
    const titlePlants = product.masterData?.current.name.ru;

    const descriptionPlants = product.masterData?.current.description.ru;
    const attributesPlants = product.masterData?.current.masterVariant.attributes as AttributesPlants[];
    const pathImage0 = product.masterData?.current.masterVariant.images[0].url;
    const pathImage1 = product.masterData?.current.masterVariant.images[1].url;
    const pathImage2 = product.masterData?.current.masterVariant.images[2].url;
    const pathImage3 = product.masterData?.current.masterVariant.images[3].url;

    const pricePlants: number = product.masterData?.current.masterVariant.prices[0].value.centAmount || 99;
    const discountPrice: number | undefined =
        product.masterData?.current.masterVariant.prices[0].discounted.value.centAmount || undefined;

    const [modalActive, setModalActive] = useState(false);

    let pathImageCurrent: string = pathImage0 || '';

    function openModal(path: string | undefined) {
        if (path) setStartImageForModalWindow(path, indexPlants);
        setModalActive(true);
        if (path) pathImageCurrent = path;
    }
    /* const objItem = () => {
        if(product.masterData && product.masterData?.current.categories?.[0]) {
        return {
            id: idPlants,
            name: titlePlants,
            categoriesId: product.masterData?.current.categories?.[0].id,
            attributes: product.masterData?.current.masterVariant.attributes,
            description: product.masterData?.current.description,
            images: product.masterData?.current.masterVariant.images,
            prices: product.masterData?.current.masterVariant.prices,
            };
        } return undefined;
    }; */
    return (
        <div>
            <img
                src={BackGround}
                alt="mainPage"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
            />
            <ModalWindow active={modalActive} setActive={setModalActive} path={pathImageCurrent} />
            <Row className={classes.productBlock}>
                <Col className={classes.cardBlock}>
                    <Card
                        className={classes.cardElement}
                        cover={
                            <Carousel afterChange={onChange}>
                                <div onClick={() => openModal(pathImage0)}>
                                    <h3 style={contentStyle}>
                                        <img className={classes.imageProduct} alt="example" src={pathImage0} />
                                    </h3>
                                </div>
                                <div onClick={() => openModal(pathImage1)}>
                                    <h3 style={contentStyle}>
                                        <img className={classes.imageProduct} alt="example" src={pathImage1} />
                                    </h3>
                                </div>
                                <div onClick={() => openModal(pathImage2)}>
                                    <h3 style={contentStyle}>
                                        <img className={classes.imageProduct} alt="example" src={pathImage2} />
                                    </h3>
                                </div>
                                <div onClick={() => openModal(pathImage3)}>
                                    <h3 style={contentStyle}>
                                        <img className={classes.imageProduct} alt="example" src={pathImage3} />
                                    </h3>
                                </div>
                            </Carousel>
                        }
                    ></Card>

                    <Card className={classes.cardElement}>
                        <Meta title={titlePlants} description={descriptionPlants} className={classes.titlePlants} />
                        <div>
                            <h2 className={classes.subtitlePlants}>Краткие характеристики</h2>
                            <ul>
                                {attributesPlants?.map((item) => {
                                    const { name, value } = item;
                                    return (
                                        <li>
                                            <span className={classes.parameterPlants}>{attributesObj[name]}:</span>{' '}
                                            <span className={classes.parameter}>{value}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className={classes.priceBlock}>
                                <p className={classes.parameterPlants}>Цена: </p>
                                <p className={discountPrice ? classes.discountClass : undefined}>{pricePlants}</p>
                                <p
                                    className={`${classes.discountPrice_hide} ${
                                        discountPrice ? classes.discountPrice : undefined
                                    }`}
                                >
                                    {discountPrice}
                                </p>
                                <p className={classes.parameterPlants}>EUR</p>
                            </div>
                        </div>
                        <ButtonProduct key={objItem.id} item={objItem} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
});

export default ProductPage;
