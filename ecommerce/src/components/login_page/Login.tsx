import React, { useContext, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
// eslint-disable-next-line import/no-extraneous-dependencies, import/order
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
// eslint-disable-next-line import/order
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { observer } from 'mobx-react-lite';
import { projectKey } from './BuildClient';
import { getPasswordFlowClient } from './createClient';
import { Context } from '../..';

type FieldType = {
    email?: string;
    password?: string;
    isVisible?: string;
    remember?: string;
};

type Values = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { store } = useContext(Context);

    /* const createCustomer = () => {
        return apiRoot
            .customers()
            .post({
                // The CustomerDraft is the object within the body
                body: {
                    email: 'sdkTwo@exampleee.com',
                    password: 'examplePassword1234',
                },
            })
            .execute();
    }; */

    const navigate = useNavigate();
    const onFinish = (values: Values) => {
        const cartIdAnonim = localStorage.getItem('cartIdAnonim');
        let login;
        if (cartIdAnonim !== null) {
            login = store.login(values.email, values.password, cartIdAnonim);
            localStorage.removeItem('cartIdAnonim');
        } else {
            login = store.login(values.email, values.password);
        }
        login.then(() => {
            console.log('sucsess');
            navigate('/');
            const customer = getPasswordFlowClient(values.email, values.password);
            const apiRootClient = createApiBuilderFromCtpClient(customer);
            const endPointPassword = () => {
                return apiRootClient.withProjectKey({ projectKey }).me().get().execute();
            };
            // eslint-disable-next-line @typescript-eslint/no-shadow
            endPointPassword()
                // eslint-disable-next-line @typescript-eslint/no-shadow
                .then(({ body }) => {
                    console.log(body);
                    localStorage.setItem('id', body.id);
                })
                .catch(({ error }) => {
                    console.log(error);
                });
        });
    };
    const onFinishFailed = (errorInfo: ValidateErrorEntity<Values>) => {
        const str1 = errorInfo.errorFields[0].errors.join(', ');
        // eslint-disable-next-line no-alert
        alert(`${str1}`);
    };

    return (
        <Form
            name="basic"
            className="form"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            style={{
                maxWidth: 600,
                position: 'relative',
                zIndex: 1,
                backgroundColor: 'rgba(250, 240, 190, 0.5)',
                padding: 15,
                borderRadius: 5,
            }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Please, input your email!' },
                    { type: 'email' },
                    { pattern: /\S$/, message: 'Email must not contain trailing whitespace' },
                    { pattern: /^\S/, message: 'Email must not contain leading whitespace' },
                    {
                        pattern: /[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
                        message:
                            'Email address must contain a domain name (e.g., example.com) and must contain an "@" symbol separating local part and domain name',
                    },
                ]}
            >
                <Input value={email} />
            </Form.Item>
            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[
                    { required: true, message: 'Please, input your password!' },
                    { pattern: /\S$/, message: 'Password must not contain trailing whitespace' },
                    { pattern: /^\S/, message: 'Password must not contain leading whitespace' },
                    { pattern: /.{8}/, message: 'Password must be at least 8 characters long' },
                    { pattern: /[A-Z]/, message: 'Password must contain at least one uppercase letter (A-Z)' },
                    { pattern: /[a-z]/, message: 'Password must contain at least one lowercase letter (a-z)' },
                    { pattern: /\d/, message: 'Password must contain at least one digit (0-9)' },
                ]}
            >
                <Input.Password value={password} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
            </Form.Item>
            <Form.Item<FieldType> wrapperCol={{ offset: 10, span: 16 }}>
                <Link to="/registration">Or register now!</Link>
            </Form.Item>
        </Form>
    );
};

export default observer(Login);
