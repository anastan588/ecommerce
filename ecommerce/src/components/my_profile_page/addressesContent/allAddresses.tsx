import React, { ReactElement, useState, useContext, ReactNode } from 'react';
import { Button, Card, Input, Form, Layout, Modal, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { observer } from 'mobx-react-lite';
import ReactDOM from 'react-dom';
import { Context } from '../../..';
import { AddressComponent } from './functionsForDisplaingAddresses';

const { Header } = Layout;
let version = 0;

export type Values = {
    id: string;
    streetName: string;
    city: string;
    postalCode: string;
    country: string;
};
export type NewAddress = {
    streetName: string;
    city: string;
    postalCode: string;
    country: string;
};

type FieldType = {
    streetName: string;
    city: string;
    postalCode: string;
    country: string;
};

function AddRessesEdit() {
    const notifyAddressAdd = () => {
        toast.success('New address was added', {
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
    function sendUpdateAddressToServer(vers: number) {
        return store.updateCustomer(vers);
    }

    const address: NewAddress = {
        streetName: '',
        city: '',
        postalCode: '',
        country: '',
    };
    const customerJSON = localStorage.getItem('currentCustomer') as string;
    const customer = JSON.parse(customerJSON);
    const [text, setText] = useState(address);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateCustomer, setState] = useState(customer);

    const showModal = () => {
        const newcustomerJSON = localStorage.getItem('currentCustomer') as string;
        const customerUpdate = JSON.parse(newcustomerJSON);
        setState(customerUpdate);
        setTimeout(() => {
            setIsModalOpen(true);
        }, 0);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    function handleOk() {
        setIsModalOpen(false);
        store.addAddress(version, text).then(() => {
            notifyAddressAdd();
            const newcustomerJSON = localStorage.getItem('currentCustomer') as string;
            const customerUpdate = JSON.parse(newcustomerJSON);
            setState(customerUpdate);
        });
    }
    function MakeAddressesList() {
        return (
            <React.Fragment>
                <Button type="primary" icon={<PlusOutlined />} onClick={showModal} style={{ width: 150 }}>
                    Add Address
                </Button>
                <Modal
                    title="Add new address"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    style={{ maxWidth: '100%', minWidth: '85%' }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 10,
                            border: 'solid 1px #9a9a9a',
                            borderRadius: '15px',
                            padding: '10px 10px 10px 10px',
                        }}
                    >
                        <Header
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '2px 10px 5px 10px',
                                alignItems: 'center',
                                height: 'auto',
                                lineHeight: '1.0',
                                background: '#9a9a9a',
                                borderRadius: 15,
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                }}
                            >
                                <div
                                    style={{
                                        fontWeight: 'bold',
                                        padding: 10,
                                    }}
                                >
                                    Address
                                </div>
                            </div>
                        </Header>
                        <Form
                            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
                            name="address"
                            className="form"
                            initialValues={{ remember: true }}
                            fields={[
                                {
                                    name: ['street'],
                                    value: text.streetName,
                                },
                                {
                                    name: ['city'],
                                    value: text.city,
                                },
                                {
                                    name: ['postcode'],
                                    value: text.postalCode,
                                },
                                {
                                    name: ['country'],
                                    value: text.country,
                                },
                            ]}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 10,
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                    <Card
                                        type="inner"
                                        title="Street"
                                        style={{ flexBasis: '23%' }}
                                        headStyle={{ lineHeight: '1.0', minHeight: '30px' }}
                                        bodyStyle={{
                                            lineHeight: '1.0',
                                            minHeight: '30px',
                                            padding: '10px 10px 10px 24px',
                                        }}
                                    >
                                        <Form.Item
                                            name="street"
                                            style={{ width: '80%' }}
                                            rules={[
                                                { required: true, message: 'Please, enter street' },
                                                {
                                                    message: `Street must be at least 1 characters long`,
                                                    validator: (_, value) => {
                                                        if (/.{1}/.test(value)) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(
                                                            new Error(`Street must be at least 1 characters long`)
                                                        );
                                                    },
                                                },
                                            ]}
                                        >
                                            <Input
                                                style={{ width: '100%' }}
                                                type="text"
                                                value={text.streetName}
                                                onChange={(event) => {
                                                    text.streetName = event.target.value;
                                                    setText(text);
                                                    version = customer.body.version;
                                                }}
                                            />
                                        </Form.Item>
                                    </Card>
                                    <Card
                                        type="inner"
                                        title="City"
                                        style={{ flexBasis: '23%' }}
                                        headStyle={{ lineHeight: '1.0', minHeight: '30px' }}
                                        bodyStyle={{
                                            lineHeight: '1.0',
                                            minHeight: '30px',
                                            padding: '10px 10px 10px 24px',
                                        }}
                                    >
                                        <Form.Item
                                            name="city"
                                            style={{ width: '80%' }}
                                            rules={[
                                                { required: true, message: 'Please, enter city' },
                                                {
                                                    message: `City shouldn't contain numbers and special characters`,
                                                    validator: (_, value) => {
                                                        if (
                                                            /\d/.test(value) &&
                                                            /[\\^$.[\]|~`?!@#$%&\-_={}:;"'<>.,*+()]/.test(value)
                                                        ) {
                                                            return Promise.reject(
                                                                new Error(
                                                                    `City shouldn't contain numbers and special characters`
                                                                )
                                                            );
                                                        }
                                                        return Promise.resolve();
                                                    },
                                                },
                                                {
                                                    message: `City must be at least 1 characters long`,
                                                    validator: (_, value) => {
                                                        if (/.{1}/.test(value)) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(
                                                            new Error(`City must be at least 1 characters long`)
                                                        );
                                                    },
                                                },
                                                {
                                                    message: `City shouldn't contain special characters`,
                                                    validator: (_, value) => {
                                                        if (/[\\^$.[\]|~`?!@#$%&\-_={}:;"'<>.,*+()]/.test(value)) {
                                                            return Promise.reject(
                                                                new Error(`City shouldn't contain special characters`)
                                                            );
                                                        }
                                                        return Promise.resolve();
                                                    },
                                                },
                                                {
                                                    message: `City shouldn't contain numbers`,
                                                    validator: (_, value) => {
                                                        if (/\d/.test(value)) {
                                                            return Promise.reject(
                                                                new Error(`City shouldn't contain numbers`)
                                                            );
                                                        }
                                                        return Promise.resolve();
                                                    },
                                                },
                                            ]}
                                        >
                                            <Input
                                                style={{ width: '100%' }}
                                                type="text"
                                                value={text.city}
                                                onChange={(event) => {
                                                    text.city = event.target.value;
                                                    setText(text);
                                                    version = customer.body.version;
                                                }}
                                            />
                                        </Form.Item>
                                    </Card>
                                    <Card
                                        type="inner"
                                        title="Postal Code"
                                        style={{ flexBasis: '23%' }}
                                        headStyle={{ lineHeight: '1.0', minHeight: '30px' }}
                                        bodyStyle={{
                                            lineHeight: '1.0',
                                            minHeight: '30px',
                                            padding: '10px 10px 10px 24px',
                                        }}
                                    >
                                        <Form.Item
                                            name="postcode"
                                            style={{ width: '80%' }}
                                            rules={[{ required: true, message: 'Please, enter postal code' }]}
                                        >
                                            <Input
                                                style={{ width: '100%' }}
                                                type="text"
                                                value={text.postalCode}
                                                onChange={(event) => {
                                                    text.postalCode = event.target.value;
                                                    setText(text);
                                                    version = customer.body.version;
                                                }}
                                            />
                                        </Form.Item>
                                    </Card>
                                    <Card
                                        type="inner"
                                        title="Country"
                                        style={{ flexBasis: '23%' }}
                                        headStyle={{ lineHeight: '1.0', minHeight: '30px' }}
                                        bodyStyle={{
                                            lineHeight: '1.0',
                                            minHeight: '30px',
                                            padding: '10px 10px 10px 24px',
                                        }}
                                    >
                                        <Form.Item
                                            name="country"
                                            style={{ width: '80%' }}
                                            rules={[{ required: true, message: 'Please, choose country' }]}
                                        >
                                            <Select
                                                style={{ width: '100%' }}
                                                options={[
                                                    { value: `BL`, label: 'Belarus' },
                                                    { value: `KZ`, label: 'Kazakhstan' },
                                                    { value: `LT`, label: 'Lithuania' },
                                                    { value: `PL`, label: 'Poland' },
                                                    { value: `RU`, label: 'Russia' },
                                                    { value: `UA`, label: 'Ukraine' },
                                                ]}
                                                value={text.country}
                                                onChange={(value) => {
                                                    text.country = value;
                                                    setText(text);
                                                    version = customer.body.version;
                                                }}
                                            />
                                        </Form.Item>
                                    </Card>
                                </div>
                            </div>
                        </Form>
                    </div>
                </Modal>
                {updateCustomer.body.addresses.map((element: Values) => {
                    return AddressComponent(element);
                })}
            </React.Fragment>
        );
    }
    // function update() {
    //     MakeAddressesList.forceUpdate();
    // }

    return (
        <Card
            title="User's addresses"
            bodyStyle={{
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                padding: '0px 15px 0px 15px',
            }}
        >
            <MakeAddressesList />
        </Card>
    );
}

export default AddRessesEdit;
