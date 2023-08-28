import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Avatar, Card } from 'antd';
import { apiRoot } from '../login_page/createClient';

const { Meta } = Card;

type ImagesType = {
    url: string;
    dimensions: { w: number; h: number };
};

type AttributesPlants = { name: string; value: string };

type MasterVariantType = {
    images: ImagesType[];
    attributes: AttributesPlants[];
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

const AboutUsPage = () => {
    const state = useState({});
    const product: ProductType = state[0];
    const setProduct = state[1];

    useEffect(() => {
        apiRoot
            .products()
            .get()
            .execute()
            .then((body) => {
                console.log(body.body.results);
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

    console.log('product-id');
    console.log(product.id);
    console.log(product.key);

    const pathImage = product.masterData?.current.masterVariant.images[0].url;
    const titlePlants = product.masterData?.current.name.ru;
    const descriptionPlants = product.masterData?.current.description.ru;
    const attributesPlants = product.masterData?.current.masterVariant.attributes as AttributesPlants[];

    console.log(attributesPlants);

    console.log(pathImage);

    return (
        <div>
            <h2 className="page_title main">About1234</h2>

            <Card style={{ width: 500 }} cover={<img alt="example" src={pathImage} />}>
                <Meta title={titlePlants} description={descriptionPlants} />




                
            </Card>
        </div>
    );
};

export default AboutUsPage;

/* const AboutUsPage1 = () => {
    return <h2 className="page_title main">About us page</h2>;
}; */
