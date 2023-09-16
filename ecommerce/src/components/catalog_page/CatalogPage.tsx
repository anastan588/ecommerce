import { observer } from 'mobx-react-lite';
import React, { Suspense, useContext, useEffect } from 'react';
import { Spin } from 'antd';
import { Context } from '../..';
import Catalog from './Catalog';
import './catalog.css';
// import CategoryBar from './CategoryBar';
import { productsRes, productsType, categories, attributesList, getCartsProduct, getCartsAuth } from './requests';
import TypesBar from './TypesBar';
import { apiRoot } from './ClientBuilderView';
import Sorting from './filter_components/sorting';
import SortingAl from './filter_components/sortingAlfabet';
import FilterBar from './filterBar';
import { AttributeType } from './productsStore';
import SearchCompponent from './filter_components/Searсh';
import { getLocalStorage } from '../login_page/BuildClient';
import BackGround from '../../images/backgrounds/background3.jpg';

const CatalogPage = observer(() => {
    const { products, cart, store } = useContext(Context);
    const tokenStore = getLocalStorage();
    console.log(tokenStore);
    const { refreshToken } = tokenStore;
    useEffect(() => {
        productsType().then(({ body }) => {
            console.log(body);
            const arr = body.results.map((item) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                return { id: item.id, name: item.name };
            });
            products.setTypes(arr);
        });
        productsRes().then(({ body }) => {
            const arr = body.results.map((item) => {
                return {
                    id: item.id,
                    name: item.masterData.current.name,
                    categoriesId: item.masterData.current.categories[0].id,
                    attributes: item.masterData.current.masterVariant.attributes,
                    description: item.masterData.current.description,
                    images: item.masterData.current.masterVariant.images,
                    prices: item.masterData.current.masterVariant.prices,
                };
            });
            console.log(arr);
            products.setProducts(arr);
        });
        categories().then(({ body }) => {
            console.log(body);
            const category = body.results
                .filter((item) => item.parent)
                .map((item) => {
                    return { id: item.id, name: item.name.en };
                });
            console.log(category);
            products.setCategory(category);
        });
        attributesList().then(async ({ body }) => {
            if (body) {
                const attr = body.results[0].masterData.current.masterVariant.attributes?.map((item) => item.name);
                console.log(attr);
                // eslint-disable-next-line @typescript-eslint/no-shadow
                if (attr) {
                    const attrValues = await Promise.all(
                        attr.map(async (item) => {
                            const res = await apiRoot
                                .productProjections()
                                .search()
                                .get({ queryArgs: { filter: `variants.attributes.${item}:exists` } })
                                .execute()
                                // eslint-disable-next-line @typescript-eslint/no-shadow,
                                .then(({ body }): AttributeType | undefined => {
                                    const attributesVal = body.results.map((value) => {
                                        return value.masterVariant.attributes;
                                    });
                                    // console.log(attributesVal);
                                    const valAttr = attributesVal.map((v) => {
                                        return v?.find((i) => i.name === item);
                                    });
                                    if (valAttr) {
                                        const ar: string[] = valAttr.map((i) => i?.value);
                                        // console.log(ar);
                                        const s: Set<string> = new Set();
                                        ar.forEach((i) => s.add(i));
                                        return { name: item, value: Array.from(s) };
                                    }
                                    return undefined;
                                    // eslint-disable-next-line array-callback-return
                                    /* const arr: string[][] | undefined | unknown[] = body.results.map((value) => {
                                        if (value.masterVariant.attributes) {
                                            value.masterVariant.attributes
                                                ?.filter((it) => it.name === `${item}`)
                                                .map((val) => val.value);
                                        }
                                    });
                                    console.log(arr);
                                    const set = new Set();
                                    arr.flat().forEach((i) => set.add(i));
                                    return { name: item, value: Array.from(set) }; */
                                });
                            // console.log(res);
                            return res;
                        })
                    );
                    console.log(attrValues);
                    const c: AttributeType[] = [];
                    attrValues.forEach((item) => {
                        if (item) {
                            c.push(item);
                        }
                    });
                    products.setAttributes(c);
                }
            }
        });
        if (refreshToken)
            getCartsProduct(refreshToken)
                .then((body) => {
                    console.log(body);
                    const cartId = body.body.id;
                    const { version } = body.body;
                    console.log(cartId);
                    console.log(version);
                    const cartObj = [];
                    cartObj.push({ cartId, version });
                    cart.setCart(cartObj);
                    const arr = body.body.lineItems;
                    console.log(arr);
                    cart.setProducts(arr);
                })
                .catch((e) => {
                    console.log(e);
                });
    }, []);

    return (
        <div className="catalog">
            <img
                src={BackGround}
                alt="mainPage"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
            />
            <h2 className="page_title main" style={{ position: 'relative', zIndex: 1 }}>
                Catalog
            </h2>
            <div className="type-container" style={{ position: 'relative', zIndex: 1 }}>
                <TypesBar />
                <Sorting />
                <SortingAl />
                <SearchCompponent />
            </div>
            <div className="catalog_container" style={{ position: 'relative', zIndex: 1 }}>
                <FilterBar />
                <Catalog />
            </div>
        </div>
    );
});

export default CatalogPage;
