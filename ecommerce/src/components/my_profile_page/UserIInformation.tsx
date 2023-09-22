import { Layout, theme, Card } from 'antd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            <Content
                style={{
                    margin: '24px 16px 0',
                    position: 'relative',
                    zIndex: 1,
                    backgroundColor: 'rgba(250, 240, 190, 0.5)',
                    padding: 5,
                    borderRadius: 5,
                }}
            >
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
                        title="User's Information"
                        bodyStyle={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 20,
                            position: 'relative',
                            backgroundColor: 'rgba(250, 240, 190, 0.5)',
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
