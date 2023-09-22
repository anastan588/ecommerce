/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useContext } from 'react';
import { Row } from 'antd';
import './catalog.css';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import ProductsItem from './Card';

const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' };

const Catalog: React.FC = observer(() => {
    const { products } = useContext(Context);
    return (
        <Row className="cards-container" data-testid='cards-test'>
            {products.getProducts().map((item) => (
                <ProductsItem key={item.id} item={item} />
            ))}
        </Row>
    );
});

export default Catalog;
