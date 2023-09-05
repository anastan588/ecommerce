import React, { useState } from 'react';
import { UserOutlined, EnvironmentOutlined, ExclamationCircleOutlined, LikeFilled } from '@ant-design/icons';
import { Layout, Menu, theme, Typography, Avatar, Space, Badge, Descriptions } from 'antd';
import { Route, Routes, useNavigate } from 'react-router-dom';
import UserInformation from './UserIInformation';
import PassWord from './PassWord';
import Addresses from './Addresses';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

function SideMenu() {
    const navigate = useNavigate();

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <Menu
                onClick={({ key }) => navigate(key)}
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['3']}
                items={[
                    {
                        key: '/my-profile/user-information',
                        icon: React.createElement(UserOutlined),
                        label: `User's information`,
                    },
                    {
                        key: '/my-profile/addresses',
                        icon: React.createElement(EnvironmentOutlined),
                        label: `User's addresses`,
                    },
                    {
                        key: '/my-profile/change-password',
                        icon: React.createElement(ExclamationCircleOutlined),
                        label: 'Change password',
                        style: {
                            color: '#ff4040',
                        },
                    },
                ]}
            />
        </Sider>
    );
}

export function UserIcon() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    let customer = {
        body: {
            firstName: '',
            lastName: '',
        },
    };

    if (localStorage.getItem('currentCustomer')) {
        const customerJSON = localStorage.getItem('currentCustomer') as string;
        customer = JSON.parse(customerJSON);
    }
    const [text, setText] = useState(customer);
    return (
        <Layout key={'/my-profile/'}>
            <Header style={{ padding: 0, background: colorBgContainer }}>
                <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </div>
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                    <Title level={3}>
                        {text.body.firstName} {text.body.lastName}
                    </Title>
                </div>
            </Content>
        </Layout>
    );
}

// export function ShippingAddresses() {
//     const {
//         token: { colorBgContainer },
//     } = theme.useToken();

//     return (
//         <Layout key={'/my-profile/billing-addresses'}>
//             <Header style={{ padding: 0, background: colorBgContainer }}>
//                 <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
//                     <Title level={3}>Shipping Addresses</Title>
//                 </div>
//             </Header>
//             <Content style={{ margin: '24px 16px 0' }}>
//                 <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>content</div>
//             </Content>
//         </Layout>
//     );
// }

// export function BillingAddresses() {
//     const {
//         token: { colorBgContainer },
//     } = theme.useToken();

//     return (
//         <Layout key={'billingAddresses'}>
//             <Header style={{ padding: 0, background: colorBgContainer }}>
//                 <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
//                     <Title level={3}>Billing Addresses</Title>
//                 </div>
//             </Header>
//             <Content style={{ margin: '24px 16px 0' }}>
//                 <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>content</div>
//             </Content>
//         </Layout>
//     );
// }

// export function ChangePassword() {
//     const {
//         token: { colorBgContainer },
//     } = theme.useToken();

//     return (
//         <Layout key={'billingAddresses'} style={{ width: '100%' }}>
//             <Header style={{ padding: 0, background: colorBgContainer }}>
//                 <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
//                     <Title level={3}>Change Password</Title>
//                 </div>
//             </Header>
//             <Content style={{ margin: '24px 16px 0' }}>
//                 <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>content</div>
//             </Content>
//         </Layout>
//     );
// }

export const MyProfilePage = () => {
    return (
        <Layout>
            <SideMenu />
            <Layout>
                <Routes>
                    <Route path="/" element={<UserIcon />}></Route>
                    <Route path="/user-information" element={<UserInformation />} />
                    <Route path="/addresses" element={<Addresses />} />
                    <Route path="/change-password" element={<PassWord />} />
                </Routes>
            </Layout>
        </Layout>
    );
};
