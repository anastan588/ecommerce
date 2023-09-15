import { Card, Avatar, Layout, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import we from '../we';

const { Meta } = Card;
const { Header, Footer, Sider, Content } = Layout;

const NastyaPage = () => {
    return (
        <div style={{ display: 'flex', gap: 50 }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                <Col style={{ display: 'flex', flexDirection: 'column' }}>
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
            </div>
            <Content
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: 20,
                    lineHeight: '150%',
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
                        <li>Skills in Chrome DevTools, Git, VS Code, Sass, Webpack</li>
                        <li>Creating landing pages and applications with HTML5,CSS, Javascript, TypeScript</li>
                    </ul>
                </Content>
                <Content>
                    <p>
                        <b>Courses:</b>
                    </p>
                    <ul>
                        <li>2023 – present time – "JavaScript/Front-end 2023Q1", Rolling Scopes school.</li>
                        <li>2022 – 2023 – "JavaScript/Front-end Pre-school 2022Q4", Rolling Scopes school.</li>
                        <li>
                            2023 – February – Intensiv "UX/UI Start", Itlogia.Certificate of Achievement 2023 – January
                            – Intensiv "Front-end Start" , Itlogia
                        </li>
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
                        <li>2011 – 2014 – Belarus state economic university</li>
                        <li>2006 – 2011 – Polotsk state university</li>
                    </ul>
                </Content>
            </Content>
        </div>
    );
};

export default NastyaPage;
