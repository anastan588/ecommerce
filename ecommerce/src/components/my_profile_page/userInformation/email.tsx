import React, { ReactElement, useState, useContext } from 'react';
import { Button, Card, Input, Form } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../..';

let version = 0;

function EmailEdit() {
    const notifyEmailSuccess = () => {
        console.log('notify');
        toast.success('Email was updated', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };
    const notifyEmailError = () => {
        console.log('notify');
        toast.error(`Current email already exists`, {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };
    const { store } = useContext(Context);
    function sendUpdateCustomerToServer(vers: number) {
        return store.updateCustomer(vers);
    }
    const customerJSON = localStorage.getItem('currentCustomer') as string;
    const customer = JSON.parse(customerJSON);
    const [text, setText] = useState(customer);
    const [isEdit, setIsEdit] = useState(false);
    let returnEmail: ReactElement = <div>{text.body.email}</div>;

    if (isEdit) {
        returnEmail = (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Form
                    style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
                    name="email"
                    className="form"
                    wrapperCol={{ span: 30 }}
                    initialValues={{ remember: true }}
                    fields={[
                        {
                            name: ['email'],
                            value: text.body.email,
                        },
                    ]}
                    // autoComplete="off"
                    onFinish={() => {
                        setIsEdit(false);
                        sendUpdateCustomerToServer(version)
                            .then(() => notifyEmailSuccess())
                            .catch(() => notifyEmailError());
                        console.log(customer.body.dateOfBirth);
                    }}
                >
                    <Form.Item
                        name="email"
                        style={{ width: '80%' }}
                        rules={[
                            { required: true, message: 'Please, enter your email' },
                            { pattern: /\S$/, message: 'Email must not contain trailing whitespace' },
                            { pattern: /^\S/, message: 'Email must not contain leading whitespace' },
                            {
                                pattern: /[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
                                message:
                                    'Email address must contain a domain name (e.g., example.com) and must contain an "@" symbol separating local part and domain name',
                            },
                        ]}
                    >
                        <Input
                            style={{ width: '100%' }}
                            value={text.body.email}
                            onChange={(event) => {
                                console.log(text.body.email);
                                console.log(event.target.value);
                                customer.body.email = event.target.value;
                                version = customer.body.version;
                                console.log(customer);
                                const customerUpdate = JSON.stringify(customer);
                                localStorage.removeItem('currentCustomer');
                                localStorage.setItem('currentCustomer', customerUpdate);
                                setText(customer);
                            }}
                        />
                    </Form.Item>
                    <div>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </div>
                </Form>
            </div>
        );
    } else {
        returnEmail = <div>{text.body.email}</div>;
    }

    return (
        <Card
            type="inner"
            title="E-mail"
            extra={
                <Button
                    icon={<EditOutlined />}
                    onClick={() => {
                        setIsEdit(true);
                        console.log(isEdit);
                    }}
                >
                    Edit
                </Button>
            }
        >
            {returnEmail}
        </Card>
    );
}

export default EmailEdit;
