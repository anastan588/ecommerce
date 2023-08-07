import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/header';
import RouterComponent from './components/router/Router';

const App: React.FC = () => (
    <div>
        <BrowserRouter>
            <Header />
            <RouterComponent />
        </BrowserRouter>
    </div>
);

export default App;
