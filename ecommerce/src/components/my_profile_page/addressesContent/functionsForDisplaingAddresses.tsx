import React, { ReactElement, useState, useContext, ReactNode } from 'react';
import { Button, Card, Input, Form, Typography, theme, Layout } from 'antd';
import { EditOutlined, ScissorOutlined } from '@ant-design/icons';
import { Values } from './allAddresses';
import { Context } from '../../..';
import AddressComponentEditingForm from './functionsForEditingAddresses';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

export function shippingAddress(el: Values) {
    const customerJSON = localStorage.getItem('currentCustomer') as string;
    const customer = JSON.parse(customerJSON);
    const shipId: string = customer.body.shippingAddressIds.map((ship: string) => {
        if (el.id === ship) {
            return 'true';
        }
        return 'false';
    });
    return shipId;
}

export function billingAddress(el: Values) {
    const customerJSON = localStorage.getItem('currentCustomer') as string;
    const customer = JSON.parse(customerJSON);
    const billId: string = customer.body.billingAddressIds.map((bill: string) => {
        if (el.id === bill) {
            return 'true';
        }
        return 'false';
    });
    return billId;
}
export function shippingDefaultAddress(el: Values) {
    const customerJSON = localStorage.getItem('currentCustomer') as string;
    const customer = JSON.parse(customerJSON);
    if (customer.body.defaultShippingAddressId !== undefined) {
        if (customer.body.defaultShippingAddressId === el.id) {
            return 'true';
        }
        return 'false';
    }
    return 'false';
}

