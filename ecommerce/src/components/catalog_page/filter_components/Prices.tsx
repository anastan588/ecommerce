import React, { useContext } from 'react';
import { Slider } from 'antd';
import { observer } from 'mobx-react-lite';
import { priceFilter, queryArgsDef } from '../requests';
import { Context } from '../../..';

const onChange = (value: number | [number, number]) => {
    console.log('onChange: ', value);
    // const filterPrice = priceFilter(value);
    // console.log(filterPrice);
};

const PricesFilter: React.FC = observer(() => {
    const products = useContext(Context);
    const types = products.products.getTypes();
    let categories = products.products.getCategory();
    const categoryActive = products.products.getCategoryActive();
    if (categoryActive) {
        categories = categoryActive;
    }
    const attrActiveA = products.products.getActiveAttributes();
    const args = queryArgsDef(types, categories, attrActiveA);
    const onAfterChange = async (value: [number, number]) => {
        console.log('onAfterChange: ', value);
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const filterPrice = await priceFilter(value, args);
        console.log(filterPrice);
        products.products.setProducts(filterPrice);
    };
    return (
        <>
            <Slider max={30} range step={1} defaultValue={[5, 10]} onChange={onChange} onAfterChange={onAfterChange} />
        </>
    );
});
export default PricesFilter;
