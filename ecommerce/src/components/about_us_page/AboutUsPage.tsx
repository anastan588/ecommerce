import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { isTemplateMiddle } from 'typescript';

import { Avatar, Card, Carousel, Col, Row } from 'antd';
import { apiRoot } from '../login_page/createClient';
import classes from './productPage.module.css';

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
    console.log(currentSlide);
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

type AttributesObjType = {
    string: string;
};

function openModalWindow() {
    console.log('open modal window');
}

const AboutUsPage = () => {
    const state = useState({});
    const product: ProductType = state[0];
    const setProduct = state[1];

    type AttributesAllObj = {
        [key: string]: string;
    };

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
        Height: 'Вфсота',
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
                /* console.log(body.body.results); */
                setProduct(body.body.results[0]);
            });
    }, []);

    /* getProducts().then((body) => {
        console.log(body);
    }); */

    /* const getProducts = () => {
        return apiRoot.products().get().execute();
    };
    
    getProducts().then((body) => {
        console.log(body);
    }); */

    /* console.log('product-id');
    console.log(product.id);
    console.log(product.key); */

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

    /* console.log(discountPrice); */

    return (
        <div>
            <Row>
                <Col onClick={openModalWindow}>
                    <Card
                        style={{ width: 520 }}
                        cover={
                            <Carousel afterChange={onChange}>
                                <div>
                                    <h3 style={contentStyle}>
                                        <img alt="example" src={pathImage0} />
                                    </h3>
                                </div>
                                <div>
                                    <h3 style={contentStyle}>
                                        <img alt="example" src={pathImage1} />
                                    </h3>
                                </div>
                                <div>
                                    <h3 style={contentStyle}>
                                        <img alt="example" src={pathImage2} />
                                    </h3>
                                </div>
                                <div>
                                    <h3 style={contentStyle}>
                                        <img alt="example" src={pathImage3} />
                                    </h3>
                                </div>
                            </Carousel>
                        }
                    ></Card>
                </Col>

                <Col>
                    <Card style={{ width: 520 }}>
                        <Meta title={titlePlants} description={descriptionPlants} />
                        <div>
                            <h2>Краткие характеристики</h2>
                            <ul>
                                {attributesPlants?.map((item) => {
                                    const { name, value } = item;
                                    return (
                                        <li>
                                            {attributesObj[name]}: {value}
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className={classes.priceBlock}>
                                <p>Цена</p>
                                <p className={discountPrice ? classes.discountClass : undefined}>{pricePlants / 100}</p>
                                <p
                                    className={`${classes.discountPrice_hide} ${
                                        discountPrice ? classes.discountPrice : undefined
                                    }`}
                                >
                                    {discountPrice ? discountPrice / 100 : ''}
                                </p>
                                <p>EUR</p>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AboutUsPage;

/* const AboutUsPage1 = () => {
    return <h2 className="page_title main">About us page</h2>;
}; */