export function billingDefaultAddress(el: Values) {
    const customerJSON = localStorage.getItem('currentCustomer') as string;
    const customer = JSON.parse(customerJSON);
    if (customer.body.defaultBillingAddressId !== undefined) {
        if (customer.body.defaultBillingAddressId === el.id) {
            return 'true';
        }
        return 'false';
    }
    return 'false';
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

// export function AddressComponent() {
//     const customerJSON = localStorage.getItem('currentCustomer') as string;
//     const customer = JSON.parse(customerJSON);
//     const { store } = useContext(Context);
//     const [text, setText] = useState(customer);
//     const [isEdit, setIsEdit] = useState(false);
//     let makeAddressesList;

//     if (isEdit) {
//         makeAddressesList = <AddressComponentEditingForm />;
//     } else {
//         makeAddressesList = <AddressComponent />;
//     }
//     return (
//         <React.Fragment>
//             {customer.body.addresses.map((element: Values) => {
//                 return (
//                     <div
//                         key={element.id}
//                         style={{
//                             display: 'flex',
//                             flexDirection: 'column',
//                             gap: 10,
//                             border: 'solid 1px #9a9a9a',
//                             borderRadius: '15px',
//                             padding: '10px 10px 10px 10px',
//                         }}
//                     >
//                         <Header
//                             style={{
//                                 display: 'flex',
//                                 justifyContent: 'space-between',
//                                 padding: '2px 10px 5px 10px',
//                                 alignItems: 'center',
//                                 height: 'auto',
//                                 lineHeight: '1.0',
//                                 background: '#9a9a9a',
//                                 borderRadius: 15,
//                             }}
//                         >
//                             <div
//                                 style={{
//                                     display: 'flex',
//                                 }}
//                             >
//                                 <div
//                                     style={{
//                                         fontWeight: 'bold',
//                                     }}
//                                 >
//                                     Address
//                                 </div>
//                             </div>
//                             <div style={{ display: 'flex', gap: 10, alignSelf: 'center' }}>
//                                 <Button icon={<ScissorOutlined />}>Delete</Button>
//                                 <Button
//                                     icon={<EditOutlined />}
//                                     onClick={() => {
//                                         setIsEdit(true);
//                                         console.log(isEdit);
//                                     }}
//                                 >
//                                     Edit
//                                 </Button>
//                             </div>
//                         </Header>
//                         <div
//                             style={{
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 gap: 10,
//                             }}
//                         >
//                             <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
//                                 <Card
//                                     type="inner"
//                                     title="Street"
//                                     style={{ flexBasis: '23%' }}
//                                     headStyle={{ lineHeight: '1.0', minHeight: '30px' }}
//                                     bodyStyle={{
//                                         lineHeight: '1.0',
//                                         minHeight: '30px',
//                                         padding: '10px 10px 10px 24px',
//                                     }}
//                                 >
//                                     {element.streetName}
//                                 </Card>
//                                 <Card
//                                     type="inner"
//                                     title="City"
//                                     style={{ flexBasis: '23%' }}
//                                     headStyle={{ lineHeight: '1.0', minHeight: '30px' }}
//                                     bodyStyle={{
//                                         lineHeight: '1.0',
//                                         minHeight: '30px',
//                                         padding: '10px 10px 10px 24px',
//                                     }}
//                                 >
//                                     {element.city}
//                                 </Card>
//                                 <Card
//                                     type="inner"
//                                     title="Postal Code"
//                                     style={{ flexBasis: '23%' }}
//                                     headStyle={{ lineHeight: '1.0', minHeight: '30px' }}
//                                     bodyStyle={{
//                                         lineHeight: '1.0',
//                                         minHeight: '30px',
//                                         padding: '10px 10px 10px 24px',
//                                     }}
//                                 >
//                                     {element.postalCode}
//                                 </Card>
//                                 <Card
//                                     type="inner"
//                                     title="Country"
//                                     style={{ flexBasis: '23%' }}
//                                     headStyle={{ lineHeight: '1.0', minHeight: '30px' }}
//                                     bodyStyle={{
//                                         lineHeight: '1.0',
//                                         minHeight: '30px',
//                                         padding: '10px 10px 10px 24px',
//                                     }}
//                                 >
//                                     {countryDetection(element)}
//                                 </Card>
//                             </div>
//                             <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
//                                 <Card
//                                     type="inner"
//                                     title="Shipping Address settings:"
//                                     style={{
//                                         flexBasis: '45%',
//                                     }}
//                                     headStyle={{ lineHeight: '1.0', minHeight: '35px' }}
//                                     bodyStyle={{
//                                         lineHeight: '1.0',
//                                         minHeight: '30px',
//                                         padding: '10px 10px 10px 10px',
//                                         display: 'flex',
//                                         flexDirection: 'column',
//                                         gap: 10,
//                                     }}
//                                 >
//                                     <Card
//                                         type="inner"
//                                         title="Shipping Address:"
//                                         style={{
//                                             fontWeight: 'bold',
//                                         }}
//                                         headStyle={{ lineHeight: '1.0', minHeight: '35px' }}
//                                         bodyStyle={{
//                                             lineHeight: '1.0',
//                                             minHeight: '30px',
//                                             padding: '10px 10px 10px 24px',
//                                         }}
//                                     >
//                                         {shippingAddress(element)}
//                                     </Card>
//                                     <Card
//                                         type="inner"
//                                         title="Default Shipping Address:"
//                                         style={{
//                                             fontWeight: 'bold',
//                                         }}
//                                         headStyle={{ lineHeight: '1.0', minHeight: '35px' }}
//                                         bodyStyle={{
//                                             lineHeight: '1.0',
//                                             minHeight: '30px',
//                                             padding: '10px 10px 10px 24px',
//                                         }}
//                                     >
//                                         {shippingDefaultAddress(element)}
//                                     </Card>
//                                 </Card>
//                                 <Card
//                                     type="inner"
//                                     title="Shipping Address settings:"
//                                     style={{
//                                         flexBasis: '45%',
//                                     }}
//                                     headStyle={{ lineHeight: '1.0', minHeight: '35px' }}
//                                     bodyStyle={{
//                                         lineHeight: '1.0',
//                                         minHeight: '30px',
//                                         padding: '10px 10px 10px 10px',
//                                         display: 'flex',
//                                         flexDirection: 'column',
//                                         gap: 10,
//                                     }}
//                                 >
//                                     <Card
//                                         type="inner"
//                                         title="Billing Address:"
//                                         style={{
//                                             fontWeight: 'bold',
//                                         }}
//                                         headStyle={{ lineHeight: '1.0', minHeight: '35px' }}
//                                         bodyStyle={{
//                                             lineHeight: '1.0',
//                                             minHeight: '30px',
//                                             padding: '10px 10px 10px 24px',
//                                         }}
//                                     >
//                                         {billingAddress(element)}
//                                     </Card>
//                                     <Card
//                                         type="inner"
//                                         title="Default Billing Address:"
//                                         style={{
//                                             fontWeight: 'bold',
//                                         }}
//                                         headStyle={{ lineHeight: '1.0', minHeight: '30px' }}
//                                         bodyStyle={{
//                                             lineHeight: '1.0',
//                                             minHeight: '30px',
//                                             padding: '10px 10px 10px 24px',
//                                         }}
//                                     >
//                                         {billingDefaultAddress(element)}
//                                     </Card>
//                                 </Card>
//                             </div>
//                         </div>
//                     </div>
//                 );
//             })}
//         </React.Fragment>
//     );
// }
