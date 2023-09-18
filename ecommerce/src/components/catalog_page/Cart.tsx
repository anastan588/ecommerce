import React, { useContext, useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import { Context } from '../..';
import {
    addProductItemAnonim,
    createAnonimusCart,
    getCartsAnonimus,
    addProductItemCastomer,
    getCartsAuth,
    createCartAuth,
} from './requests';
import { Obj } from './productsStore';
import { getLocalStorage } from '../login_page/BuildClient';
import { CartType } from '../basket_page/BasketStore';

const ButtonCarts: React.FC<{ item: Obj }> = (props) => {
    const { store, cart } = useContext(Context);
    const [value3, setValue3] = useState('В корзину');
    const [style, setStyle] = useState('button_carts');
    const [loading, setLoading] = useState(false);
    let value = cart.getProducts().find((val) => val.productId === props.item.id);
    useEffect(() => {
        const values = cart.getProducts().forEach((item) => {
            if (item.productId === props.item.id) {
                setValue3('В корзине!');
                setStyle('button_carts-changed');
            }
        });
        value = cart.getProducts().find((val) => val.productId === props.item.id);
        if (!value) {
            setValue3('В корзину');
            setStyle('button_carts');
        } else {
            setValue3('В корзине!');
            setStyle('button_carts-changed');
        }
    }, [value]);

    const handleEvent = async () => {
        setLoading(true);
        if (store.isAuth) {
            const tokenStore = getLocalStorage();
            const { refreshToken } = tokenStore;
            const getCartsCastomer = await getCartsAuth(refreshToken);
            if (getCartsCastomer) {
                const itemsCart = await addProductItemCastomer(
                    refreshToken,
                    getCartsCastomer.cartId,
                    props.item.id,
                    getCartsCastomer.version
                ).finally(() => setLoading(false));
                // console.log(itemsCart);
                if (itemsCart) {
                    cart.setProducts(itemsCart);
                    const arr = itemsCart.slice(0);
                    const lengthArr = arr.map((item) => item.quantity);
                    const length = lengthArr.reduce((acc, item) => {
                        return acc + item;
                    }, 0);
                    cart.setQuantity(length);
                }
            } else {
                const addProd = await createCartAuth(refreshToken, props.item.id).finally(() => setLoading(false));
                if (addProd) { cart.setProducts(addProd);
                    const array = addProd.slice(0);
                    const lengthArr = array.map((item) => item.quantity);
                    const length = lengthArr.reduce((acc, item) => {
                        return acc + item;
                    }, 0);
                    cart.setQuantity(length); }
                // console.log(addProd);
                const getCarts = await getCartsAuth(refreshToken);
                if (getCarts) {
                    const arr: CartType[] = [];
                    arr.push(getCarts);
                    cart.setCart(arr);
                }
            }
            setValue3('В корзине!');
            setStyle('button_carts-changed');
        } else {
            const getCartsAnonim = await getCartsAnonimus();
            if (getCartsAnonim) {
                const itemsCart = await addProductItemAnonim(
                    getCartsAnonim.id,
                    props.item.id,
                    getCartsAnonim.version
                ).finally(() => setLoading(false));
                // console.log(itemsCart);
                if (itemsCart) {
                    cart.setProducts(itemsCart);
                    const arr = itemsCart.slice(0);
                    const lengthArr = arr.map((item) => item.quantity);
                    const length = lengthArr.reduce((acc, item) => {
                        return acc + item;
                    }, 0);
                    cart.setQuantity(length);
                }
                setValue3('В корзине!');
                setStyle('button_carts-changed');
            } else {
                const addProd = await createAnonimusCart(props.item.id).finally(() => setLoading(false));
                if (addProd) { cart.setProducts(addProd);
                const arr = addProd.slice(0);
                    const lengthArr = arr.map((item) => item.quantity);
                    const length = lengthArr.reduce((acc, item) => {
                        return acc + item;
                    }, 0);
                    cart.setQuantity(length); }
                // console.log(addProd);
                setValue3('В корзине!');
                setStyle('button_carts-changed');
            }
        }
    };
    return (
        <Space wrap>
            <Button
                loading={loading}
                type="dashed"
                className={style}
                onClick={(e) => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    e.stopPropagation();
                    handleEvent();
                }}
            >
                <span className="carts_icon"></span>
                <span className="carts_text">{value3}</span>
            </Button>
        </Space>
    );
};

export default ButtonCarts;
