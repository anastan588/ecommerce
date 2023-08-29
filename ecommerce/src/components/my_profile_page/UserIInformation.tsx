import React, { ReactElement, useState, useContext } from 'react';
import { Layout, theme, Typography, Button, Card, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import type { DescriptionsProps } from 'antd';
import Column from 'antd/es/table/Column';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Store from '../login_page/store';
import { Context } from '../..';

const { Header, Content } = Layout;
const { Title } = Typography;

export function UserInformation() {
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
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { store } = useContext(Context);
    function sendUpdateCustomerToServer() {
        return store.updateCustomer();
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
                <Input
                    style={{ width: '50%' }}
                    value={text.body.firstName}
                    onChange={(event) => {
                        console.log(event.target.value);
                        customer.body.firstName = event.target.value;
                        console.log(customer);
                        const customerUpdate = JSON.stringify(customer);
                        localStorage.removeItem('currentCustomer');
                        localStorage.setItem('currentCustomer', customerUpdate);
                        setText(customer);
                    }}
                    // onBlur={() => setIsEdit(false)}
                />
                <div>
                    <Button
                        onClick={() => {
                            setIsEdit(false);
                            sendUpdateCustomerToServer().then(() => notifyFirstName());
                            console.log(customer.body.firstName);
                        }}
                    >
                        Save
                    </Button>
                </div>
            </div>
        );
    } else {
        returnFirstname = <div>{text.body.firstName}</div>;
    }

    return (
        <Layout key={'/my-profile/user-information'}>
            {/* <Header style={{ padding: 0, background: colorBgContainer }}>
                <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                    <Title level={3}>User Information</Title>
                </div>
            </Header> */}
            <Content style={{ margin: '24px 16px 0' }}>
                <div
                    style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 20,
                    }}
                >
                    <Card title="User Information">
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
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title="Last name"
                            extra={
                                <Button icon={<EditOutlined />} onClick={() => setIsEdit(true)}>
                                    Edit
                                </Button>
                            }
                        >
                            {text.body.lastName}
                        </Card>
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title="Date of Birth"
                            extra={<Button icon={<EditOutlined />}>Edit</Button>}
                        >
                            {text.body.dateOfBirth}
                        </Card>
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title="E-mail"
                            extra={<Button icon={<EditOutlined />}>Edit</Button>}
                        >
                            {text.body.email}
                        </Card>
                    </Card>
                </div>
            </Content>
            <ToastContainer />
        </Layout>
    );
}

export default UserInformation;
