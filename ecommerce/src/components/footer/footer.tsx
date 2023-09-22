import { Button, Col, Row } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link } from 'react-router-dom';
import RsImage from '../../images/icon/rs_school.svg';

const Footer = () => {
    return (
        <Row
            style={{
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: 5,
                position: 'relative',
                zIndex: 2,
            }}
        >
            <Col
                className="header__item"
                style={{
                    cursor: 'pointer',
                }}
            >
                <Link style={{ transition: 'all 0.5s ease' }} to="https://rs.school/js/" target="_blank">
                    <img src={RsImage} alt="rsSchool" style={{ maxHeight: 30 }} />
                </Link>
            </Col>
        </Row>
    );
};

export default Footer;
