import { apiRoot } from '../login_page/createClient';
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
    console.log(arrId);
});

export const categoriesSet = () => {
    return apiRoot
        .categories()
        .get()
        .execute()
        .then(({ body }) => {
            console.log(body);
            const category = body.results
                .filter((item) => item.parent)
                .map((item) => {
                    return { id: item.id, name: item.name.en };
                });
            console.log(category);
            return category;
        });
};
/* categories().then(({ body }) => {
    console.log(body);
    const arrId: (string | undefined)[] = [];
    // eslint-disable-next-line array-callback-return
    body.results.map((item) => {
        arrId.push(item.key);
    });
    console.log(arrId);
}); */

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
    console.log(arrId);
});

const url = () => {
    const product = () => {
        return apiRoot.products().get().execute();
    };
    // eslint-disable-next-line consistent-return
    product().then(({ body }) => {
        if (body) {
            const a = body.results[0].masterData.current.masterVariant.images;
            // eslint-disable-next-line @typescript-eslint/no-shadow
            let url;
            if (a) {
                // eslint-disable-next-line prefer-destructuring
                url = a[0];
            }
            return url;
        }
    });
};

export const categoryProducts = (id: string) => {
    return apiRoot
        .productProjections()
        .get({ queryArgs: { where: `categories(id="${id}")` } })
        .execute();
};
// eslint-disable-next-line @typescript-eslint/no-shadow
/* categoryProducts({ id: string }).then(({ body }) => {
    const names = body.results.map((item) => item.name);
    console.log(names);
}); */

/* ATTRIBUTES */

/* const attributesList = () => {
    return apiRoot.products().get().execute();
};
// eslint-disable-next-line consistent-return
attributesList().then(({ body }) => {
    if (body) {
        const attr = body.results[0].masterData.current.masterVariant.attributes?.map((item) => item.name);
        console.log(attr);
    }
}); */
/* CATEGORIES */
/* const categories = () => {
    return apiRoot.categories().get().execute();
};
categories().then(({ body }) => {
    const arrCat: (string | undefined)[] = [];
    // eslint-disable-next-line array-callback-return
    body.results.map((item) => {
        arrCat.push(item.key);
    });
    console.log(arrCat);
}); */

/* KEY */

/* const keyArr = () => {
    return apiRoot.products().get().execute();
};
keyArr().then(({ body }) => {
    const arrKey: (string | undefined)[] = [];
    // eslint-disable-next-line array-callback-return
    body.results.map((item) => {
        arrKey.push(item.key);
    });
    console.log(arrKey);
}); */

/* CATEGORY PRODUCTS */

const subCategories = () => {
    return apiRoot
        .categories()
        .get({
            queryArgs: {
                expand: ['name'],
            },
        })
        .execute();
};

subCategories().then(({ body }) => {
    const { id } = body.results[0];
    console.log(id);
    const subProducts = () => {
        return apiRoot
            .productProjections()
            .get({ queryArgs: { where: `categories(id="${id}")` } })
            .execute();
    };
    // eslint-disable-next-line @typescript-eslint/no-shadow
    subProducts().then(({ body }) => {
        const names = body.results.map((item) => item.name);
        console.log(names);
    });
});

export const attributes = () => {
    return apiRoot
        .productProjections()
        .get({ queryArgs: { where: `masterVariant(attributes(name="flower-color"))` } })
        .execute();
};
// eslint-disable-next-line @typescript-eslint/no-shadow
attributes().then(({ body }) => console.log(body));

/* ATTRIBUTESLIST WITH VALUES */

export const attributesList = () => {
    return apiRoot.products().get().execute();
};
// eslint-disable-next-line consistent-return
/* attributesList().then(async ({ body }) => {
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
                        // eslint-disable-next-line @typescript-eslint/no-shadow
                        .then(({ body }) => {
                            const arr = body.results.map(
                                (value) =>
                                    value.masterVariant.attributes
                                        ?.filter((it) => it.name === `${item}`)
                                        .map((val) => val.value)
                            );
                            const set = new Set();
                            arr.flat().forEach((i) => set.add(i));
                            // console.log(set);
                            // eslint-disable-next-line no-return-assign
                            return { name: item, value: Array.from(set) };
                        });
                    // console.log(res);
                    return res;
                })
            );
            console.log(attrValues);
        }
    }
}); */

/* FILTER PRODUCTS ATTRIBUTES flower-color value meaning */

export const categoryFilterProductsArr = (id: string) => {
    return apiRoot
        .productProjections()
        .search()
        .get({ queryArgs: { filter: `categories.id: "${id}"` } })
        .execute();
};

