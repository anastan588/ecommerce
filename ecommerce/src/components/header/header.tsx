import { Button, Col, Row } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RegistrationPage from '../registration_page/RegistrationPage';
import { Context } from '../..';

const Header = () => {
    const { store } = useContext(Context);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, []);

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
                <Button type="dashed">
                    <Link to="/my-profile">My profile</Link>
                </Button>
            </Col>
        </Row>
    );
};

export default observer(Header);
