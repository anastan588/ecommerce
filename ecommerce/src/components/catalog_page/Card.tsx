import React from 'react';
/* import { useNavigate } from 'react-router'; */
import { Card, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Obj } from './productsStore';
import { updateID } from '../product_page/ProductPage';
import ButtonCarts from './Cart';



const { Meta } = Card;

const ProductsItem: React.FC<{ item: Obj }> = (props) => {
    const navigate = useNavigate();

    function openProductPage(idPlants: string) {
        /* console.log('open product card');
        console.log(idPlants); */
        updateID(idPlants);
        navigate('/productpage');
    }

    const names = Object.values(props.item.name);
    return (
        <Col push={0.5} xs={24} sm={24} md={12} lg={8} xl={6} onClick={() => openProductPage(props.item.id)}>
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
