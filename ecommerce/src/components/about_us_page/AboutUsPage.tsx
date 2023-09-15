import React, { useState, useEffect, Fragment } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Layout, Menu, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import AllMembers from './ourCommand/allMembers';
import NastyaPage from './ourCommand/nastya';
import YuliaPage from './ourCommand/julia';
import SashaPage from './ourCommand/sasha';
import we from './we';

const { Sider } = Layout;

function SideMenu() {
    const navigate = useNavigate();

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <Menu
                onClick={({ key }) => navigate(key)}
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['3']}
                items={[
                    {
                        key: '/about/nastya',
                        icon: React.createElement(UserOutlined),
                        label: `Anastasiya`,
                    },
                    {
                        key: '/about/aliaksandr',
                        icon: React.createElement(UserOutlined),
                        label: `Aliaksandr`,
                    },
                    {
                        key: '/about/yulia',
                        icon: React.createElement(UserOutlined),
                        label: 'Yulia',
                    },
                ]}
            />
        </Sider>
    );
}

const AboutUsPage = () => {
    return (
        <Layout>
            <SideMenu />
            <Layout style={{ padding: 20 }}>
                <Routes>
                    <Route path="/" element={<AllMembers />}></Route>
                    <Route path="/nastya" element={<NastyaPage />}></Route>
                    <Route path="/yulia" element={<YuliaPage />}></Route>
                    <Route path="/aliaksandr" element={<SashaPage />}></Route>
                </Routes>
            </Layout>
        </Layout>
    );
};

export default AboutUsPage;
