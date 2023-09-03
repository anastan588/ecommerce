import { Layout, theme, Card } from 'antd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddRessesEdit from './addressesContent/allAddresses';

const { Content } = Layout;

export function Addresses() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout key={'/my-profile/addresses'}>
            <Content style={{ margin: '0px 0px 0px 0px', padding: '0px 0px 0px 0px' }}>
                <div
                    style={{
                        background: colorBgContainer,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 20,
                        padding: '0px 0px 0px 0px',
                    }}
                >
                    <AddRessesEdit />
                </div>
            </Content>
            <ToastContainer />
        </Layout>
    );
}

export default Addresses;
