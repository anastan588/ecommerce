import { Collapse, CollapseProps, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../../..';
// import Attributeitem from './Color';
import { AttributeType } from '../productsStore';
import { defaultProducts, queryArgsDef } from '../requests';

type ItemNest = {
    key: number;
    label: AttributeType;
    children: JSX.Element;
};

export const Attributeitem: React.FC<{ item: AttributeType }> = (props) => {
    const products = useContext(Context);
    // const arttrItemObj = products.products.attributes.find((item) => item.name === props.item.name);
    const options = props.item.value.map((item) => {
        return { value: item, label: item };
    });
    const handleChange = async (value: string) => {
        console.log(value);
        // const attrActive = products.products.getActiveAttributes();
        const array = value.toString().split(',');
        const types = products.products.getTypes();
        let categories = products.products.getCategory();
        const categoryActive = products.products.getCategoryActive();
        if (categoryActive) {
            categories = categoryActive;
        }
        if (value.length === 0) {
            console.log(array);
            const objInactive: AttributeType | undefined = products.products
                .getActiveAttributes()
                .find((i) => i.name === props.item.name);
            if (objInactive) {
                products.products.delActiveAttributes(objInactive);
            }
            const activeAttr = products.products.getActiveAttributes();
            const argsVal = queryArgsDef(types, categories, activeAttr);
            console.log(argsVal);
            const defaultProd = await defaultProducts(argsVal);
            products.products.setProducts(defaultProd);
        } else {
            // const defaulProd = await productsResTwo();
            // products.products.setProducts(defaulProd);
            const attrActive = products.products.getActiveAttributes();
            const attrObj = attrActive.find((v) => v.name === props.item.name);
            console.log(attrObj);
            if (attrObj) {
                products.products.delActiveAttributes(attrObj);
            }
            // console.log(props.item.name);
            // console.log(`selected ${value}`);
            // products.products.getCategory().forEach((vl) => console.log(vl.id));
            products.products.setActiveAttributes({ name: props.item.name, value: array });
            let attrActiveA = products.products.getActiveAttributes();
            const a: string[][] = [];
            attrActiveA.forEach((item) => a.push(item.value));
            console.log(a);
            const c: string[] = [];
            a.forEach((v) => c.push(v[0]));
            console.log(c);
            console.log(c.every((item) => item === ''));
            // console.log(attrActiveA[0].value.length);
            // console.log(attrActiveA.length);
            if (c.every((item) => item === '')) {
                // console.log(attrActiveA[0].name);
                attrActiveA = products.products.getAttributes();
            }
            const argsVal = queryArgsDef(types, categories, attrActiveA);
            console.log(argsVal);
            const defaultProd = await defaultProducts(argsVal);
            products.products.setProducts(defaultProd);
        }
        // const argsVal = queryArgsDef(types, categories, attrActiveA);
        // console.log(argsVal);
        // const defaultProd = await defaultProducts(argsVal);
        // products.products.setProducts(defaultProd);
        /* const args: string[] = [];
        // let args: string = ``;
        attrActiveA.forEach((i) => {
            let str = `variants.attributes.${i.name}:`;
            i.value.forEach((val) => {
                str += `"${val}",`;
            });
            // eslint-disable-next-line no-useless-concat
            // args += `${str.slice(0, str.length - 1)}` + ', ';
            // eslint-disable-next-line no-useless-concat
            args.push(`${str.slice(0, str.length - 1)}`);
        });
        console.log(args);

        attrFilterId(args).then((body) => console.log(body));
        console.log(args);
        console.log(value);
        if (value.length === 0) {
            console.log(array);
            const objInactive: AttributeType | undefined = products.products
                .getActiveAttributes()
                .find((i) => i.name === props.item.name);
            if (objInactive) {
                products.products.delActiveAttributes(objInactive);
            }
            const activeAttr = products.products.getActiveAttributes();
            const defaulProd = await productsResTwo();
            products.products.setProducts(defaulProd);
        } else {
            const a = Promise.all(
                // eslint-disable-next-line array-callback-return, consistent-return
                array.map(async (val) => {
                    const ar = subProductsTwo(props.item.name, val).then(({ body }) => {
                        const arr: (Obj | undefined)[] = body.results.map((v) => {
                            // console.log(v.categories[0].id);
                            // products.products.getCategory().forEach((vl) => console.log(vl.id));
                            const obj = products.products.getCategory().find((it) => it.id === v.categories[0].id);
                            // console.log(obj);
                            const i = products.products.getCategory().find((it) => it.id === v.categories[0].id)?.id;
                            // console.log(i);
                            if (i === v.categories[0].id) {
                                // console.log(v.categories[0].id);
                                return {
                                    id: v.id,
                                    name: v.name,
                                    categoriesId: v.categories[0].id,
                                    attributes: v.masterVariant.attributes,
                                    description: v.description,
                                    images: v.masterVariant.images,
                                    prices: v.masterVariant.prices,
                                };
                            }
                            return undefined;
                        });
                        console.log(arr);
                        return arr;
                    });
                    console.log(await ar);
                    return ar;
                })
            );
            console.log(await a);
            const b = (await a).flat().filter((item) => item !== undefined);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const c: any = [];
            b.forEach((item) => {
                if (item) {
                    c.push(item);
                }
            });
            console.log(c);
            products.products.setProducts(c);
        } */
    };

    return (
        <Select
            mode="tags"
            className="attribute_item"
            style={{ width: '100%' }}
            placeholder="Tags Mode"
            onChange={handleChange}
            options={options}
        />
    );
};

const AttributesBar: React.FC = observer(() => {
    const products = useContext(Context);
    const items: CollapseProps['items'] = products.products.attributes.map((item, i) => {
        return {
            key: i,
            label: item.name,
            children: <Attributeitem key={item.name} item={item} />,
        };
    });
    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    return <Collapse className="filter_bar" onChange={onChange} items={items} />;
});

export default AttributesBar;
