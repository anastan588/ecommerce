import React, { useContext, useState } from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import { observer } from 'mobx-react-lite';
import { defaultProducts, queryArgsDef, sortPricesDesc, sortPricesheight } from '../requests';
import { Context } from '../../..';
import { Obj } from '../productsStore';

type Options = {
    label: string;
    value: string;
};

const Sorting: React.FC = observer(() => {
    const products = useContext(Context);
    const options: Options[] = [
        { label: 'по возрастанию', value: 'по возрастанию' },
        { label: 'по убыванию', value: 'по убыванию' },
    ];

    options.push({ label: 'default', value: 'default' });
    const [value3, setValue3] = useState('default');

    const onChange3 = ({ target: { value } }: RadioChangeEvent) => {
        console.log('radio3 checked', value);
        setValue3(value);
        console.log(value);
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        hundleEvent(value);
    };
    const hundleEvent = async (value: string) => {
        console.log('click');
        console.log(value);
        const types = products.products.getTypes();
        let categories = products.products.getCategory();
        const categoryActive = products.products.getCategoryActive();
        if (categoryActive) {
            categories = categoryActive;
        }
        const attrActiveA = products.products.getActiveAttributes();
        const args = queryArgsDef(types, categories, attrActiveA);
        // const defaultProd = await defaultProducts(argsVal);
        /* const args: string[] = [];
        // let args: string = ``;
        attrActiveA.forEach((i) => {
            let str = `variants.attributes.${i.name}:`;
            i.value.forEach((val) => {
                str += `"${val}",`;
            });
            args.push(`${str.slice(0, str.length - 1)}`);
        });
        let str = `categories.id: `;
        categories.forEach((c) => {
            str += `"${c.id}",`;
        });
        args.push(`${str.slice(0, str.length - 1)}`);
        if (types.length === 1) {
            const strId = `productType.id: "${types[0].id}"`;
            args.push(strId);
        } */
        if (value === 'по возрастанию') {
            console.log(value);
            sortPricesheight(args).then(({ body }) => {
                const arr = body.results.map((item) => {
                    // const catId = categories.find((i) => i.id === item.categories[0].id);
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
                console.log(arr);
                products.products.setProducts(arr);
            });
        } else if (value === 'по убыванию') {
            console.log(value);
            sortPricesDesc(args).then(({ body }) => {
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
                console.log(arr);
                products.products.setProducts(arr);
            });
        } else if (value === 'default') {
            const argsDef: Obj[] = await defaultProducts(args);
            products.products.setProducts(argsDef);
        }
    };

    return (
        <div className="types_bar">
            <h2>Сортировать</h2>
            <Radio.Group
                className="sorting"
                id="sort"
                options={options}
                buttonStyle="solid"
                defaultValue={'default'}
                onChange={onChange3}
                value={value3}
                optionType="button"
            />
            <br />
            <br />
        </div>
    );
    /* const [value, setValue] = useState<string | number>('по возрастанию');
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const hundleEvent = () => {
        console.log('click');
        console.log(value);
        if (value === 'по возрастанию') {
            sortPricesheight().then(({ body }) => {
                const arr = body.results.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        categoriesId: item.categories[0].id,
                        attributes: item.masterVariant.attributes,
                        images: item.masterVariant.images,
                        prices: item.masterVariant.prices,
                    };
                });
                products.products.setProducts(arr);
            });
        } else if (value === 'по убыванию') {
            sortPricesDesc().then(({ body }) => {
                const arr = body.results.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        categoriesId: item.categories[0].id,
                        attributes: item.masterVariant.attributes,
                        images: item.masterVariant.images,
                        prices: item.masterVariant.prices,
                    };
                });
                products.products.setProducts(arr);
            });
        }
    };

    return (
        <div className="sorting-prices">
            <h3 className="sorting-title">Сортировка по цене</h3>
            <Segmented
                options={['по возрастанию', 'по убыванию']}
                onChange={setValue}
                value={value}
                onClick={hundleEvent}
            />
        </div>
    ); */
});

export default Sorting;
