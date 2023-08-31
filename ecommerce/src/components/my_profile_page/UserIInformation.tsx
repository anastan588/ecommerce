import { Layout, theme, Typography, Button, Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Form } from 'react-router-dom';
import FirstNameEdit from './userInformation/userFirstName';
import LastNameEdit from './userInformation/userLastName';
import DateOfBirthEdit from './userInformation/dateOfBirth';
import EmailEdit from './userInformation/email';

const { Content } = Layout;

export function UserInformation() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

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
                    <Card
                        title="User Information"
                        style={{
                            padding: 24,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                        }}
                    >
                        <FirstNameEdit />
                        <LastNameEdit />
                        <DateOfBirthEdit />
                        <EmailEdit />
                    </Card>
                </div>
            </Content>
            <ToastContainer />
        </Layout>
    );
}

export default UserInformation;
