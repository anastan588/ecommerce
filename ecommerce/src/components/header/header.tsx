import { Button, Col, Row, Layout } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RegistrationPage from '../registration_page/RegistrationPage';
import { Context } from '../..';
import Store from '../login_page/store';
import BasketImg from '../../images/icon/shopping-cart-solid.svg';

import { getLocalStorage } from '../login_page/BuildClient';
import { getCartsProduct } from '../catalog_page/requests';

const { Content } = Layout;

const Header = () => {
    const { store, cart } = useContext(Context);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
            const tokenStore = getLocalStorage();
            const { refreshToken } = tokenStore;
            if (refreshToken)
                getCartsProduct(refreshToken)
                    .then((body) => {
                        const cartId = body.body.id;
                        const { version } = body.body;
                        const cartObj = [];
                        cartObj.push({ cartId, version });
                        cart.setCart(cartObj);
                        const arr = body.body.lineItems;
                        cart.setProducts(arr);
                        const lengthArr = arr.map((item) => item.quantity);
                        const length = lengthArr.reduce((acc, item) => { return acc + item}, 0);
                        cart.setQuantity(length);

                    })
                    .catch((e) => {
                        console.log(e);
                    });
        }
    }, []);

    function getLoginCustomer() {
        store.receiveCustomerById();
    }

    // const { authed, logout } = UserAuth();
    return (
        <Row
            className="header__container"
            justify="space-evenly"
            wrap={false}
            style={{ position: 'relative', zIndex: 2 }}
        >
            <Col className="header__item" onClick={() => {}}>
                <Link to="/" className="header__item_link">
                    Main page
                </Link>
            </Col>
            <Col className="header__item">
                <Link className="header__item_link" to="/catalog">
                    Catalog page
                </Link>
            </Col>
            <Col className="header__item" onClick={() => {}}>
                <Link className="header__item_link" to="/about">
                    About Us
                </Link>
            </Col>
            <Col className="header__item" onClick={() => {}}>
                <Link className="header__item_link" to="/basket" style={{ display: 'flex', gap: 5 }}>
                    <p style={{ fontSize: 18 }}>Basket page</p>
                    <div style={{ position: 'relative', display: 'flex' }}>
                        <img src={BasketImg} alt="basket" style={{ maxHeight: 25, minWidth: 40 }} />
                        <p style={{ position: 'absolute', bottom: 0, right: 0 }}>{cart.getQuantity()}</p>
                    </div>
                </Link>
            </Col>

            <Col className="header__buttons-block">
                <Button type="primary">
                    {store.isAuth && (
                        <Link
                            to="/"
                            onClick={() => {
                                store.logout();
                                cart.setProducts([]);
                            }}
                        >
                            Log Out
                        </Link>
                    )}
                    {!store.isAuth && <Link to="/login">Log In</Link>}
                </Button>
                <Button>
                    <Link to="/registration">Registration</Link>
                </Button>
                <Button type="dashed" style={{ display: store.isAuth === true ? 'block' : 'none' }}>
                    <Link
                        to="/my-profile"
                        onClick={() => {
                            if (store.isAuth) {
                                getLoginCustomer();
                            }
                        }}
                    >
                        My profile
                    </Link>
                </Button>
            </Col>
        </Row>
    );
};

export default observer(Header);
