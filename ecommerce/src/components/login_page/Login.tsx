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
import { apiRoot, getPasswordFlowClient } from './createClient';
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

type Error = {
    errorFields: string[];
};

const getEndPoint = (email: string, password: string) => {
    return apiRoot
        .login()
        .post({
            body: {
                email: `${email}`,
                password: `${password}`,
            },
        })
        .execute();
};

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formValid, setFormValid] = useState(false);
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
    };

    // Create the customer and output the Customer ID
    createCustomer()
        .then(({ body }) => {
            console.log(body.customer.id);
        })
        .catch(console.error); */
    /* class Token implements TokenCache {
        tokenStore: TokenStore | undefined;

        get() {
            return this.tokenStore;
        }

        set(cache: TokenStore) {
            this.tokenStore = cache;
        }
    } */

    const navigate = useNavigate();
    const onFinish = (values: Values) => {
        console.log(values.email);
        console.log(values.password);
        console.log('Success:', values);
        const login = store.login(values.email, values.password);
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
                })
                .catch(({ error }) => {
                    console.log(error);
                });
        });
        /* getEndPoint(values.email, values.password)
            .then(({ body }) => {
                console.log(body.customer.id);
                const { id } = body.customer;
                alert('Succsessfulu submited');
                navigate('/');
                const customer = getPasswordFlowClient(values.email, values.password);

                /* const tokenCacheOptions: TokenCacheOptions = {
                    clientId: `${ADMIN_CLIENT_ID}`,
                    projectKey: `${CTP_PROJECT_KEY}`,
                    host: `https://auth.${CTP_AUTH_URL}.commercetools.com`,
                }; */

        /* const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
                    host: `https://api.${CTP_AUTH_URL}.commercetools.com`,
                    credentials: {
                        clientId: `${ADMIN_CLIENT_ID}`,
                        clientSecret: `${ADMIN_CLIENT_SECRET}`,
                        user: {
                            username: email,
                            password,
                        },
                    },
                    projectKey: `${CTP_PROJECT_KEY}`,
                }; */
        /* const apiRootClient = createApiBuilderFromCtpClient(customer);

                const endPointPassword = () => {
                    return apiRootClient.withProjectKey({ projectKey }).me().get().execute();
                };
                // eslint-disable-next-line @typescript-eslint/no-shadow
                endPointPassword()
                    // eslint-disable-next-line @typescript-eslint/no-shadow
                    .then(({ body }) => {
                        console.log(body);
                    })
                    .catch(({ error }) => {
                        console.log(error);
                    });
            })
            .catch(console.error); */
    };
    const onFinishFailed = (errorInfo: ValidateErrorEntity<Values>) => {
        console.log(errorInfo.errorFields);
        console.log(errorInfo.errorFields[1].errors[1]);
        const str1 = errorInfo.errorFields[0].errors.join(', ');
        console.log(`${str1}`);
        alert(`${str1}`);
        console.log('Failed:', errorInfo);
    };
    /* getProject().then(console.log).catch(console.error);

    const returnCustomerByEmail = (customerEmail: string) => {
        return apiRoot
            .customers()
            .get({
                queryArgs: {
                    where: `email="${customerEmail}"`,
                },
            })
            .execute();
    };
    returnCustomerByEmail('sdk@example.com')
        .then(({ body }) => {
            // As email addresses must be unique, either 0 or 1 Customers will be returned.
            // If 0, then no Customer exists with this email address.
            if (body.results.length === 0) {
                console.log('This email address has not been registered.');
            } else {
                // Since there can be only one Customer resource in the result, it must be the first entry of the results array. This outputs the Customer's id.
                console.log(body.results[0].id);
            }
        })
        .catch(console.error); */

    return (
        <Form
            name="basic"
            className="form"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
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
                    { pattern: /^\S?\S/, message: 'Email address must not contain leading or trailing whitespace' },
                    {
                        pattern: /[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
                        message: 'Email address must contain a domain name (e.g., example.com)',
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
                    { pattern: /.{8}/, message: 'Password must be at least 8 characters long' },
                    { pattern: /[A-Z]/, message: 'Password must contain at least one uppercase letter (A-Z)' },
                    { pattern: /[a-z]/, message: 'Password must contain at least one lowercase letter (a-z)' },
                    { pattern: /\d/, message: 'Password must not contain leading or trailing whitespace' },
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
