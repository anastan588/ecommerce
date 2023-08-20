import { Button, Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import RegistrationPage from '../registration_page/RegistrationPage';

const Header = () => {
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
                    <Link to="/login">Log In</Link>
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

export default Header;
