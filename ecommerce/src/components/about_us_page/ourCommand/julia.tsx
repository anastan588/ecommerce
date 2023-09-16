import { Card, Avatar, Layout, Col } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import Github from '../../../images/icon/github-512.webp';
import we from '../we';

const { Meta } = Card;
const { Header, Footer, Sider, Content } = Layout;

const YuliaPage = () => {
    return (
        <div style={{ display: 'flex', gap: 50 }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                <Col style={{ display: 'flex', flexDirection: 'column' }}>
                    <Card
                        hoverable
                        style={{
                            width: 350,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 10,
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
                                gap: 10,
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
                                Yulia, наш Team Member, взяла на себя задачу Log In пользователя, а также была очень
                                увлечена реализацией страницы каталога, всеми возможными видами фильтров и сортировок,
                                улучшениями данной страницы.
                            </Content>
                        </Col>
                    </Card>
                </Col>
            </div>
            <Content
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: 20,
                    lineHeight: '150%',
                    position: 'relative',
                    zIndex: 1,
                    backgroundColor: 'rgba(250, 240, 190, 0.5)',
                    padding: 5,
                    borderRadius: 5,
                }}
            >
                <Content>
                    <p>
                        <b>Soft skills:</b>
                    </p>
                    <ul>
                        <li>Communication</li>
                        <li>Teamwork</li>
                        <li>Big data analytics</li>
                        <li>Stress resistance</li>
                        <li>Adaptability</li>
                    </ul>
                </Content>
                <Content>
                    <p>
                        <b>Hard skills:</b>
                    </p>
                    <ul>
                        <li>Knowledge of HTML5, CSS, Javascript, TypeScript</li>
                        <li>Skills in Chrome DevTools, Git, VS Code, Webpack, React</li>
                    </ul>
                </Content>
                <Content>
                    <p>
                        <b>Courses:</b>
                    </p>
                    <ul>
                        <li>2023 – present time – "JavaScript/Front-end 2023Q1", Rolling Scopes school.</li>
                        <li>2022 – 2023 – "JavaScript/Front-end Pre-school 2022Q4", Rolling Scopes school.</li>
                    </ul>
                </Content>
                <Content>
                    <p>
                        <b>Languages:</b>
                    </p>
                    <ul>
                        <li>English – A2</li>
                        <li>Russian – native</li>
                    </ul>
                </Content>
                <Content>
                    <p>
                        <b>Higher Education:</b>
                    </p>
                    <ul>
                        <li>Belarus State Economic University</li>
                    </ul>
                </Content>
            </Content>
        </div>
    );
};

export default YuliaPage;
