import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import { Alert } from 'antd';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import RouterComponent from './components/router/Router';

const App: React.FC = () => (
    <div className="main_container" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <BrowserRouter>
            <Header />
            <RouterComponent />
            <Footer />
        </BrowserRouter>
    </div>
);

export default App;
