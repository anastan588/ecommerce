import React, { Suspense, useContext } from 'react';
import { Button, CollapseProps, Collapse, Space } from 'antd';
import { observer } from 'mobx-react-lite';
// import Color from './filter_components/Color';
import Categories from './filter_components/Categories';
import { Context } from '../..';
import { Attributeitem } from './filter_components/Attributes';
import PricesFilter from './filter_components/Prices';

/* const ButtonReset: React.FC = () => {
    const click = () => {
        const filterBar = document.querySelector('.catalog');
    };
    return (
        <Space wrap>
            <Button type="dashed">RESET</Button>
        </Space>
    );
}; */

/* const items: CollapseProps['items'] = [
    {
        key: '1',
        label: 'This is panel header 1',
        children: <Collapse defaultActiveKey="1" items={itemsNest} />,
    },
    {
        key: '2',
        label: 'This is panel header 2',
        children: <AttributesBar />,
    },
    {
        key: '3',
        label: 'This is panel header 3',
        children: <Categories />,
    },
]; */

const FilterBar: React.FC = observer(() => {
    const products = useContext(Context);
    const itemsNest: CollapseProps['items'] = products.products.attributes.map((item, i) => {
        return { key: i, label: item.name, children: <Attributeitem key={item.name} item={item} /> };
    });
    console.log(itemsNest);
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Выбрать категории',
            children: <Categories />,
        },
        {
            key: '2',
            label: 'Выбрать характеристики товара',
            children: <Collapse defaultActiveKey="1" items={itemsNest} />,
        },
        {
            key: '3',
            label: 'Фильтр по цене',
            children: <PricesFilter />,
        },
    ];
    // const itemNest = products.products.attributes.map((item, i) => { return {key: i, label: item, children: }}))
    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    return (
        <div className="filter">
            <Suspense>
               <Collapse className="filter_bar" onChange={onChange} items={items} />
            </Suspense>
        </div>
    );
});

export default FilterBar;
