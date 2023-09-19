import { Card, Avatar, Layout, Col } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import Github from '../../../images/icon/github-512.webp';
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                <Col
                    style={{ display: 'flex', flexDirection: 'column' }}
                    onClick={() => {
                        openNastyaPage();
                    }}
                >
                    <Card
                        hoverable
                        style={{
                            maxWidth: 240,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 5,
                        }}
                        cover={<img alt="nastya" src={we.nastya.foto} />}
                    >
                        <Meta
                            style={{ textAlign: 'center', marginBottom: 15 }}
                            title={we.nastya.name}
                            description="Team Lead"
                        />
                        <Col
                            style={{
                                cursor: 'pointer',
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 5,
                            }}
                        >
                            <Link
                                className="header__item"
                                style={{ transition: 'all 0.5s ease' }}
                                to="https://github.com/anastan588"
                                target="_blank"
                            >
                                <img src={Github} alt="GitHub" style={{ maxHeight: 30 }} />
                            </Link>
                            <Content style={{ textAlign: 'center', fontSize: 16, lineHeight: '120%' }}>
                                Anаstasiya занималась реализацией страницы регистрации пользователя и страницы профиля
                                пользователя, страницей информации о комманде и дизайном оформления магазина.{' '}
                            </Content>
                        </Col>
                    </Card>
                </Col>
                <Col
                    style={{ display: 'flex', flexDirection: 'column' }}
                    onClick={() => {
                        openYuliaPage();
                    }}
                >
                    <Card
                        hoverable
                        style={{
                            maxWidth: 240,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 5,
                        }}
                        cover={<img alt="julia" src={we.julliya.foto} />}
                    >
                        <Meta
                            style={{ textAlign: 'center', marginBottom: 15 }}
                            title={we.julliya.name}
                            description="Team Member"
                        />
                        <Col
                            style={{
                                cursor: 'pointer',
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 5,
                            }}
                        >
                            <Link
                                className="header__item"
                                style={{ transition: 'all 0.5s ease' }}
                                to="https://github.com/Jjjulietta"
                                target="_blank"
                            >
                                <img src={Github} alt="GitHub" style={{ maxHeight: 30 }} />
                            </Link>
                            <Content style={{ textAlign: 'center', fontSize: 16, lineHeight: '120%' }}>
                                Yulia взяла на себя задачу Log In пользователя, а также была очень увлечена реализацией
                                страницы каталога, всеми возможными видами фильтров и сортировок, улучшениями данной
                                страницы.
                            </Content>
                        </Col>
                    </Card>
                </Col>
                <Col
                    style={{ display: 'flex', flexDirection: 'column' }}
                    onClick={() => {
                        openSashaPage();
                    }}
                >
                    <Card
                        hoverable
                        style={{
                            maxWidth: 240,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 5,
                        }}
                        cover={<img alt="sasha" src={we.aleksandr.foto} />}
                    >
                        <Meta
                            style={{ textAlign: 'center', marginBottom: 15 }}
                            title={we.aleksandr.name}
                            description="Team Member"
                        />
                        <Col
                            style={{
                                cursor: 'pointer',
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 5,
                            }}
                        >
                            <Link
                                className="header__item"
                                style={{ transition: 'all 0.5s ease' }}
                                to="https://github.com/FedAliaks"
                                target="_blank"
                            >
                                <img src={Github} alt="GitHub" style={{ maxHeight: 30 }} />
                            </Link>
                            <Content style={{ textAlign: 'center', fontSize: 16, lineHeight: '120%' }}>
                                Наш рыцарь Александр взял на себя задачу роутинга магазина и релизацию страницы продукта
                                магазина, а также реализацию корзины.
                            </Content>
                        </Col>
                    </Card>
                </Col>
            </div>
            <Content
                style={{
                    textAlign: 'center',
                    fontSize: 20,
                    lineHeight: '150%',
                    alignSelf: 'center',
                    position: 'relative',
                    zIndex: 1,
                    backgroundColor: 'rgba(250, 240, 190, 0.8)',
                    padding: 5,
                    borderRadius: 5,
                }}
            >
                Наша комманда на проекте назывется <b>Dreamers</b>. Мы решили разработать интернет магазин продажи
                цветов и растений. Наш проект мы пишем на <b>React</b> c использованием билиотеки <b>Ant Design</b>, для
                реализации всплывающих сообщений использовалась билиотека <b>React-Toastify</b>, запросы на сервер
                реализовывались в помощь <b>SDK Commercetools</b>, сохранение данных в стор осуществлялось при помощи
                билиотеки <b>Mobx</b>. В процесе работы над проектом мы учились работать вместе. Были приоретены навыки
                коммандной работы в <b>GitHub</b>. Для распределения задач был огранизован <b>Task Bar</b> c помощью
                приложения <b>Trello</b>.
            </Content>
        </div>
    );
};

export default AllMembers;
