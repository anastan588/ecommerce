import React, { ReactElement, useState, useContext } from 'react';
import { Button, Card, Input, Form, Typography, theme, Layout } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../..';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;
const version = 0;

export type Values = {
    id: string;
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
    const notifyAddDress = () => {
        console.log('notify');
        toast.info('Shipping address was updated', {
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
    const customerJSON = localStorage.getItem('currentCustomer') as string;
    // console.log(customerJSON);
    const customer = JSON.parse(customerJSON);
    // console.log(customer);
    // console.log(customer.body.firstName);
    const [text, setText] = useState(customer);
    const [isEdit, setIsEdit] = useState(false);
    let returnAddresses: ReactElement = <div>{text.body.addresses}</div>;

    if (isEdit) {
        // customer.body.addresses.map((element: Values) => {});
        // returnAddresses = (
        //     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        //         <Form
        //             name="address"
        //             labelCol={{ span: 8 }}
        //             wrapperCol={{ span: 16 }}
        //             style={{ maxWidth: 600 }}
        //             initialValues={{ remember: true }}
        //             onFinish={onFinish}
        //             onFinishFailed={onFinishFailed}
        //             autoComplete="off"
        //         >
        //             <Form.Item<FieldType>
        //                 label="Street"
        //                 name="street"
        //                 rules={[{ required: true, message: 'Please input street!' }]}
        //             >
        //                 <Input.Password value={currentPassword} />
        //             </Form.Item>
        //             <Form.Item<FieldType>
        //                 label="New Password"
        //                 name="newPassword"
        //                 rules={[
        //                     { required: true, message: 'Please input your current password!' },
        //                     { pattern: /\S$/, message: 'Password must not contain trailing whitespace' },
        //                     { pattern: /^\S/, message: 'Password must not contain leading whitespace' },
        //                     { pattern: /.{8}/, message: 'Password must be at least 8 characters long' },
        //                     { pattern: /[A-Z]/, message: 'Password must contain at least one uppercase letter (A-Z)' },
        //                     { pattern: /[a-z]/, message: 'Password must contain at least one lowercase letter (a-z)' },
        //                     { pattern: /\d/, message: 'Password must contain at least one digit (0-9)' },
        //                 ]}
        //             >
        //                 <Input.Password value={newPassword} />
        //             </Form.Item>
        //             <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
        //                 <Button type="primary" htmlType="submit">
        //                     Confirm new Password
        //                 </Button>
        //             </Form.Item>
        //         </Form>
        //         <Form
        //             style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
        //             name="name"
        //             className="form"
        //             wrapperCol={{ span: 30 }}
        //             // style={{ maxWidth: 600 }}
        //             initialValues={{ remember: true }}
        //             fields={[
        //                 {
        //                     name: ['name'],
        //                     value: text.body.firstName,
        //                 },
        //             ]}
        //             // autoComplete="off"
        //             onFinish={() => {
        //                 setIsEdit(false);
        //                 sendUpdateCustomerToServer(version).then(() => notifyFirstName());
        //                 console.log(customer.body.firstName);
        //             }}
        //         >
        //             <Form.Item
        //                 name="name"
        //                 style={{ width: '80%' }}
        //                 rules={[
        //                     { required: true, message: 'Please, enter your first name' },
        //                     {
        //                         message: `First name shouldn't contain numbers and special characters`,
        //                         validator: (_, value) => {
        //                             if (/\d/.test(value) && /[\\^$.[\]|~`?!@#$%&\-_={}:;"'<>.,*+()]/.test(value)) {
        //                                 return Promise.reject(
        //                                     new Error(`First name shouldn't contain numbers and special characters`)
        //                                 );
        //                             }
        //                             return Promise.resolve();
        //                         },
        //                     },
        //                     {
        //                         message: `First name must be at least 1 characters long`,
        //                         validator: (_, value) => {
        //                             if (/.{1}/.test(value)) {
        //                                 return Promise.resolve();
        //                             }
        //                             return Promise.reject(new Error(`First name must be at least 1 characters long`));
        //                         },
        //                     },
        //                     {
        //                         message: `First name shouldn't contain special characters`,
        //                         validator: (_, value) => {
        //                             if (/[\\^$.[\]|~`?!@#$%&\-_={}:;"'<>.,*+()]/.test(value)) {
        //                                 return Promise.reject(
        //                                     new Error(`First name shouldn't contain special characters`)
        //                                 );
        //                             }
        //                             return Promise.resolve();
        //                         },
        //                     },
        //                     {
        //                         message: `First name shouldn't contain numbers`,
        //                         validator: (_, value) => {
        //                             if (/\d/.test(value)) {
        //                                 return Promise.reject(new Error(`First name shouldn't contain numbers`));
        //                             }
        //                             return Promise.resolve();
        //                         },
        //                     },
        //                 ]}
        //             >
        //                 <Input
        //                     style={{ width: '100%' }}
        //                     type="text"
        //                     value={text.body.firstName}
        //                     onChange={(event) => {
        //                         console.log(text.body.firstName);
        //                         console.log(event.target.value);
        //                         customer.body.firstName = event.target.value;
        //                         version = customer.body.version;
        //                         console.log(customer);
        //                         const customerUpdate = JSON.stringify(customer);
        //                         localStorage.removeItem('currentCustomer');
        //                         localStorage.setItem('currentCustomer', customerUpdate);
        //                         setText(customer);
        //                     }}
        //                 />
        //             </Form.Item>
        //             <div>
        //                 <Button
        //                     type="primary"
        //                     htmlType="submit"
        //                     // onClick={() => {
        //                     //     setIsEdit(false);
        //                     //     sendUpdateCustomerToServer(version).then(() => notifyFirstName());
        //                     //     console.log(customer.body.firstName);
        //                     // }}
        //                 >
        //                     Save
        //                 </Button>
        //             </div>
        //         </Form>
        //     </div>
        // );
    } else {
        customer.body.addresses.map((element: Values) => {
            const {
                token: { colorBgContainer },
            } = theme.useToken();
            function shippingAddress() {
                console.log(typeof customer.body.shippingAddressIds);
                const shipId: string = customer.body.shippingAddressIds.map((ship: string) => {
                    if (element.id === ship) {
                        return 'true';
                    }
                    return 'false';
                });
                return shipId;
            }
            function billingAddress() {
                console.log(typeof customer.body.billingAddressIds);
                const billId: string = customer.body.billingAddressIds.map((bill: string) => {
                    if (element.id === bill) {
                        return 'true';
                    }
                    return 'false';
                });
                return billId;
            }
            function shippingDefaultAddress() {
                if (customer.body.defaultShippingAddressId !== undefined) {
                    if (customer.body.defaultShippingAddressId === element.id) {
                        return 'true';
                    }
                    return 'false';
                }
                return 'false';
            }

            function billingDefaultAddress() {
                if (customer.body.defaultBillingAddressId !== undefined) {
                    if (customer.body.defaultBillingAddressId === element.id) {
                        return 'true';
                    }
                    return 'false';
                }
                return 'false';
            }

            function countryDetection(el: Values) {
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
            returnAddresses = (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        border: 'solid 1px #9a9a9a',
                        borderRadius: '15px',
                        padding: '10px 10px 10px 10px',
                    }}
                >
                    <Header
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            background: colorBgContainer,
                            padding: '2px 2px 5px 2px',
                            alignItems: 'center',
                            height: 'auto',
                            lineHeight: '1.0',
                        }}
                    >
                        <div style={{ background: colorBgContainer, display: 'flex' }}>
                            <div
                                style={{
                                    fontWeight: 'bold',
                                }}
                            >
                                Address
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 10 }}>
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
                            background: colorBgContainer,
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
                                bodyStyle={{ lineHeight: '1.0', minHeight: '30px', padding: '10px 10px 10px 24px' }}
                            >
                                {element.streetName}
                            </Card>
                            <Card
                                type="inner"
                                title="City"
                                style={{ flexBasis: '23%' }}
                                headStyle={{ lineHeight: '1.0', minHeight: '30px' }}
                                bodyStyle={{ lineHeight: '1.0', minHeight: '30px', padding: '10px 10px 10px 24px' }}
                            >
                                {element.city}
                            </Card>
                            <Card
                                type="inner"
                                title="Postal Code"
                                style={{ flexBasis: '23%' }}
                                headStyle={{ lineHeight: '1.0', minHeight: '30px' }}
                                bodyStyle={{ lineHeight: '1.0', minHeight: '30px', padding: '10px 10px 10px 24px' }}
                            >
                                {element.postalCode}
                            </Card>
                            <Card
                                type="inner"
                                title="Country"
                                style={{ flexBasis: '23%' }}
                                headStyle={{ lineHeight: '1.0', minHeight: '30px' }}
                                bodyStyle={{ lineHeight: '1.0', minHeight: '30px', padding: '10px 10px 10px 24px' }}
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
                                    bodyStyle={{ lineHeight: '1.0', minHeight: '30px', padding: '10px 10px 10px 24px' }}
                                >
                                    {shippingAddress()}
                                </Card>
                                <Card
                                    type="inner"
                                    title="Default Shipping Address:"
                                    style={{
                                        fontWeight: 'bold',
                                    }}
                                    headStyle={{ lineHeight: '1.0', minHeight: '35px' }}
                                    bodyStyle={{ lineHeight: '1.0', minHeight: '30px', padding: '10px 10px 10px 24px' }}
                                >
                                    {shippingDefaultAddress()}
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
                                    bodyStyle={{ lineHeight: '1.0', minHeight: '30px', padding: '10px 10px 10px 24px' }}
                                >
                                    {billingAddress()}
                                </Card>
                                <Card
                                    type="inner"
                                    title="Default Billing Address:"
                                    style={{
                                        fontWeight: 'bold',
                                    }}
                                    headStyle={{ lineHeight: '1.0', minHeight: '30px' }}
                                    bodyStyle={{ lineHeight: '1.0', minHeight: '30px', padding: '10px 10px 10px 24px' }}
                                >
                                    {billingDefaultAddress()}
                                </Card>
                            </Card>
                        </div>
                    </div>
                </div>
            );
            return returnAddresses;
        });
    }

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
            {returnAddresses}
        </Card>
    );
}

export default AddRessesEdit;
