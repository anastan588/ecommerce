import { Card, Avatar, Layout, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import we from '../we';

const { Meta } = Card;
const { Header, Footer, Sider, Content } = Layout;

const AllMembers: React.FC = () => {
    const navigate = useNavigate();

    function openNastyaPage() {
        navigate(`/about/nastya`);
    }
    function openYuliaPage() {
        navigate(`/about/yulia`);
    }
    function openSashaPage() {
        navigate(`/about/aliaksandr`);
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 50 }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                <Col
                    style={{ display: 'flex', flexDirection: 'column' }}
                    onClick={() => {
                        openNastyaPage();
                    }}
                >
                    <Card
                        hoverable
                        style={{ width: 240, display: 'flex', flexDirection: 'column', gap: 15 }}
                        cover={<img alt="nastya" src={we.nastya.foto} />}
                    >
                        <Meta style={{ textAlign: 'center' }} title={we.nastya.name} description="Team Lead" />
                        <Content style={{ textAlign: 'center', fontSize: 16, lineHeight: '120%' }}>
                            Team Lead Anаstasiya занималась реализацией страницы регистрации пользователя и страницы
                            профиля пользователя, страницей информации о комманде и дизайном оформления магазина.{' '}
                        </Content>
                    </Card>
                </Col>
                <Col
                    style={{ display: 'flex', flexDirection: 'column' }}
                    onClick={() => {
                        openYuliaPage();
                    }}
                >
                    <Card hoverable style={{ width: 240 }} cover={<img alt="julia" src={we.julliya.foto} />}>
                        <Meta style={{ textAlign: 'center' }} title={we.julliya.name} description="Team Member" />
                        <Content style={{ textAlign: 'center', fontSize: 16, lineHeight: '120%' }}>
                            Yulia, наш Team Member, взяла на себя задачу Log In пользователя, а также была очень
                            увлечена реализацией страницы каталога, всеми возможными видами фильтров и сортировок,
                            улучшениями данной страницы.
                        </Content>
                    </Card>
                </Col>
                <Col
                    style={{ display: 'flex', flexDirection: 'column' }}
                    onClick={() => {
                        openSashaPage();
                    }}
                >
                    <Card hoverable style={{ width: 240 }} cover={<img alt="sasha" src={we.aleksandr.foto} />}>
                        <Meta style={{ textAlign: 'center' }} title={we.aleksandr.name} description="Team Member" />
                        <Content style={{ textAlign: 'center', fontSize: 16, lineHeight: '120%' }}>
                            Наш рыцарь Александр взял на себя задачу роутинга магазина и релизацию страницы продукта
                            магазина, а также реализацию корзины.
                        </Content>
                    </Card>
                </Col>
            </div>
            <Content style={{ textAlign: 'center', fontSize: 20, lineHeight: '150%', alignSelf: 'center' }}>
                Наша комманда на проекте назывется Dreamers. Мы решили разработать интернет магазин продажи цветов и
                растений. Наш проект мы пишем на React c использованием билиотеки Ant Design, для реализации всплывающих
                сообщений использовалась билиотека React-Toastify, запросы на сервер реализовывались в помощь SDK
                Commercetools. В процесе работы над проектом мы научились работать в комманде. Были приоретены навыки
                коммандной работы в GitHub. Для распределения задач был огранизован Task Bar c помощью приложения
                Trello.
            </Content>
        </div>
    );
};

export default AllMembers;
