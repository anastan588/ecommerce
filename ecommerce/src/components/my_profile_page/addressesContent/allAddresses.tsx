import React, { ReactElement, useState, useContext, ReactNode } from 'react';
import { Button, Card, Input, Form, Typography, theme, Layout } from 'antd';
import { EditOutlined, ScissorOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../..';
import {
    countryDetection,
    shippingAddress,
    billingAddress,
    shippingDefaultAddress,
    billingDefaultAddress,
    AddressComponent,
} from './functionsForDisplaingAddresses';
import AddressComponentEditingForm from './functionsForEditingAddresses';

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
    const customer = JSON.parse(customerJSON);
    const [text, setText] = useState(customer);
    const [isEdit, setIsEdit] = useState(false);
    // let makeAddressesList = <div>{text.body.addresses}</div>;

    const makeAddressesList = (
        <React.Fragment>
            {customer.body.addresses.map((element: Values) => {
                return AddressComponent(element);
            })}
        </React.Fragment>
    );
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
            {makeAddressesList}
        </Card>
    );
}

export default AddRessesEdit;
