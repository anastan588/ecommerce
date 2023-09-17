import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { apiRoot, getClientWithToken } from '../login_page/createClient';
import { apiRootAnonimusClientCastomer, apiRootCastomer } from './ClientsBuilderCastomer';
import { TypeProducts, CategoryType, AttributeType } from './productsStore';

export const categories = () => {
    return apiRoot.categories().get().execute();
};
categories().then(({ body }) => {
    console.log(body);
    const arrId: (string | undefined)[] = [];
    // eslint-disable-next-line array-callback-return
    body.results.map((item) => {
        arrId.push(item.key);
    });
});

export const categoriesSet = () => {
    return apiRoot
        .categories()
        .get()
        .execute()
        .then(({ body }) => {
            const category = body.results
                .filter((item) => item.parent)
                .map((item) => {
                    return { id: item.id, name: item.name.en };
                });
            return category;
        });
};

const subCategoriesOne = () => {
    return apiRoot
        .categories()
        .get({
            queryArgs: {
                expand: ['parent'],
            },
        })
        .execute();
};

subCategoriesOne().then(({ body }) => {
    console.log(body);
    const arrId: (string | undefined)[] = [];
    // eslint-disable-next-line array-callback-return
    body.results.map((item) => {
        arrId.push(item.key);
    });
});

export const categoryProducts = (id: string) => {
    return apiRoot
        .productProjections()
        .get({ queryArgs: { where: `categories(id="${id}")` } })
        .execute();
};

export const getProductById = (id: string) => {
    return apiRoot.products().withId({ ID: id }).get().execute();
};

export const attributes = () => {
    return apiRoot
        .productProjections()
        .get({ queryArgs: { where: `masterVariant(attributes(name="flower-color"))` } })
        .execute();
};

/* ATTRIBUTESLIST WITH VALUES */

export const attributesList = () => {
    return apiRoot.products().get().execute();
};

/* FILTER PRODUCTS ATTRIBUTES flower-color value meaning */

export const categoryFilterProductsArr = (id: string) => {
    return apiRoot
        .productProjections()
        .search()
        .get({ queryArgs: { filter: `categories.id: "${id}"` } })
        .execute();
};

export const categoryFilterProductsAndType = (idType: string, id: string) => {
    return apiRoot
        .productProjections()
        .search()
        .get({
            queryArgs: { filter: [`productType.id: "${idType}"`, `categories.id: "${id}"`] },
        })
        .execute();
};

export const categoryFilterTypeCategory = (idType: string) => {
    return apiRoot
        .productProjections()
        .search()
        .get({
            queryArgs: { filter: [`productType.id: "${idType}"`] },
        })
        .execute()
        .then(({ body }) => {
            const a = body.results.map((item) => item.categories[0].id);
            return a;
        });
};

export const attrFilterId = (str: string[]) => {
    const args: string[] = [];
    str.forEach((item) => args.push(item));
    return apiRoot
        .productProjections()
        .search()
        .get({ queryArgs: { filter: args } })
        .execute();
};

export const categoryFilterId = (id: string[]) => {
    let str = `categories.id:`;
    id.forEach((item) => {
        str += `"${item}",`;
    });
    return apiRoot
        .productProjections()
        .search()
        .get({ queryArgs: { filter: `${str.slice(0, str.length - 1)}` } })
        .execute();
};

export const subProductsTwo = (name: string, value: string) => {
    return apiRoot
        .productProjections()
        .search()
        .get({ queryArgs: { filter: `variants.attributes.${name}: "${value}"` } })
        .execute();
};

export const productsRes = () => {
    return apiRoot.products().get().execute();
};

productsRes().then(({ body }) => {
    const arr = body.results.map((item) => {
        return {
            id: item.id,
            categoriesId: item.masterData.current.categories[0].id,
            attributes: item.masterData.current.masterVariant.attributes,
            images: item.masterData.current.masterVariant.images,
            prices: item.masterData.current.masterVariant.prices,
        };
    });
    return arr;
});

export const productsResTwo = () => {
    return apiRoot
        .products()
        .get()
        .execute()
        .then(({ body }) => {
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
            return arr;
        });
};

