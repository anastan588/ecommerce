import React, { ReactElement, useState, useContext, ReactNode } from 'react';
import { Button, Card, Input, Form, Typography, theme, Layout, Select, Checkbox } from 'antd';
import { EditOutlined, ScissorOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';
import { Values } from './allAddresses';
import { Context } from '../../..';
import AddressComponentEditingForm from './functionsForEditingAddresses';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;
let version = 0;
let addressID = '';
let newShipAddress = '';
let newBillAddress = '';
let deleteShipAddress = '';
let deleteBillAddress = '';
let newDefShipAddress = '';
let newDefBillAddress = '';
let update = 0;
let updateCheckBox = 0;

export function shippingAddress(el: Values) {
    const customerJSON = localStorage.getItem('currentCustomer') as string;
    const customer = JSON.parse(customerJSON);
    let shipId: boolean = false;
    customer.body.shippingAddressIds.map((ship: string) => {
        if (el.id === ship) {
            shipId = true;
        }
        return shipId;
    });
    if (customer.body.shippingAddressIds.length !== 0) {
        return shipId;
    }
    console.log(shipId);
    return false;
}

export function billingAddress(el: Values) {
    const customerJSON = localStorage.getItem('currentCustomer') as string;
    const customer = JSON.parse(customerJSON);
    let billId: boolean = false;
    customer.body.billingAddressIds.map((bill: string) => {
        if (el.id === bill) {
            billId = true;
        }
        return false;
    });
    if (customer.body.billingAddressIds.length !== 0) {
        return billId;
    }
    console.log(billId);
    return false;
}
export function shippingDefaultAddress(el: Values) {
    const customerJSON = localStorage.getItem('currentCustomer') as string;
    const customer = JSON.parse(customerJSON);
    if (customer.body.defaultShippingAddressId !== undefined) {
        if (customer.body.defaultShippingAddressId === el.id) {
            return true;
        }
        return false;
    }
    return false;
}

export function billingDefaultAddress(el: Values) {
    const customerJSON = localStorage.getItem('currentCustomer') as string;
    const customer = JSON.parse(customerJSON);
    if (customer.body.defaultBillingAddressId !== undefined) {
        if (customer.body.defaultBillingAddressId === el.id) {
            return true;
        }
        return false;
    }
    return false;
}

export function countryDetection(el: Values) {
    if (el.country === 'BL') {
        return 'Belarus';
    }
    if (el.country === 'KZ') {
        return 'Kazakhstan';
    }
    if (el.country === 'LT') {
        return 'Lithuania';
    }
    if (el.country === 'PL') {
        return 'Poland';
    }
    if (el.country === 'RU') {
        return 'Russia';
    }
    return 'Ukraine';
}

export function AddressComponent(element: Values) {
    const notifyAddress = () => {
        console.log('notify');
        toast.success('Address was updated', {
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
    const notifyAddresDelete = () => {
        console.log('notify');
        toast.success('Address was deleted', {
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
    const notifyNewShipAdd = () => {
        console.log('notify');
        toast.success('New shipping address was added', {
            position: 'top-left',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };
    const notifyNewBillAdd = () => {
        console.log('notify');
        toast.success('New billing address was added', {
            position: 'top-left',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };
    const notifyNewShipAddDef = () => {
        console.log('notify');
        toast.info('Default shipping address was update', {
            position: 'top-left',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };
    const notifyNewBillAddDef = () => {
        console.log('notify');
        toast.info('Default billing address was update', {
            position: 'top-left',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };
    const notifyNewShipDel = () => {
        console.log('notify');
        toast.success('Shipping address was removed', {
            position: 'top-left',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };
    const notifyNewBillDel = () => {
        console.log('notify');
        toast.success('Billing address was removed', {
            position: 'top-left',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };
    const customerJSON = localStorage.getItem('currentCustomer') as string;
    const customer = JSON.parse(customerJSON);
    const newElement = element;
    // console.log(newElement);
    const { store } = useContext(Context);
    const [text, setText] = useState(newElement);
    const [isEdit, setIsEdit] = useState(false);
    const [countryForValidation, setState] = useState(newElement.country);

    let makeAddressesList;
    if (isEdit) {
        makeAddressesList = (
            <div
                key={text.id}
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
                            type="primary"
                            htmlType="submit"
                            onClick={() => {
                                addressID = text.id;
                                if (update !== 0) {
                                    store.changeAddress(version, addressID, text).then(() => {
                                        notifyAddress();
                                        if (
                                            newShipAddress === '' &&
                                            newBillAddress === '' &&
                                            deleteBillAddress === '' &&
                                            deleteShipAddress === '' &&
                                            newDefShipAddress === '' &&
                                            newDefBillAddress === ''
                                        ) {
                                            setIsEdit(false);
                                        }
                                        if (newShipAddress !== '' && newDefShipAddress !== '') {
                                            const newcustomerJSON = localStorage.getItem('currentCustomer') as string;
                                            const newcustomer = JSON.parse(newcustomerJSON);
                                            version = newcustomer.body.version;
                                            store.addShippingAddress(version, newShipAddress).then(() => {
                                                notifyNewShipAdd();
                                                const updateCustomerJSON = localStorage.getItem(
                                                    'currentCustomer'
                                                ) as string;
                                                const updateCustomer = JSON.parse(updateCustomerJSON);
                                                version = updateCustomer.body.version;
                                                store.setDefaultShippingAddress(version, newDefShipAddress).then(() => {
                                                    notifyNewShipAddDef();
                                                    setIsEdit(false);
                                                });
                                            });
                                        }
                                        if (newBillAddress !== '' && newDefBillAddress !== '') {
                                            const newcustomerJSON = localStorage.getItem('currentCustomer') as string;
                                            const newcustomer = JSON.parse(newcustomerJSON);
                                            version = newcustomer.body.version;
                                            store.addBillingAddress(version, newBillAddress).then(() => {
                                                notifyNewBillAdd();
                                                const updateCustomerJSON = localStorage.getItem(
                                                    'currentCustomer'
                                                ) as string;
                                                const updateCustomer = JSON.parse(updateCustomerJSON);
                                                version = updateCustomer.body.version;
                                                store.setDefaultBillingAddress(version, newDefShipAddress).then(() => {
                                                    notifyNewBillAddDef();
                                                    setIsEdit(false);
                                                });
                                            });
                                        }
                                        if (newShipAddress !== '' && newDefShipAddress === '') {
                                            const newcustomerJSON = localStorage.getItem('currentCustomer') as string;
                                            const newcustomer = JSON.parse(newcustomerJSON);
                                            version = newcustomer.body.version;
                                            store.addShippingAddress(version, newShipAddress).then(() => {
                                                notifyNewShipAdd();
                                                setIsEdit(false);
                                            });
                                        }
                                        if (newBillAddress !== '' && newDefBillAddress === '') {
                                            const newcustomerJSON = localStorage.getItem('currentCustomer') as string;
                                            const newcustomer = JSON.parse(newcustomerJSON);
                                            version = newcustomer.body.version;
                                            store.addBillingAddress(version, newBillAddress).then(() => {
                                                notifyNewBillAdd();
                                                setIsEdit(false);
                                            });
                                        }
                                        if (deleteShipAddress !== '') {
                                            const newcustomerJSON = localStorage.getItem('currentCustomer') as string;
                                            const newcustomer = JSON.parse(newcustomerJSON);
                                            version = newcustomer.body.version;
                                            store.deleteShippingAddress(version, deleteShipAddress).then(() => {
                                                notifyNewShipDel();
                                                setIsEdit(false);
                                            });
                                        }
                                        if (deleteBillAddress !== '') {
                                            const newcustomerJSON = localStorage.getItem('currentCustomer') as string;
                                            const newcustomer = JSON.parse(newcustomerJSON);
                                            version = newcustomer.body.version;
                                            store.deleteBillingAddress(version, deleteBillAddress).then(() => {
                                                notifyNewBillDel();
                                                setIsEdit(false);
                                            });
                                        }
                                        if (newShipAddress === '' && newDefShipAddress !== '') {
                                            const newcustomerJSON = localStorage.getItem('currentCustomer') as string;
                                            const newcustomer = JSON.parse(newcustomerJSON);
                                            version = newcustomer.body.version;
                                            store.setDefaultShippingAddress(version, newDefShipAddress).then(() => {
                                                notifyNewShipAddDef();
                                                setIsEdit(false);
                                            });
                                        }
                                        if (newBillAddress === '' && newDefBillAddress !== '') {
                                            const newcustomerJSON = localStorage.getItem('currentCustomer') as string;
                                            const newcustomer = JSON.parse(newcustomerJSON);
                                            version = newcustomer.body.version;
                                            store.setDefaultBillingAddress(version, newDefBillAddress).then(() => {
                                                notifyNewBillAddDef();
                                                setIsEdit(false);
                                            });
                                        }
                                        newShipAddress = '';
                                        newBillAddress = '';
                                        deleteBillAddress = '';
                                        deleteShipAddress = '';
                                        newDefShipAddress = '';
                                        newDefBillAddress = '';
                                    });
                                }
                                if (update === 0 && updateCheckBox !== 0) {
                                    if (newShipAddress !== '' && newDefShipAddress !== '') {
                                        const newcustomerJSON = localStorage.getItem('currentCustomer') as string;
                                        const newcustomer = JSON.parse(newcustomerJSON);
                                        version = newcustomer.body.version;
                                        store.addShippingAddress(version, newShipAddress).then(() => {
                                            notifyNewShipAdd();
                                            const updateCustomerJSON = localStorage.getItem(
                                                'currentCustomer'
                                            ) as string;
                                            const updateCustomer = JSON.parse(updateCustomerJSON);
                                            version = updateCustomer.body.version;
                                            store.setDefaultShippingAddress(version, newDefShipAddress).then(() => {
                                                notifyNewShipAddDef();
                                                setIsEdit(false);
                                            });
                                        });
                                    }
                                    if (newBillAddress !== '' && newDefBillAddress !== '') {
                                        const newcustomerJSON = localStorage.getItem('currentCustomer') as string;
                                        const newcustomer = JSON.parse(newcustomerJSON);
                                        version = newcustomer.body.version;
                                        store.addBillingAddress(version, newBillAddress).then(() => {
                                            notifyNewBillAdd();
                                            const updateCustomerJSON = localStorage.getItem(
                                                'currentCustomer'
                                            ) as string;
                                            const updateCustomer = JSON.parse(updateCustomerJSON);
                                            version = updateCustomer.body.version;
                                            store.setDefaultBillingAddress(version, newDefShipAddress).then(() => {
                                                notifyNewBillAddDef();
                                                setIsEdit(false);
                                            });
                                        });
                                    }
                                    if (newShipAddress !== '' && newDefShipAddress === '') {
                                        const newcustomerJSON = localStorage.getItem('currentCustomer') as string;
                                        const newcustomer = JSON.parse(newcustomerJSON);
                                        version = newcustomer.body.version;
                                        store.addShippingAddress(version, newShipAddress).then(() => {
                                            notifyNewShipAdd();
                                            setIsEdit(false);
                                        });
                                    }
                                    if (newBillAddress !== '' && newDefBillAddress === '') {
                                        const newcustomerJSON = localStorage.getItem('currentCustomer') as string;
                                        const newcustomer = JSON.parse(newcustomerJSON);
                                        version = newcustomer.body.version;
                                        store.addBillingAddress(version, newBillAddress).then(() => {
                                            notifyNewBillAdd();
                                            setIsEdit(false);
                                        });
                                    }
                                    if (deleteShipAddress !== '') {
                                        const newcustomerJSON = localStorage.getItem('currentCustomer') as string;
                                        const newcustomer = JSON.parse(newcustomerJSON);
                                        version = newcustomer.body.version;
                                        store.deleteShippingAddress(version, deleteShipAddress).then(() => {
                                            notifyNewShipDel();
                                            setIsEdit(false);
                                        });
                                    }
                                    if (deleteBillAddress !== '') {
                                        const newcustomerJSON = localStorage.getItem('currentCustomer') as string;
                                        const newcustomer = JSON.parse(newcustomerJSON);
                                        version = newcustomer.body.version;
                                        store.deleteBillingAddress(version, deleteBillAddress).then(() => {
                                            notifyNewBillDel();
                                            setIsEdit(false);
                                        });
                                    }
                                    if (newShipAddress === '' && newDefShipAddress !== '') {
                                        const newcustomerJSON = localStorage.getItem('currentCustomer') as string;
                                        const newcustomer = JSON.parse(newcustomerJSON);
                                        version = newcustomer.body.version;
                                        store.setDefaultShippingAddress(version, newDefShipAddress).then(() => {
                                            notifyNewShipAddDef();
                                            setIsEdit(false);
                                        });
                                    }
                                    if (newBillAddress === '' && newDefBillAddress !== '') {
                                        const newcustomerJSON = localStorage.getItem('currentCustomer') as string;
                                        const newcustomer = JSON.parse(newcustomerJSON);
                                        version = newcustomer.body.version;
                                        store.setDefaultBillingAddress(version, newDefBillAddress).then(() => {
                                            notifyNewBillAddDef();
                                            setIsEdit(false);
                                        });
                                    }
                                    newShipAddress = '';
                                    newBillAddress = '';
                                    deleteBillAddress = '';
                                    deleteShipAddress = '';
                                    newDefShipAddress = '';
                                    newDefBillAddress = '';
                                }
                                update = 0;
                                updateCheckBox = 0;
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
                    onFinish={() => {
                        // addressID = text.id;
                        // store.changeAddress(version, addressID, text).then(() => notifyAddress());
                        // setIsEdit(false);
                        console.log(isEdit);
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
                                        id={text.id}
                                        style={{ width: '100%' }}
                                        type="text"
                                        value={text.streetName}
                                        onChange={(event) => {
                                            console.log(event.target.value);
                                            newElement.streetName = event.target.value;
                                            setText(newElement);
                                            console.log(newElement);
                                            text.streetName = newElement.streetName;
                                            console.log(text);
                                            version = customer.body.version;
                                            for (let i = 0; i < customer.body.addresses.length; i += 1) {
                                                if (customer.body.addresses[i].id === event.target.id) {
                                                    customer.body.addresses[i].streetName = event.target.value;
                                                }
                                            }
                                            const customerUpdate = JSON.stringify(customer);
                                            localStorage.removeItem('currentCustomer');
                                            localStorage.setItem('currentCustomer', customerUpdate);
                                            update = 1;
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
                                                    return Promise.reject(new Error(`City shouldn't contain numbers`));
                                                }
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                >
                                    <Input
                                        id={text.id}
                                        style={{ width: '100%' }}
                                        type="text"
                                        value={text.city}
                                        onChange={(event) => {
                                            console.log(event.target.value);
                                            newElement.city = event.target.value;
                                            setText(newElement);
                                            console.log(newElement);
                                            text.city = newElement.city;
                                            console.log(text);
                                            version = customer.body.version;
                                            for (let i = 0; i < customer.body.addresses.length; i += 1) {
                                                if (customer.body.addresses[i].id === event.target.id) {
                                                    customer.body.addresses[i].city = event.target.value;
                                                }
                                            }
                                            const customerUpdate = JSON.stringify(customer);
                                            localStorage.removeItem('currentCustomer');
                                            localStorage.setItem('currentCustomer', customerUpdate);
                                            update = 1;
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
                                    rules={[
                                        { required: true, message: 'Please, enter postal code' },
                                        {
                                            message: `You entered an invalid postcode!`,
                                            validator: (_, value) => {
                                                console.log(countryForValidation);
                                                let postcodeTemplateAll: RegExp =
                                                    /^([0-9]{5,6}|[a-zA-Z][a-zA-Z ]{0,49})$/;
                                                if (countryForValidation === 'BL') {
                                                    postcodeTemplateAll = /\b2\d\d\d\d\d\b/;
                                                } else if (countryForValidation === 'PL') {
                                                    postcodeTemplateAll = /\b\d\d-\d\d\d\b/;
                                                } else if (countryForValidation === 'RU') {
                                                    postcodeTemplateAll = /\b\d\d\d\d\d\d\b/;
                                                } else if (countryForValidation === 'KZ') {
                                                    postcodeTemplateAll = /\b\d\d\d\d\d\d\b/;
                                                } else if (countryForValidation === 'LT') {
                                                    postcodeTemplateAll = /\b\d\d\d\d\d\b/;
                                                } else if (countryForValidation === 'UA') {
                                                    postcodeTemplateAll = /\b\d\d\d\d\d\b/;
                                                }
                                                console.log(postcodeTemplateAll);
                                                if (postcodeTemplateAll.test(value) === false) {
                                                    return Promise.reject(
                                                        new Error(`You entered an invalid postcode!`)
                                                    );
                                                }
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                >
                                    <Input
                                        id={text.id}
                                        style={{ width: '100%' }}
                                        type="text"
                                        value={text.postalCode}
                                        onChange={(event) => {
                                            console.log(event.target.value);
                                            newElement.postalCode = event.target.value;
                                            setText(newElement);
                                            console.log(newElement);
                                            text.postalCode = newElement.postalCode;
                                            console.log(text);
                                            version = customer.body.version;
                                            for (let i = 0; i < customer.body.addresses.length; i += 1) {
                                                if (customer.body.addresses[i].id === event.target.id) {
                                                    customer.body.addresses[i].postalCode = event.target.value;
                                                }
                                            }
                                            const customerUpdate = JSON.stringify(customer);
                                            localStorage.removeItem('currentCustomer');
                                            localStorage.setItem('currentCustomer', customerUpdate);
                                            update = 1;
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
                                        key={text.id}
                                        style={{ width: '100%' }}
                                        options={[
                                            { value: `BL${text.id}`, label: 'Belarus' },
                                            { value: `KZ${text.id}`, label: 'Kazakhstan' },
                                            { value: `LT${text.id}`, label: 'Lithuania' },
                                            { value: `PL${text.id}`, label: 'Poland' },
                                            { value: `RU${text.id}`, label: 'Russia' },
                                            { value: `UA${text.id}`, label: 'Ukraine' },
                                        ]}
                                        value={text.country}
                                        onChange={(value) => {
                                            console.log(value);
                                            newElement.country = value.slice(0, 2);
                                            setText(newElement);
                                            setState(value.slice(0, 2));
                                            console.log(newElement);
                                            text.country = newElement.country;
                                            console.log(text);
                                            version = customer.body.version;
                                            for (let i = 0; i < customer.body.addresses.length; i += 1) {
                                                if (customer.body.addresses[i].id === value.slice(2)) {
                                                    customer.body.addresses[i].country = value.slice(0, 2);
                                                }
                                            }
                                            const customerUpdate = JSON.stringify(customer);
                                            localStorage.removeItem('currentCustomer');
                                            localStorage.setItem('currentCustomer', customerUpdate);
                                            update = 1;
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
                                    <Form.Item name="shipAddress" style={{ width: '80%', marginBottom: 0 }}>
                                        <Checkbox
                                            id={text.id}
                                            defaultChecked={shippingAddress(text)}
                                            style={{ width: '100%' }}
                                            onChange={(event) => {
                                                event.stopPropagation();
                                                const check = event.target.checked;
                                                console.log(check);
                                                version = customer.body.version;
                                                if (check === true) {
                                                    let checkIsAddressPresent = 0;
                                                    for (
                                                        let i = 0;
                                                        i < customer.body.shippingAddressIds.length;
                                                        i += 1
                                                    ) {
                                                        if (customer.body.shippingAddressIds[i] === text.id) {
                                                            checkIsAddressPresent += 1;
                                                        }
                                                    }
                                                    if (checkIsAddressPresent === 0) {
                                                        customer.body.shippingAddressIds.push(text.id);
                                                        newShipAddress = text.id;
                                                        updateCheckBox = 1;
                                                        if (deleteShipAddress !== '') {
                                                            deleteShipAddress = '';
                                                        }
                                                    }
                                                }
                                                if (check === false) {
                                                    for (
                                                        let i = 0;
                                                        i < customer.body.shippingAddressIds.length;
                                                        i += 1
                                                    ) {
                                                        if (customer.body.shippingAddressIds[i] === text.id) {
                                                            customer.body.shippingAddressIds.splice(i, i + 1);
                                                            deleteShipAddress = text.id;
                                                            updateCheckBox = 1;
                                                        }
                                                    }
                                                }
                                                console.log(customer);
                                                const customerUpdate = JSON.stringify(customer);
                                                localStorage.removeItem('currentCustomer');
                                                localStorage.setItem('currentCustomer', customerUpdate);
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
                                    <Form.Item name="dafaultShip" style={{ width: '80%', marginBottom: 0 }}>
                                        <Checkbox
                                            style={{ width: '100%' }}
                                            defaultChecked={shippingDefaultAddress(text)}
                                            onChange={(event) => {
                                                event.stopPropagation();
                                                const check = event.target.checked;
                                                console.log(check);
                                                version = customer.body.version;
                                                if (check === true) {
                                                    if (customer.body.defaultShippingAddressId !== text.id) {
                                                        customer.body.defaultShippingAddressId = text.id;
                                                        updateCheckBox = 1;
                                                        newDefShipAddress = text.id;
                                                    }
                                                }
                                                if (check === false) {
                                                    if (customer.body.defaultShippingAddressId === text.id) {
                                                        for (let i = 0; i < customer.body.addresses.length; i += 1) {
                                                            if (customer.body.addresses[i].id !== text.id) {
                                                                updateCheckBox = 1;
                                                                newDefShipAddress = customer.body.addresses[i].id;
                                                                return;
                                                            }
                                                        }
                                                    }
                                                }
                                                const customerUpdate = JSON.stringify(customer);
                                                localStorage.removeItem('currentCustomer');
                                                localStorage.setItem('currentCustomer', customerUpdate);
                                            }}
                                        />
                                    </Form.Item>
                                </Card>
                            </Card>
                            <Card
                                type="inner"
                                title="Billing Address settings:"
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
                                    <Form.Item name="billAddress" style={{ width: '80%', marginBottom: 0 }}>
                                        <Checkbox
                                            defaultChecked={billingAddress(text)}
                                            style={{ width: '100%' }}
                                            onChange={(event) => {
                                                event.stopPropagation();
                                                const check = event.target.checked;
                                                console.log(check);
                                                version = customer.body.version;
                                                if (check === true) {
                                                    let checkIsAddressPresent = 0;
                                                    for (
                                                        let i = 0;
                                                        i < customer.body.billingAddressIds.length;
                                                        i += 1
                                                    ) {
                                                        if (customer.body.billingAddressIds[i] === text.id) {
                                                            checkIsAddressPresent += 1;
                                                        }
                                                    }
                                                    if (checkIsAddressPresent === 0) {
                                                        customer.body.billingAddressIds.push(text.id);
                                                        newBillAddress = text.id;
                                                        updateCheckBox = 1;
                                                        if (deleteBillAddress !== '') {
                                                            deleteBillAddress = '';
                                                        }
                                                    }
                                                }
                                                if (check === false) {
                                                    for (
                                                        let i = 0;
                                                        i < customer.body.billingAddressIds.length;
                                                        i += 1
                                                    ) {
                                                        if (customer.body.billingAddressIds[i] === text.id) {
                                                            customer.body.billingAddressIds.splice(i, i + 1);
                                                            deleteBillAddress = text.id;
                                                            updateCheckBox = 1;
                                                        }
                                                    }
                                                }
                                                console.log(customer);
                                                const customerUpdate = JSON.stringify(customer);
                                                localStorage.removeItem('currentCustomer');
                                                localStorage.setItem('currentCustomer', customerUpdate);
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
                                    <Form.Item name="dafaultBill" style={{ width: '80%', marginBottom: 0 }}>
                                        <Checkbox
                                            defaultChecked={billingDefaultAddress(text)}
                                            style={{ width: '100%' }}
                                            onChange={(event) => {
                                                event.stopPropagation();
                                                const check = event.target.checked;
                                                console.log(check);
                                                version = customer.body.version;
                                                console.log(customer);
                                                if (check === true) {
                                                    if (customer.body.defaultBillingAddressId !== text.id) {
                                                        customer.body.defaultBillingAddressId = text.id;
                                                        updateCheckBox = 1;
                                                        newDefBillAddress = text.id;
                                                    }
                                                }
                                                if (check === false) {
                                                    if (customer.body.defaultBillingAddressId === text.id) {
                                                        for (let i = 0; i < customer.body.addresses.length; i += 1) {
                                                            if (customer.body.addresses[i].id !== text.id) {
                                                                updateCheckBox = 1;
                                                                newDefBillAddress = customer.body.addresses[i].id;
                                                                return;
                                                            }
                                                        }
                                                    }
                                                }
                                                const customerUpdate = JSON.stringify(customer);
                                                localStorage.removeItem('currentCustomer');
                                                localStorage.setItem('currentCustomer', customerUpdate);
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
    } else {
        makeAddressesList = (
            <div
                key={text.id}
                id={text.id}
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
                        {/* <Button
                            icon={<ScissorOutlined />}
                            onClick={() => {
                                console.log(text);
                                addressID = text.id;
                                version = updatingCustomerForDelete.body.version;
                                // store.removeAddress(version, addressID).then(() => {
                                //     notifyAddresDelete();
                                //     const newcustomerJSON = localStorage.getItem('currentCustomer') as string;
                                //     const customerUpdate = JSON.parse(newcustomerJSON);
                                //     setState(customerUpdate);
                                //     const addressforDelete = document.getElementById(`${addressID}`) as HTMLElement;
                                //     addressforDelete.remove();
                                // });
                            }}
                        >
                            Delete
                        </Button> */}
                        <Button
                            icon={<EditOutlined />}
                            onClick={() => {
                                setIsEdit(true);
                                console.log(isEdit);
                            }}
                        >
                            Edit
                        </Button>
                    </div>
                </Header>
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
                            {text.streetName}
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
                            {element.city}
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
                            {element.postalCode}
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
                            {countryDetection(element)}
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
                                {`${String(shippingAddress(element))}`}
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
                                {`${String(shippingDefaultAddress(element))}`}
                            </Card>
                        </Card>
                        <Card
                            type="inner"
                            title="Billing Address settings:"
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
                                {`${String(billingAddress(element))}`}
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
                                {`${String(billingDefaultAddress(element))}`}
                            </Card>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
    return makeAddressesList;
}
