import React from 'react';
import { Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import registyles from '../registration_page/regisration_page.module.css';

const { Title } = Typography;

const CreateCustomerMessage = () => {
    return (
        <div className={registyles.registration__page}>
            <div className={registyles.registration__container}>
                <Title
                    className={registyles.title_registration_main}
                    level={2}
                    style={{ marginBottom: 0, color: '#2e2ed2' }}
                >
                    Customer has been successfully created
                </Title>
                <Button type="primary">
                    <Link to="/">Ok</Link>
                </Button>
            </div>
        </div>
    );
};

export default CreateCustomerMessage;