productsRes().then(({ body }) => {
    const arr = body.results.map((item) => {
        return {
            id: item.id,
            categoriesId: item.masterData.current.categories[0].id,
            attributes: item.masterData.current.masterVariant.attributes,
            description: item.masterData.current.description,
            images: item.masterData.current.masterVariant.images,
            prices: item.masterData.current.masterVariant.prices,
        };
    });
    return arr;
});

/* PRODUCT TYPES PRODUCTS */

export const productsTypeSet = () => {
    return apiRoot
        .productTypes()
        .get()
        .execute()
        .then(({ body }) => {
            const arr = body.results.map((item) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                return { id: item.id, name: item.name };
            });
            return arr;
        });
};

// eslint-disable-next-line import/prefer-default-export
export const productsType = () => {
    return apiRoot.productTypes().get().execute();
    /* .then(({ body }) => {
            console.log(body);
            const arr = body.results.map((item) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                return { id: item.id, name: item.name };
            });
            console.log(arr);
        }); */
};

export const productsTypeTwo = (id: string) => {
    return (
        apiRoot
            .productProjections()
            .search()
            .get({ queryArgs: { filter: `productType.id: "${id}"` } })
            .execute()
            // eslint-disable-next-line @typescript-eslint/no-shadow
            .then(({ body }) => {
                const names = body.results.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        categoriesId: item.categories[0].id,
                        attributes: item.masterVariant.attributes,
                        description: item.description,
                        images: item.masterVariant.images,
                        prices: item.masterVariant.prices,
                    };
                });
                return names;
            })
    );
};

productsTypeTwo('9f6ed346-e10c-4f24-8b0f-c093dba256ce');

export const sortPricesheight = (attr: string[]) => {
    const args: string[] = [];
    attr.forEach((item) => args.push(item));
    return apiRoot
        .productProjections()
        .search()
        .get({ queryArgs: { filter: args, sort: `price asc` } })
        .execute();
};

export const sortPricesDesc = (attr: string[]) => {
    const args: string[] = [];
    attr.forEach((item) => args.push(item));
    return apiRoot
        .productProjections()
        .search()
        .get({ queryArgs: { filter: args, sort: `price desc` } })
        .execute();
};

export const sortAlfAsc = (attr: string[]) => {
    const args: string[] = [];
    attr.forEach((item) => args.push(item));
    return apiRoot
        .productProjections()
        .search()
        .get({ queryArgs: { filter: args, sort: `name.ru asc` } })
        .execute();
};

export const sortAlfDesc = (attr: string[]) => {
    const args: string[] = [];
    attr.forEach((item) => args.push(item));
    return apiRoot
        .productProjections()
        .search()
        .get({ queryArgs: { filter: args, sort: `name.ru desc` } })
        .execute();
};

export const defaultProducts = (attr: string[]) => {
    const args: string[] = [];
    attr.forEach((item) => args.push(item));
    return apiRoot
        .productProjections()
        .search()
        .get({ queryArgs: { filter: args } })
        .execute()
        .then(({ body }) => {
            const arr = body.results.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    categoriesId: item.categories[0].id,
                    attributes: item.masterVariant.attributes,
                    description: item.description,
                    images: item.masterVariant.images,
                    prices: item.masterVariant.prices,
                };
            });
            return arr;
        });
};

export const queryArgsDef = (types: TypeProducts[], categoryVal: CategoryType[], attrVal: AttributeType[]) => {
    const args: string[] = [];
    // let args: string = ``;
    attrVal.forEach((i) => {
        let str = `variants.attributes.${i.name}:`;
        i.value.forEach((val: string) => {
            str += `"${val}",`;
        });
        args.push(`${str.slice(0, str.length - 1)}`);
    });
    let str = `categories.id: `;
    if (categoryVal.length > 0) {
        categoryVal.forEach((c) => {
            str += `"${c.id}",`;
        });
        args.push(`${str.slice(0, str.length - 1)}`);
    }
    if (types.length === 1) {
        const strId = `productType.id: "${types[0].id}"`;
        args.push(strId);
    }
    return args;
};

