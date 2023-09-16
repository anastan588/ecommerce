import { Button, Col, Row } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RegistrationPage from '../registration_page/RegistrationPage';
import { Context } from '../..';
import Store from '../login_page/store';
import { getLocalStorage } from '../login_page/BuildClient';
import { getCartsProduct } from '../catalog_page/requests';

const Header = () => {
    const { store, cart } = useContext(Context);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
            const tokenStore = getLocalStorage();
    console.log(tokenStore);
    const { refreshToken } = tokenStore;
    if (refreshToken)
            getCartsProduct(refreshToken)
                .then((body) => {
                    console.log(body);
                    const cartId = body.body.id;
                    const { version } = body.body;
                    console.log(cartId);
                    console.log(version);
                    const cartObj = []
                    cartObj.push({cartId, version});
                    cart.setCart(cartObj);
                    const arr = body.body.lineItems;
                    console.log(arr);
                    cart.setProducts(arr);
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
        <Row className="header__container" justify="space-evenly" wrap={false}>
            <Col className="header__item" onClick={() => console.log('main page')}>
                <Link to="/" className="header__item_link">
                    Main page
                </Link>
            </Col>
            <Col className="header__item">
                <Link className="header__item_link" to="/catalog">
                    Catalog page
                </Link>
            </Col>
            <Col className="header__item" onClick={() => console.log('about us page')}>
                <Link className="header__item_link" to="/about">
                    About Us
                </Link>
            </Col>
            <Col className="header__item" onClick={() => console.log('basket page')}>
                <Link className="header__item_link" to="/basket">
                    Basket page
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
