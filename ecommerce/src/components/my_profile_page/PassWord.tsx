import { Layout, theme, Card } from 'antd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PasswordChange from './password/changepassword';

const { Content } = Layout;

export function PassWord() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout key={'/my-profile/change-password'}>
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
                        title="Change Password"
                        bodyStyle={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 20,
                        }}
                    >
                        <PasswordChange />
                    </Card>
                </div>
            </Content>
            <ToastContainer />
        </Layout>
    );
}

export default PassWord;