export const searchProd = (text: string) => {
    return apiRoot
        .productProjections()
        .search()
        .get({ queryArgs: { 'text.en-US': text } })
        .execute()
        .then(({ body }) => {
            const arr = body.results.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    categoriesId: item.categories[0].id,
                    attributes: item.masterVariant.attributes,
                    description: item.description,
                    images: item.masterVariant.images,
                    prices: item.masterVariant.prices,
                };
            });
            return arr;
        });
};

export const priceFilter = (value?: number[], args?: string[]) => {
    const argum: string[] = [];
    if (value) {
        const str = `variants.price.centAmount:range(${value[0]} to ${value[1]})`;
        argum.push(str);
    }
    if (args) {
        args.forEach((item) => argum.push(item));
    }
    return apiRoot
        .productProjections()
        .search()
        .get({ queryArgs: { filter: argum } })
        .execute()
        .then(({ body }) => {
            const arr = body.results.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    categoriesId: item.categories[0].id,
                    attributes: item.masterVariant.attributes,
                    description: item.description,
                    images: item.masterVariant.images,
                    prices: item.masterVariant.prices,
                };
            });
            return arr;
        });
};

/* const reqCarts = () => {
    return apiRoot.carts().get().execute();
};

reqCarts().then((body) => {
    console.log(body);
});

const reqCart = () => {
    return apiRootAnonimusClient.me().carts().get().execute();
};

reqCart().then((body) => {
    console.log(body);
}); */

export const createAnonimusCart = (prodId: string) => {
    return apiRootAnonimusClientCastomer
        .me()
        .carts()
        .post({ body: { currency: 'EUR' } })
        .execute()
        .then((body) => {
            const cartId = body.body.id;
            const { version } = body.body;
            localStorage.setItem('cartIdAnonim', cartId);
            const addProductItemAnonim = () => {
                return (
                    apiRootAnonimusClientCastomer
                        .me()
                        .carts()
                        .withId({ ID: cartId })
                        .post({ body: { version, actions: [{ action: 'addLineItem', productId: prodId }] } })
                        .execute()
                        // eslint-disable-next-line @typescript-eslint/no-shadow
                        .then((body) => {
                            return body.body.lineItems;
                        })
                        .catch((e) => {
                            console.log(e);
                        })
                );
            };
            return addProductItemAnonim();
        });
};

/* createAnonimusCart().then((body) => {
    console.log(body);
    const cartId = body.body.anonymousId;
    const { version } = body.body;
    console.log(cartId);
    console.log(version);
    return { cartId, version };
}); */

/* const addProductItem = (cartId: string, prodId: string, version: number) => {
    return apiRootAnonimusClient
        .me()
        .carts()
        .withId({ ID: cartId })
        .post({ body: { version, actions: [{ action: 'addLineItem', productId: prodId }] } })
        .execute()
        .then((body) => {
            console.log(body);
        });
}; */

export const getCartsAuth = async (token: string) => {
    console.log('getCartsAuth'); // это я добавил для тестирования
    const client = getClientWithToken(token);
    const apiRootToken = createApiBuilderFromCtpClient(client);
    console.log('token bin getCartsAuth');
    console.log(token);
    const answer = await apiRootToken
        .withProjectKey({ projectKey: 'rsschool-final-task-stage2' })
        .me()
        .activeCart()
        .get()
        .execute()
        .then((body) => {
            const cartId = body.body.id;
            const { version } = body.body;
            return { cartId, version };
        })
        .catch((e) => {
            console.log(e);
        });


        console.log('answer');
        console.log(answer); // добавил для тесирования сам
        return answer;

};

export const getCartsProduct = (token: string) => {
    const client = getClientWithToken(token);
    const apiRootToken = createApiBuilderFromCtpClient(client);
    return apiRootToken.withProjectKey({ projectKey: 'rsschool-final-task-stage2' }).me().activeCart().get().execute();
};

