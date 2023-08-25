import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/header';
import RegistrationPage from './components/registration_page/RegistrationPage';
import RouterComponent from './components/router/Router';

const App: React.FC = () => (
    <div className="main_container">
        <BrowserRouter>
            <Header />
            <RouterComponent />
        </BrowserRouter>
    </div>
);

export default App;
