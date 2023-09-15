import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import '../catalog_page/catalog.css';
import './productStyles.css';
import ButtonCarts from '../catalog_page/Cart';
import {
    getCartsAnonimus,
    getCartsAuth,
    getCartsProduct,
    getProductById,
    removeProductItemAnonim,
    removeProductItemCastomer,
} from '../catalog_page/requests';
import { Obj } from '../catalog_page/productsStore';
import { Context } from '../..';
import { getLocalStorage } from '../login_page/BuildClient';
// import Item from 'antd/es/list/Item';

const ButtonProduct: React.FC<{ item: Obj }> = (props) => {
    const { store, cart } = useContext(Context);
    const [style, setStyle] = useState('button_carts');
    const [value3, setValue3] = useState('В корзину');
    const [disabled, setDisabled] = useState(true);
    const [size, setSize] = useState<SizeType>('middle'); // default is 'middle'
    let value = cart.getProducts().find((val) => val.productId === props.item.id);
    console.log(props.item.id);
    console.log(value?.id);
    console.log(value3);
    useEffect(() => {
        value = cart.getProducts().find((val) => val.productId === props.item.id);
        console.log(value);
        console.log(value3);
        if (value) {
        setDisabled(false)}
    }, [value]);
    const handleEvent = async () => {
        if (store.isAuth) {
            const tokenStore = getLocalStorage();
            console.log(tokenStore);
            const { refreshToken } = tokenStore;
            const activeCart = await getCartsAuth(refreshToken);
            if (activeCart) {
                const { cartId, version } = activeCart;
                console.log(cartId);
                if (value) {
                    const id = value?.id;
                    const itemsCart = await removeProductItemCastomer(refreshToken, cartId, id, version);
                    console.log(itemsCart);
                    // const cartValues = (await getCartsProduct(cartId)).body.lineItems;
                    // console.log(cartValues);
                    if (itemsCart && !itemsCart.find((item) => item.productId === props.item.id))
                        cart.setProducts(itemsCart);
                    setValue3('В корзину');
                    setStyle('button_carts');
                    setDisabled(true);
                }
            }
        } else {
            const getCartsAnonim = await getCartsAnonimus();
            console.log(getCartsAnonim);
            if (getCartsAnonim && value) {
                const id = value?.id;
                console.log('cart');
                console.log(getCartsAnonim.id);
                console.log(props.item.id);
                console.log(getCartsAnonim.version);
                const itemsCart = await removeProductItemAnonim(getCartsAnonim.id, id, getCartsAnonim.version);
                console.log(itemsCart);
                if (itemsCart) cart.setProducts(itemsCart);
                setValue3('В корзину');
                setStyle('button_carts');
                setDisabled(true);
            }
        }
        value = undefined;
    };

    return (
        <>
            <div
                className="buttons_product"
            >
                <ButtonCarts item={props.item} />
                <Button type="primary" className="button-product" size={size} onClick={handleEvent} disabled={disabled}>
                    Удалить из корзины
                </Button>
            </div>
        </>
    );
};

export default ButtonProduct;
