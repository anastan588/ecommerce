import React, { ReactElement, useState, useContext } from 'react';
import { Button, Card, Input, Form } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../..';

let version = 0;

function LastNameEdit() {
    const notifyLastName = () => {
        console.log('notify');
        toast.info('Last name was updated', {
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
    // console.log(customerJSON);
    const customer = JSON.parse(customerJSON);
    // console.log(customer);
    // console.log(customer.body.firstName);
    const [text, setText] = useState(customer);
    const [isEdit, setIsEdit] = useState(false);
    let returnLastname: ReactElement = <div>{text.body.lastName}</div>;

    if (isEdit) {
        returnLastname = (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Form
                    style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
                    name="surname"
                    className="form"
                    wrapperCol={{ span: 30 }}
                    // style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    fields={[
                        {
                            name: ['surname'],
                            value: text.body.lastName,
                        },
                    ]}
                    // autoComplete="off"
                    onFinish={() => {
                        setIsEdit(false);
                        sendUpdateCustomerToServer(version).then(() => notifyLastName());
                        console.log(customer.body.lastName);
                    }}
                >
                    <Form.Item
                        name="surname"
                        style={{ width: '80%' }}
                        rules={[
                            { required: true, message: 'Please, enter your last name' },
                            {
                                message: `Last name shouldn't contain numbers and special characters`,
                                validator: (_, value) => {
                                    if (/\d/.test(value) && /[\\^$.[\]|~`?!@#$%&\-_={}:;"'<>.,*+()]/.test(value)) {
                                        return Promise.reject(
                                            new Error(`Last name shouldn't contain numbers and special characters`)
                                        );
                                    }
                                    return Promise.resolve();
                                },
                            },
                            {
                                message: `Last name must be at least 1 characters long`,
                                validator: (_, value) => {
                                    if (/.{1}/.test(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(`Last name must be at least 1 characters long`));
                                },
                            },
                            {
                                message: `Last name shouldn't contain special characters`,
                                validator: (_, value) => {
                                    if (/[\\^$.[\]|~`?!@#$%&\-_={}:;"'<>.,*+()]/.test(value)) {
                                        return Promise.reject(
                                            new Error(`Last name shouldn't contain special characters`)
                                        );
                                    }
                                    return Promise.resolve();
                                },
                            },
                            {
                                message: `Last name shouldn't contain numbers`,
                                validator: (_, value) => {
                                    if (/\d/.test(value)) {
                                        return Promise.reject(new Error(`Last name shouldn't contain numbers`));
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <Input
                            style={{ width: '100%' }}
                            type="text"
                            value={text.body.lastName}
                            onChange={(event) => {
                                console.log(text.body.lastName);
                                console.log(event.target.value);
                                customer.body.lastName = event.target.value;
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
        returnLastname = <div>{text.body.lastName}</div>;
    }

    return (
        <Card
            type="inner"
            title="Last name"
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
            {returnLastname}
        </Card>
    );
}

export default LastNameEdit;