export const createCartAuth = (token: string, prodId: string) => {
    const client = getClientWithToken(token);
    const apiRootToken = createApiBuilderFromCtpClient(client);
    return (
        apiRootToken
            .withProjectKey({ projectKey: 'rsschool-final-task-stage2' })
            .me()
            .carts()
            .post({ body: { currency: 'EUR' } })
            .execute()
            // eslint-disable-next-line @typescript-eslint/no-shadow
            .then((body) => {
                const cartId = body.body.id;
                const { version } = body.body;
                const addProductItemCastomer = () => {
                    return (
                        apiRootToken
                            .withProjectKey({ projectKey: 'rsschool-final-task-stage2' })
                            .me()
                            .carts()
                            .withId({ ID: cartId })
                            .post({ body: { version, actions: [{ action: 'addLineItem', productId: prodId }] } })
                            .execute()
                            // eslint-disable-next-line @typescript-eslint/no-shadow
                            .then((body) => {
                                return body.body.lineItems;
                            })
                            .catch((e) => {
                                console.log(e);
                            })
                    );
                };
                return addProductItemCastomer();
            })
            .catch((e) => {
                console.log(e);
            })
    );
};

export const checkCartsById = (cartId: string) => {
    return apiRootCastomer
        .me()
        .carts()
        .withId({ ID: cartId })
        .get()
        .execute()
        .then((body) => {
            console.log(body);
            return body;
        });
};

export const getCartsAnonimus = () => {
    return apiRootAnonimusClientCastomer
        .me()
        .activeCart()
        .get()
        .execute()
        .then((body) => {
            console.log(body.body.anonymousId);
            const { id } = body.body;
            const { version } = body.body;
            return { id, version };
        })
        .catch((e) => console.log(e));
};

export const getCartsProdAnonimus = () => {
    return apiRootAnonimusClientCastomer.me().activeCart().get().execute();
    /* .then((body) => {
            console.log(body.body.results[0]);
            const { id } = body.body.results[0];
            const { version } = body.body.results[0];
            return { id, version };
        })
        .catch((e) => console.log(e)); */
};

export const checkCartsAnonimus = (cartId: string) => {
    return apiRootAnonimusClientCastomer
        .me()
        .carts()
        .withId({ ID: cartId })
        .get()
        .execute()
        .then((body) => {
            console.log(body);
        });
};

export const addProductItemAnonim = (cartId: string, prodId: string, version: number) => {
    return apiRootAnonimusClientCastomer
        .me()
        .carts()
        .withId({ ID: cartId })
        .post({ body: { version, actions: [{ action: 'addLineItem', productId: prodId }] } })
        .execute()
        .then((body) => {
            return body.body.lineItems;
        })
        .catch((e) => {
            console.log(e);
        });
};

export const addProductItemCastomer = (token: string, cartId: string, prodId: string, version: number) => {
    const client = getClientWithToken(token);
    const apiRootToken = createApiBuilderFromCtpClient(client);
    return apiRootToken
        .withProjectKey({ projectKey: 'rsschool-final-task-stage2' })
        .me()
        .carts()
        .withId({ ID: cartId })
        .post({ body: { version, actions: [{ action: 'addLineItem', productId: prodId }] } })
        .execute()
        .then((body) => {
            return body.body.lineItems;
        })
        .catch((e) => {
            console.log(e);
        });
};

export const checkProduct = (token: string) => {
    const client = getClientWithToken(token);
    const apiRootToken = createApiBuilderFromCtpClient(client);
    return apiRootToken
        .withProjectKey({ projectKey: 'rsschool-final-task-stage2' })
        .me()
        .activeCart()
        .get()
        .execute()
        .then((body) => {
            console.log(body);
        });
};

export const removeProductItemCastomer = (token: string, cartId: string, prodId: string, version: number) => {
    const client = getClientWithToken(token);
    const apiRootToken = createApiBuilderFromCtpClient(client);
    return apiRootToken
        .withProjectKey({ projectKey: 'rsschool-final-task-stage2' })
        .me()
        .carts()
        .withId({ ID: cartId })
        .post({ body: { version, actions: [{ action: 'removeLineItem', lineItemId: prodId }] } })
        .execute()
        .then((body) => {
            return body.body.lineItems;
        })
        .catch((e) => {
            console.log(e);
        });
};

export const removeProductItemAnonim = (cartId: string, prodId: string, version: number) => {
    return apiRootAnonimusClientCastomer
        .me()
        .carts()
        .withId({ ID: cartId })
        .post({ body: { version, actions: [{ action: 'removeLineItem', lineItemId: prodId }] } })
        .execute()
        .then((body) => {
            return body.body.lineItems;
        })
        .catch((e) => {
            console.log(e);
        });
};
