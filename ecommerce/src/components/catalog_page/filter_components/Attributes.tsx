import { Collapse, CollapseProps, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../../..';
// import Attributeitem from './Color';
import { AttributeType } from '../productsStore';
import { defaultProducts, queryArgsDef } from '../requests';

export const Attributeitem: React.FC<{ item: AttributeType }> = (props) => {
    const products = useContext(Context);
    const options = props.item.value.map((item) => {
        return { value: item, label: item };
    });
    const handleChange = async (value: string) => {
        const array = value.toString().split(',');
        const types = products.products.getTypes();
        let categories = products.products.getCategory();
        const categoryActive = products.products.getCategoryActive();
        if (categoryActive) {
            categories = categoryActive;
        }
        if (value.length === 0) {
            // console.log(array);
            const objInactive: AttributeType | undefined = products.products
                .getActiveAttributes()
                .find((i) => i.name === props.item.name);
            if (objInactive) {
                products.products.delActiveAttributes(objInactive);
            }
            const activeAttr = products.products.getActiveAttributes();
            const argsVal = queryArgsDef(types, categories, activeAttr);
            const defaultProd = await defaultProducts(argsVal);
            products.products.setProducts(defaultProd);
        } else {
            const attrActive = products.products.getActiveAttributes();
            const attrObj = attrActive.find((v) => v.name === props.item.name);
            if (attrObj) {
                products.products.delActiveAttributes(attrObj);
            }
            products.products.setActiveAttributes({ name: props.item.name, value: array });
            let attrActiveA = products.products.getActiveAttributes();
            const a: string[][] = [];
            attrActiveA.forEach((item) => a.push(item.value));
            const c: string[] = [];
            a.forEach((v) => c.push(v[0]));
            console.log(c.every((item) => item === ''));
            if (c.every((item) => item === '')) {
                // console.log(attrActiveA[0].name);
                attrActiveA = products.products.getAttributes();
            }
            const argsVal = queryArgsDef(types, categories, attrActiveA);
            const defaultProd = await defaultProducts(argsVal);
            products.products.setProducts(defaultProd);
        }
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
