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
            <Content
                style={{
                    margin: '0px 0px 0px 0px',
                    zIndex: 1,
                    backgroundColor: 'rgba(250, 240, 190, 0.5)',
                    padding: 5,
                    borderRadius: 5,
                }}
            >
                <div
                    style={{
                        background: colorBgContainer,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 20,
                        padding: '0px 0px 0px 0px',
                        backgroundColor: 'rgba(250, 240, 190, 0.5)',
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
