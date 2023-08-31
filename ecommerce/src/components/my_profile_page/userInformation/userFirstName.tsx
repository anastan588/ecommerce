import React, { ReactElement, useState, useContext } from 'react';
import { Button, Card, Input, Form } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../..';

let version = 0;

function FirstNameEdit() {
    const notifyFirstName = () => {
        console.log('notify');
        toast.info('First name was updated', {
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
    let returnFirstname: ReactElement = <div>{text.body.firstName}</div>;

    if (isEdit) {
        returnFirstname = (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Form
                    style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
                    name="name"
                    className="form"
                    wrapperCol={{ span: 30 }}
                    // style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    fields={[
                        {
                            name: ['name'],
                            value: text.body.firstName,
                        },
                    ]}
                    // autoComplete="off"
                    onFinish={() => {
                        setIsEdit(false);
                        sendUpdateCustomerToServer(version).then(() => notifyFirstName());
                        console.log(customer.body.firstName);
                    }}
                >
                    <Form.Item
                        name="name"
                        style={{ width: '80%' }}
                        rules={[
                            { required: true, message: 'Please, enter your first name' },
                            {
                                message: `First name shouldn't contain numbers and special characters`,
                                validator: (_, value) => {
                                    if (/\d/.test(value) && /[\\^$.[\]|~`?!@#$%&\-_={}:;"'<>.,*+()]/.test(value)) {
                                        return Promise.reject(
                                            new Error(`First name shouldn't contain numbers and special characters`)
                                        );
                                    }
                                    return Promise.resolve();
                                },
                            },
                            {
                                message: `First name must be at least 1 characters long`,
                                validator: (_, value) => {
                                    if (/.{1}/.test(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(`First name must be at least 1 characters long`));
                                },
                            },
                            {
                                message: `First name shouldn't contain special characters`,
                                validator: (_, value) => {
                                    if (/[\\^$.[\]|~`?!@#$%&\-_={}:;"'<>.,*+()]/.test(value)) {
                                        return Promise.reject(
                                            new Error(`First name shouldn't contain special characters`)
                                        );
                                    }
                                    return Promise.resolve();
                                },
                            },
                            {
                                message: `First name shouldn't contain numbers`,
                                validator: (_, value) => {
                                    if (/\d/.test(value)) {
                                        return Promise.reject(new Error(`First name shouldn't contain numbers`));
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <Input
                            style={{ width: '100%' }}
                            type="text"
                            value={text.body.firstName}
                            onChange={(event) => {
                                console.log(text.body.firstName);
                                console.log(event.target.value);
                                customer.body.firstName = event.target.value;
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
                        <Button
                            type="primary"
                            htmlType="submit"
                            // onClick={() => {
                            //     setIsEdit(false);
                            //     sendUpdateCustomerToServer(version).then(() => notifyFirstName());
                            //     console.log(customer.body.firstName);
                            // }}
                        >
                            Save
                        </Button>
                    </div>
                </Form>
            </div>
        );
    } else {
        returnFirstname = <div>{text.body.firstName}</div>;
    }

    return (
        <Card
            type="inner"
            title="First name"
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
            {returnFirstname}
        </Card>
    );
}

export default FirstNameEdit;
