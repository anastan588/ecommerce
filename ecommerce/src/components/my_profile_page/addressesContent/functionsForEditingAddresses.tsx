import React, { ReactElement, useState, useContext, ReactNode } from 'react';
import { Button, Card, Input, Form, Typography, theme, Layout, Select, Checkbox } from 'antd';
import { EditOutlined, ScissorOutlined } from '@ant-design/icons';
import { Values } from './allAddresses';
import { Context } from '../../..';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;
let version = 0;

function AddressComponentEditingForm() {
    const customerJSON = localStorage.getItem('currentCustomer') as string;
    const customer = JSON.parse(customerJSON);
    const { store } = useContext(Context);
    const [text, setText] = useState(customer);
    const [isEdit, setIsEdit] = useState(false);
    return (
        <React.Fragment>
            {customer.body.addresses.map((element: Values) => {
                return (
                    <div
                        key={element.id}
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
                                    }}
                                >
                                    Address
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 10, alignSelf: 'center' }}>
                                <Button
                                    onClick={() => {
                                        setIsEdit(true);
                                        console.log(isEdit);
                                    }}
                                >
                                    Save
                                </Button>
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
                                    value: element.streetName,
                                },
                                {
                                    name: ['city'],
                                    value: element.city,
                                },
                                {
                                    name: ['postcode'],
                                    value: element.postalCode,
                                },
                                {
                                    name: ['country'],
                                    value: element.country,
                                },
                            ]}
                            onFinish={() => {
                                setIsEdit(false);
                                // sendUpdateCustomerToServer(version).then(() => notifyFirstName());
                                // console.log(customer.body.firstName);
                            }}
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
                                                value={element.streetName}
                                                onChange={(event) => {
                                                    const newElement = { ...element };
                                                    newElement.streetName = event.target.value;
                                                    version = customer.body.version;
                                                    console.log(customer);
                                                    const customerUpdate = JSON.stringify(customer);
                                                    localStorage.removeItem('currentCustomer');
                                                    localStorage.setItem('currentCustomer', customerUpdate);
                                                    setText(customer);
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
                                                value={element.city}
                                                onChange={(event) => {
                                                    const newElement = { ...element };
                                                    newElement.city = event.target.value;
                                                    version = customer.body.version;
                                                    console.log(customer);
                                                    const customerUpdate = JSON.stringify(customer);
                                                    localStorage.removeItem('currentCustomer');
                                                    localStorage.setItem('currentCustomer', customerUpdate);
                                                    setText(customer);
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
                                                value={element.postalCode}
                                                onChange={(event) => {
                                                    const newElement = { ...element };
                                                    newElement.postalCode = event.target.value;
                                                    version = customer.body.version;
                                                    console.log(customer);
                                                    const customerUpdate = JSON.stringify(customer);
                                                    localStorage.removeItem('currentCustomer');
                                                    localStorage.setItem('currentCustomer', customerUpdate);
                                                    setText(customer);
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
                                                    { value: 'BL', label: 'Belarus' },
                                                    { value: 'KZ', label: 'Kazakhstan' },
                                                    { value: 'LT', label: 'Lithuania' },
                                                    { value: 'PL', label: 'Poland' },
                                                    { value: 'RU', label: 'Russia' },
                                                    { value: 'UA', label: 'Ukraine' },
                                                ]}
                                                value={element.country}
                                                onChange={(value) => {
                                                    const newElement = { ...element };
                                                    newElement.country = value;
                                                    version = customer.body.version;
                                                    console.log(customer);
                                                    const customerUpdate = JSON.stringify(customer);
                                                    localStorage.removeItem('currentCustomer');
                                                    localStorage.setItem('currentCustomer', customerUpdate);
                                                    setText(customer);
                                                }}
                                            />
                                        </Form.Item>
                                    </Card>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                    <Card
                                        type="inner"
                                        title="Shipping Address settings:"
                                        style={{
                                            flexBasis: '45%',
                                        }}
                                        headStyle={{ lineHeight: '1.0', minHeight: '35px' }}
                                        bodyStyle={{
                                            lineHeight: '1.0',
                                            minHeight: '30px',
                                            padding: '10px 10px 10px 10px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 10,
                                        }}
                                    >
                                        <Card
                                            type="inner"
                                            title="Shipping Address:"
                                            style={{
                                                fontWeight: 'bold',
                                            }}
                                            headStyle={{ lineHeight: '1.0', minHeight: '35px' }}
                                            bodyStyle={{
                                                lineHeight: '1.0',
                                                minHeight: '30px',
                                                padding: '10px 10px 10px 24px',
                                            }}
                                        >
                                            <Form.Item name="shipAddress" style={{ width: '80%' }}>
                                                <Checkbox
                                                    style={{ width: '100%' }}
                                                    onChange={(event) => {
                                                        const newElement = { ...element };
                                                        const check = event.target.checked;
                                                        console.log(check);
                                                        // newElement.country = 'true';
                                                        version = customer.body.version;
                                                        console.log(customer);
                                                        const customerUpdate = JSON.stringify(customer);
                                                        localStorage.removeItem('currentCustomer');
                                                        localStorage.setItem('currentCustomer', customerUpdate);
                                                        setText(customer);
                                                    }}
                                                />
                                            </Form.Item>
                                        </Card>
                                        <Card
                                            type="inner"
                                            title="Default Shipping Address:"
                                            style={{
                                                fontWeight: 'bold',
                                            }}
                                            headStyle={{ lineHeight: '1.0', minHeight: '35px' }}
                                            bodyStyle={{
                                                lineHeight: '1.0',
                                                minHeight: '30px',
                                                padding: '10px 10px 10px 24px',
                                            }}
                                        >
                                            <Form.Item name="dafaultShip" style={{ width: '80%' }}>
                                                <Checkbox
                                                    style={{ width: '100%' }}
                                                    onChange={(event) => {
                                                        const newElement = { ...element };
                                                        const check = event.target.checked;
                                                        console.log(check);
                                                        // newElement.country = 'true';
                                                        version = customer.body.version;
                                                        console.log(customer);
                                                        const customerUpdate = JSON.stringify(customer);
                                                        localStorage.removeItem('currentCustomer');
                                                        localStorage.setItem('currentCustomer', customerUpdate);
                                                        setText(customer);
                                                    }}
                                                />
                                            </Form.Item>
                                        </Card>
                                    </Card>
                                    <Card
                                        type="inner"
                                        title="Shipping Address settings:"
                                        style={{
                                            flexBasis: '45%',
                                        }}
                                        headStyle={{ lineHeight: '1.0', minHeight: '35px' }}
                                        bodyStyle={{
                                            lineHeight: '1.0',
                                            minHeight: '30px',
                                            padding: '10px 10px 10px 10px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 10,
                                        }}
                                    >
                                        <Card
                                            type="inner"
                                            title="Billing Address:"
                                            style={{
                                                fontWeight: 'bold',
                                            }}
                                            headStyle={{ lineHeight: '1.0', minHeight: '35px' }}
                                            bodyStyle={{
                                                lineHeight: '1.0',
                                                minHeight: '30px',
                                                padding: '10px 10px 10px 24px',
                                            }}
                                        >
                                            <Form.Item name="billAddress" style={{ width: '80%' }}>
                                                <Checkbox
                                                    style={{ width: '100%' }}
                                                    onChange={(event) => {
                                                        const newElement = { ...element };
                                                        const check = event.target.checked;
                                                        console.log(check);
                                                        // newElement.country = 'true';
                                                        version = customer.body.version;
                                                        console.log(customer);
                                                        const customerUpdate = JSON.stringify(customer);
                                                        localStorage.removeItem('currentCustomer');
                                                        localStorage.setItem('currentCustomer', customerUpdate);
                                                        setText(customer);
                                                    }}
                                                />
                                            </Form.Item>
                                        </Card>
                                        <Card
                                            type="inner"
                                            title="Default Billing Address:"
                                            style={{
                                                fontWeight: 'bold',
                                            }}
                                            headStyle={{ lineHeight: '1.0', minHeight: '30px' }}
                                            bodyStyle={{
                                                lineHeight: '1.0',
                                                minHeight: '30px',
                                                padding: '10px 10px 10px 24px',
                                            }}
                                        >
                                            <Form.Item name="dafaultBill" style={{ width: '80%' }}>
                                                <Checkbox
                                                    style={{ width: '100%' }}
                                                    onChange={(event) => {
                                                        const newElement = { ...element };
                                                        const check = event.target.checked;
                                                        console.log(check);
                                                        // newElement.country = 'true';
                                                        version = customer.body.version;
                                                        console.log(customer);
                                                        const customerUpdate = JSON.stringify(customer);
                                                        localStorage.removeItem('currentCustomer');
                                                        localStorage.setItem('currentCustomer', customerUpdate);
                                                        setText(customer);
                                                    }}
                                                />
                                            </Form.Item>
                                        </Card>
                                    </Card>
                                </div>
                            </div>
                        </Form>
                    </div>
                );
            })}
        </React.Fragment>
    );
}

export default AddressComponentEditingForm;