/* categoryFilterProductsArr().then(({ body }) => {
    console.log(body);
}); */

export const categoryFilterProductsAndType = (idType: string, id: string) => {
    return apiRoot
        .productProjections()
        .search()
        .get({
            queryArgs: { filter: [`productType.id: "${idType}"`, `categories.id: "${id}"`] },
        })
        .execute();
};

categoryFilterProductsAndType('9f6ed346-e10c-4f24-8b0f-c093dba256ce', '5a4fba3c-405c-4d51-8042-8d8d3dbce795').then(
    ({ body }) => {
        console.log(body);
    }
);

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

/* categoryFilterTypeCategory('9f6ed346-e10c-4f24-8b0f-c093dba256ce').then(({ body }) => {
    const a = body.results.map((item) => item.categories[0].id);
}); */

export const attrFilterId = (str: string[]) => {
    const args: string[] = [];
    str.forEach((item) => args.push(item));
    console.log(args);
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

categoryFilterId(['5a4fba3c-405c-4d51-8042-8d8d3dbce795', '9a394da5-d3f4-44e3-948a-33c5645b2fe1']).then(({ body }) => {
    console.log(body);
});

export const subProductsTwo = (name: string, value: string) => {
    return apiRoot
        .productProjections()
        .search()
        .get({ queryArgs: { filter: `variants.attributes.${name}: "${value}"` } })
        .execute();
};
// eslint-disable-next-line @typescript-eslint/no-shadow
/* subProductsTwo().then(({ body }) => {
    const names = body.results.map((item) => item.name);
    console.log(names);
}); */

/* FILTER ATTRIBUTES flower-color values */

/* const attributesValues = () => {
    return apiRoot
        .productProjections()
        .search()
        .get({ queryArgs: { filter: `variants.attributes.flower-color:exists` } })
        .execute();
};
// eslint-disable-next-line @typescript-eslint/no-shadow
attributesValues().then(({ body }) => {
    const arr = body.results.map(
        (value) =>
            value.masterVariant.attributes?.filter((item) => item.name === 'flower-color').map((val) => val.value)
    );
    const set = new Set();
    arr.flat().forEach((item) => set.add(item));
    console.log(set);
}); */

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
            console.log(body);
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

/* productsType().then(({ body }) => {
    console.log(body);
    const { id } = body.results[0];
    console.log(body.results);
    const productsTypeProducts = () => {
        return apiRoot
            .productProjections()
            .search()
            .get({ queryArgs: { filter: `productType.id: "${id}"` } })
            .execute();
    };
    // eslint-disable-next-line @typescript-eslint/no-shadow
    productsTypeProducts().then(({ body }) => {
        const names = body.results.map((item) => item.name);
        console.log(names);
    });
}); */

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
                console.log(names);
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
// eslint-disable-next-line @typescript-eslint/no-shadow
/* sortPricesheight().then(({ body }) => {
    const names = body.results.map((item) => item.name);
    console.log(names);
}); */

export const sortPricesDesc = (attr: string[]) => {
    const args: string[] = [];
    attr.forEach((item) => args.push(item));
    return apiRoot
        .productProjections()
        .search()
        .get({ queryArgs: { filter: args, sort: `price desc` } })
        .execute();
};
// eslint-disable-next-line @typescript-eslint/no-shadow
/* sortPricesDesc().then(({ body }) => {
    const names = body.results.map((item) => item.name);
    console.log(names);
}); */

export const sortAlfAsc = (attr: string[]) => {
    const args: string[] = [];
    attr.forEach((item) => args.push(item));
    return apiRoot
        .productProjections()
        .search()
        .get({ queryArgs: { filter: args, sort: `name.ru asc` } })
        .execute();
};
// eslint-disable-next-line @typescript-eslint/no-shadow
/* sortAlfAsc().then(({ body }) => {
    const names = body.results.map((item) => item.name);
    console.log(names);
}); */

export const sortAlfDesc = (attr: string[]) => {
    const args: string[] = [];
    attr.forEach((item) => args.push(item));
    return apiRoot
        .productProjections()
        .search()
        .get({ queryArgs: { filter: args, sort: `name.ru desc` } })
        .execute();
};
// eslint-disable-next-line @typescript-eslint/no-shadow
/* sortAlfDesc().then(({ body }) => {
    const names = body.results.map((item) => item.name);
    console.log(names);
}); */

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

export const priceFilter = (value: number[], args: string[]) => {
    const str = `variants.price.centAmount:range(${value[0]} to ${value[1]})`;
    args.push(str);
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