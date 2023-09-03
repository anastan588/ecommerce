import React from 'react';
import { Card, Col } from 'antd';
import { Obj } from './productsStore';

const { Meta } = Card;

const ProductsItem: React.FC<{ item: Obj }> = (props) => {
    const names = Object.values(props.item.name);
    return (
        <Col push={0.5} sm={12} md={12} lg={8} xl={6}>
            <Card
                className="card_style"
                hoverable
                style={{ width: 220 }}
                cover={<img alt="example" src={props.item.images?.[0].url} />}
            >
                <Meta title={names[0]} />
                <Meta title={names[1]} />
                <h3 className="card-tytle">
                    {props.item.prices?.[0].value.centAmount.toString()}
                    <span className="card-curr">{props.item.prices?.[0].value.currencyCode}</span>
                    <p className="card-descr">{props.item.description?.ru}</p>
                </h3>
            </Card>
        </Col>
    );
};
// <div title={props.item.prices?.[0].value.centAmount.toString()}></div>
export default ProductsItem;
