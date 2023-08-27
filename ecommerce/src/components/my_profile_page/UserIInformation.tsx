import React from 'react';
import { Layout, theme, Typography, Badge, Descriptions, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import type { DescriptionsProps } from 'antd';
import Column from 'antd/es/table/Column';

const { Header, Content } = Layout;
const { Title } = Typography;

const itemsForPersonalInformation: DescriptionsProps['items'] = [
    {
        key: '1',
        label: 'First Name',
        children: (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <div>John</div>
                <Button icon={<EditOutlined />}>Edit</Button>
            </div>
        ),
    },
    {
        key: '2',
        label: 'Last name',
        children: (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <div>Ivanov</div>
                <Button icon={<EditOutlined />}>Edit</Button>
            </div>
        ),
    },
    {
        key: '3',
        label: 'Date of Birth',
        children: <div
        style={{
            display: 'flex',
            justifyContent: 'space-between'
        }}
    >
        <div>02-04-2003</div>
        <Button icon={<EditOutlined />}>Edit</Button>
    </div>,
    },
];

export function UserInformation() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout key={'/my-profile/user-information'}>
            <Header style={{ padding: 0, background: colorBgContainer }}>
                <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                    <Title level={3}>User Information</Title>
                </div>
            </Header>
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
                    <Descriptions layout="vertical" bordered items={itemsForPersonalInformation} />
                </div>
            </Content>
        </Layout>
    );
}

export default UserInformation;
