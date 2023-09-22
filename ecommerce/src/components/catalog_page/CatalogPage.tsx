import { observer } from 'mobx-react-lite';
import React, { Suspense, useContext, useEffect } from 'react';
import { Context } from '../..';
import Catalog from './Catalog';
import './catalog.css';
// import CategoryBar from './CategoryBar';
import { productsRes, productsType, categories, attributesList, getCartsProduct } from './requests';
import TypesBar from './TypesBar';
import { apiRoot } from './ClientBuilderView';
import Sorting from './filter_components/sorting';
import SortingAl from './filter_components/sortingAlfabet';
import FilterBar from './filterBar';
import { AttributeType } from './productsStore';
import SearchCompponent from './filter_components/Searсh';
import { getLocalStorage } from '../login_page/BuildClient';
import BackGround from '../../images/backgrounds/background3.jpg';
import Spinner from '../router/spinner';

const CatalogPage = observer(() => {
    const { products, cart } = useContext(Context);
    const tokenStore = getLocalStorage();
    useEffect(() => {
        productsType().then(({ body }) => {
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
            products.setProducts(arr);
        });
        categories().then(({ body }) => {
            const category = body.results
                .filter((item) => item.parent)
                .map((item) => {
                    return { id: item.id, name: item.name.en };
                });
            products.setCategory(category);
        });
        attributesList().then(async ({ body }) => {
            if (body) {
                const attr = body.results[0].masterData.current.masterVariant.attributes?.map((item) => item.name);
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
                                    const valAttr = attributesVal.map((v) => {
                                        return v?.find((i) => i.name === item);
                                    });
                                    if (valAttr) {
                                        const ar: string[] = valAttr.map((i) => i?.value);
                                        const s: Set<string> = new Set();
                                        ar.forEach((i) => s.add(i));
                                        return { name: item, value: Array.from(s) };
                                    }
                                    return undefined;
                                });
                            return res;
                        })
                    );
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

        if (tokenStore) {
            const { refreshToken } = tokenStore;
            getCartsProduct(refreshToken)
                .then((body) => {
                    const cartId = body.body.id;
                    const { version } = body.body;
                    const cartObj = [];
                    cartObj.push({ cartId, version });
                    cart.setCart(cartObj);
                    const arr = body.body.lineItems;
                    cart.setProducts(arr);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
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
                <Suspense fallback={<Spinner />}>
                    <Catalog />
                </Suspense>
            </div>
        </div>
    );
});

export default CatalogPage;
