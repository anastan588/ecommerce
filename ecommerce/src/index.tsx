import React from 'react';
import ReactDOM from 'react-dom/client';
import API_CLIENT_SETTINGS from './services/apiClientSettings';
import { createCustomer, clientDraft } from './services/clientCreator';
import { Customer } from './types';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

console.log(API_CLIENT_SETTINGS);

// const clientDraft: Customer = {
//     email: 'getting-started@example.com',
//     password: 'examplePassword',
// };

console.log(clientDraft);
createCustomer(clientDraft);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
