import React from 'react';
import { Card, Col } from 'antd';
import { Obj } from './productsStore';
import ButtonCarts from './Carts_button';

const { Meta } = Card;

const ProductsItem: React.FC<{ item: Obj }> = (props) => {
    const names = Object.values(props.item.name);
    return (
        <Col push={0.5} xs={24} sm={24} md={12} lg={8} xl={6}>
            <Card
                className="card_style"
                hoverable
                style={{ width: 220 }}
                cover={<img alt="example" src={props.item.images?.[0].url} />}
            >
                <Meta title={names[0]} />
                <Meta title={names[1]} />
                <div className="card-price">
                    {props.item.prices?.[0].value.centAmount.toString()}
                    <span className="card-curr">{props.item.prices?.[0].value.currencyCode}</span>
                </div>
                <div className="card-discount">
                    {props.item.prices?.[0].discounted?.value.centAmount.toString()}
                    <span className="card-curr">{props.item.prices?.[0].discounted?.value.currencyCode}</span>
                </div>
                <p className="card-descr">{props.item.description?.ru}</p>
                <ButtonCarts />
            </Card>
        </Col>
    );
};
// <div title={props.item.prices?.[0].value.centAmount.toString()}></div>
export default ProductsItem;
