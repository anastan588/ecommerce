import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import '../catalog_page/catalog.css';
import './productStyles.css';
import {
    addProductItemAnonim,
    addProductItemCastomer,
    createAnonimusCart,
    createCartAuth,
    getCartsAnonimus,
    getCartsAuth,
    removeProductItemAnonim,
    removeProductItemCastomer,
} from '../catalog_page/requests';
import { Obj } from '../catalog_page/productsStore';
import { Context } from '../..';
import { getLocalStorage } from '../login_page/BuildClient';
import { CartType } from '../basket_page/BasketStore';
// import Item from 'antd/es/list/Item';

const ButtonProduct: React.FC<{ item: Obj }> = (props) => {
    const { store, cart } = useContext(Context);
    const [style, setStyle] = useState('button_carts');
    const [value3, setValue3] = useState('В корзину');
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [size, setSize] = useState<SizeType>('middle'); // default is 'middle'
    let value = cart.getProducts().find((val) => val.productId === props.item.id);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        value = cart.getProducts().find((val) => val.productId === props.item.id);
        if (value) {
            setDisabled(false);
            setValue3('В корзине!');
            setStyle('button_carts-changed');
        }
    }, [value]);
    const addProduct = async () => {
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
                const getCarts = await getCartsAuth(refreshToken);
                if (getCarts) {
                    const arr: CartType[] = [];
                    arr.push(getCarts);
                    cart.setCart(arr);
                }
            }
            setValue3('В корзине!');
            setStyle('button_carts-changed');
            setDisabled(false);
        } else {
            const getCartsAnonim = await getCartsAnonimus();
            if (getCartsAnonim) {
                const itemsCart = await addProductItemAnonim(
                    getCartsAnonim.id,
                    props.item.id,
                    getCartsAnonim.version
                ).finally(() => setLoading(false));
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
                setDisabled(false);
            } else {
                const addProd = await createAnonimusCart(props.item.id).finally(() => setLoading(false));
                if (addProd) { cart.setProducts(addProd);
                    const array = addProd.slice(0);
                    const lengthArr = array.map((item) => item.quantity);
                    const length = lengthArr.reduce((acc, item) => {
                        return acc + item;
                    }, 0);
                    cart.setQuantity(length); }
                setValue3('В корзине!');
                setStyle('button_carts-changed');
                setDisabled(false);
            }
        }
    };
    const handleEvent = async () => {
        if (store.isAuth) {
            const tokenStore = getLocalStorage();
            const { refreshToken } = tokenStore;
            const activeCart = await getCartsAuth(refreshToken);
            if (activeCart) {
                const { cartId, version } = activeCart;
                if (value) {
                    const id = value?.id;
                    const itemsCart = await removeProductItemCastomer(refreshToken, cartId, id, version);
                    if (itemsCart && !itemsCart.find((item) => item.productId === props.item.id)) {
                        cart.setProducts(itemsCart);
                        const arr = itemsCart.slice(0);
                        const lengthArr = arr.map((item) => item.quantity);
                        const length = lengthArr.reduce((acc, item) => {
                            return acc + item;
                        }, 0);
                        cart.setQuantity(length);
                    }
                    setValue3('В корзину');
                    setStyle('button_carts');
                    setDisabled(true);
                }
            }
        } else {
            const getCartsAnonim = await getCartsAnonimus();
            if (getCartsAnonim && value) {
                const id = value?.id;
                const itemsCart = await removeProductItemAnonim(getCartsAnonim.id, id, getCartsAnonim.version);
                if (itemsCart) { cart.setProducts(itemsCart);
                const arr = itemsCart.slice(0);
                    const lengthArr = arr.map((item) => item.quantity);
                    const length = lengthArr.reduce((acc, item) => {
                        return acc + item;
                    }, 0);
                    cart.setQuantity(length);}
                setValue3('В корзину');
                setStyle('button_carts');
                setDisabled(true);
            }
        }
        value = undefined;
    };

    return (
        <>
            <div className="buttons_product">
                <Button loading={loading} type="dashed" className={style} onClick={addProduct}>
                    <span className="carts_icon"></span>
                    <span className="carts_text">{value3}</span>
                </Button>
                <Button type="primary" className="button-product" size={size} onClick={handleEvent} disabled={disabled}>
                    Удалить из корзины
                </Button>
            </div>
        </>
    );
};

export default ButtonProduct;
