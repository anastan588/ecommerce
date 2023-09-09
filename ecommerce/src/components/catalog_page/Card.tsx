import React, { useContext, useState } from 'react';
/* import { useNavigate } from 'react-router'; */
import { Card, Col, Skeleton, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useInView } from 'react-intersection-observer';
import { Obj } from './productsStore';
import { updateID } from '../product_page/ProductPage';
import ButtonCarts from './Cart';
import { getProductById } from './requests';
import { Context } from '../..';

const { Meta } = Card;

const ProductsItem: React.FC<{ item: Obj }> = (props) => {
    const { store, products } = useContext(Context);
    const { ref, inView } = useInView({ threshold: 0.8, triggerOnce: true });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    


    // eslint-disable-next-line @typescript-eslint/no-shadow
    async function openProductPage(objItem: Obj) {
        console.log('open product card');
        console.log(objItem.id);
        const item = getProductById(props.item.id).then((body) => {
            const arr = [];
            arr.push({
                id: body.body.id,
                name: body.body.masterData.current.name,
                categoriesId: body.body.masterData.current.categories[0].id,
                attributes: body.body.masterData.current.masterVariant.attributes,
                description: body.body.masterData.current.description,
                images: body.body.masterData.current.masterVariant.images,
                prices: body.body.masterData.current.masterVariant.prices,
            });
            products.setProductItem(arr);
            return arr;
        });
        console.log(await item);
        updateID(objItem.id);
        navigate('/productpage');
    }

    const names = Object.values(props.item.name);
    return (
        <Col push={0.5} xs={24} sm={24} md={12} lg={8} xl={6} onClick={() => openProductPage(props.item)} >
            <Card
                ref={ref}
                className="card_style"
                hoverable
                style={{ width: 220 }}
                cover={
                    inView ? (
                        <img alt="example" src={props.item.images?.[0].url} />
                    ) : (
                        <Skeleton loading={loading} avatar active>

                            <Meta avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />} />
                        </Skeleton>
                    )
                }
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
                <ButtonCarts key={props.item.id} item={props.item} />
            </Card>
        </Col>
    );
};
// <div title={props.item.prices?.[0].value.centAmount.toString()}></div>
export default ProductsItem;
