import React, { useContext } from 'react';
import { Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { Context } from '../../..';
import {
    categoriesSet,
    // categoryFilterProductsArr,
    categoryFilterTypeCategory,
    defaultProducts,
    // productsResTwo,
    // productsTypeTwo,
    queryArgsDef,
} from '../requests';
import { CategoryType } from '../productsStore';

// const options: SelectProps['options'] = [];

/* for (let i = 10; i < 36; i += 1) {
    options.push({
        value: i.toString(36) + i,
        label: i.toString(36) + i,
    });
} */
const Categories: React.FC = observer(() => {
    const products = useContext(Context);
    const options = products.products.getCategory().map((item) => {
        return { value: item.name, label: item.name };
    });

    const handleChange = async (value: string) => {
        const array = value.toString().split(',');
        const types = products.products.getTypes();
        const categoryAct = products.products.getCategoryActive();
        if (categoryAct) {
            categoryAct.forEach((item) => products.products.delCategoryActive(item));
        }
        let categories: CategoryType[] = [];
        console.log(value.length);
        if (types.length === 2 && value.length === 0) {
            // const defaulProd = await productsResTwo();
            // products.products.setProducts(defaulProd);
            const setCategory = await categoriesSet();
            // const defaultProd = await defaultProducts(argsVal);
            // products.products.setProducts(defaultProd);
            products.products.setCategory(setCategory);
            categories = products.products.getCategory();
        } else if (types.length === 1 && value.length === 0) {
            // const productsType = await productsTypeTwo(types[0].id);
            // products.products.setProducts(productsType);
            const catSet = await categoriesSet();
            const catId = await categoryFilterTypeCategory(types[0].id);
            const category: CategoryType[] = [];
            catSet.forEach((item) => {
                if (catId.includes(item.id)) {
                    category.push(item);
                }
            });
            products.products.setCategory(category);
            categories = products.products.getCategory();
        } else {
            const categoryGet = products.products.getCategory();
            const catId = await categoryFilterTypeCategory(types[0].id);
            const catObj: CategoryType[] = [];
            categoryGet.forEach((item) => {
                if (catId.includes(item.id)) {
                    catObj.push(item);
                }
            });
            products.products.setCategory(catObj);
            // const cat: CategoryType[] = [];
            array.forEach((item) => {
                const category: CategoryType | undefined = products.products.getCategory().find((i) => i.name === item);
                if (category) products.products.setCategoryActive(category);
            });
            categories = products.products.getCategoryActive();
        }
        const attrActiveA = products.products.getActiveAttributes();
        const argsVal = queryArgsDef(types, categories, attrActiveA);
        const defaultProd = await defaultProducts(argsVal);
        products.products.setProducts(defaultProd);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        /* const a = Promise.all(
                // eslint-disable-next-line array-callback-return, consistent-return
                array.map(async (val) => {
                    const category: CategoryType | undefined = products.products
                        .getCategory()
                        .find((item) => item.name === `${val}`);
                    if (category) {
                        const ar = categoryFilterProductsArr(category.id).then((body) => {
                            const arr: Obj[] = body.body.results.map((v) => {
                                return {
                                    id: v.id,
                                    name: v.name,
                                    categoriesId: category.id,
                                    attributes: v.masterVariant.attributes,
                                    description: v.description,
                                    images: v.masterVariant.images,
                                    prices: v.masterVariant.prices,
                                };
                            });
                            return arr;
                            // products.products.setProducts(arr);
                        });
                        if (ar) return ar;
                    }
                })
            );
            const b = (await a).flat().filter((item) => item !== undefined);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const c: any = [];
            b.forEach((item) => {
                if (item) {
                    c.push(item);
                }
            });
            products.products.setProducts(c); */
        /* const arrayT = value.toString().split(',');
            const cat: CategoryType[] = [];
            arrayT.forEach((item) => {
                const category = products.products.getCategory().find((i) => i.name === item);
                if (category) {
                    cat.push(category);
                }
            });
            // const categorySet = products.products.getCategory().filter((item) => item.name === value);
            products.products.setCategory(cat);
        } */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        /* const productCat = Promise.all(
            array.map(async (val) => {
                const category: CategoryType | undefined = products.products
                    .getCategory()
                    .find((item) => item.name === `${val}`);
                if (category) {
                    categoryFilterProductsArr(category.id).then((body) => {
                        const arr: Obj[] = body.body.results.map((v) => {
                            return {
                                id: v.id,
                                name: v.name,
                                categoriesId: category.id,
                                attributes: v.masterVariant.attributes,
                                images: v.masterVariant.images,
                                prices: v.masterVariant.prices,
                            };
                        });
                        products.products.setProducts(arr);
                        return arr;
                    });
                }
            })
        );
        // console.log(await Promise.all(productCat));
        // products.products.setProducts(await Promise.all(productCat)); */
    };
    return (
        <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Tags Mode"
            onChange={handleChange}
            options={options}
        />
    );
});

export default Categories;
