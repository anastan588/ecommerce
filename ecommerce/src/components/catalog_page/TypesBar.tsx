import React, { useContext, useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import {
    categoriesSet,
    categoryFilterTypeCategory,
    productsResTwo,
    productsTypeSet,
    productsTypeTwo,
} from './requests';
import { Obj, TypeProducts } from './productsStore';
import AttributesBar from './filter_components/Attributes';

type Options = {
    label: string;
    value: string;
};

const TypesBar: React.FC = observer(() => {
    const { products } = useContext(Context);
    const options: Options[] = products.types.map((item) => {
        return { label: item.name, value: item.name };
    });
    options.unshift({ label: 'All', value: 'All' });
    const [value3, setValue3] = useState('All');

    const hudleEvent = async (id: string) => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const productsType = await productsTypeTwo(id);
        console.log(productsType);
        products.setProducts(productsType);
        /* const type = products.getTypes().find((item) => item.id === `${id}`);
        const typeArr: TypeProducts[] = [];
        if (type) {
            typeArr.push(type);
            products.setTypes(typeArr);
        } */
        /* productsType().then(({ body }) => {
            // const { id } = body.results[0];
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
                const names = body.results.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        categoriesId: item.categories[0].id,
                        attributes: item.masterVariant.attributes,
                        images: item.masterVariant.images,
                        prices: item.masterVariant.prices,
                    };
                });
                console.log(names);
                products.setProducts(names);
            });
        }); */
    };

    const onChange3 = async ({ target: { value } }: RadioChangeEvent) => {
        console.log('radio3 checked', value);
        console.log(value);
        const activeAttr = products.getActiveAttributes();
        activeAttr.forEach((item) => products.delActiveAttributes(item));
        const sortItem = document.getElementById('sort');
        sortItem?.setAttribute('defaultvalue', 'default');
        console.log(sortItem);
        if (value === 'All') {
            const defaulProd: Obj[] = await productsResTwo();
            products.setProducts(defaulProd);
            const setTypes = await productsTypeSet();
            products.setTypes(setTypes);
            const setCategory = await categoriesSet();
            products.setCategory(setCategory);
        } else {
            const type = products.getTypes().find((item) => item.name === value);
            const typeArr: TypeProducts[] = [];
            if (type) {
                console.log(type.id);
                hudleEvent(type.id);
                typeArr.push(type);
                products.setTypes(typeArr);
                const catId: string[] = await categoryFilterTypeCategory(type.id);
                const catObj = products.getCategory().filter((item) => catId.find((i) => i === item.id));
                products.setCategory(catObj);
                console.log(catObj);
            }
        }
        setValue3(value);
        //  hudleEvent(id);
    };

    return (
        <div className="types_bar">
            <Radio.Group
                options={options}
                buttonStyle="solid"
                onChange={onChange3}
                value={value3}
                optionType="button"
            />
            <br />
            <br />
        </div>
    );
});

export default TypesBar;
