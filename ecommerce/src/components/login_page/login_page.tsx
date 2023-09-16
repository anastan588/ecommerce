import React from 'react';
import Login from './Login';
import './login.css';
import BackGround from '../../images/backgrounds/background3.jpg';

const LogInPage = () => {
    return (
        <div className="login_form">
            <img
                src={BackGround}
                alt="mainPage"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
            />
            <Login />
        </div>
    );
};

export default LogInPage;
