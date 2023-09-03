import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Store from './components/login_page/store';
import { ProductsStore } from './components/catalog_page/productsStore';

const store = new Store();
const products = new ProductsStore();
// eslint-disable-next-line import/prefer-default-export
export const Context = createContext({ store, products });
// export const ProductsContext = createContext({ products });

const element = document.querySelector('#root');

if (element) {
    const root = ReactDOM.createRoot(element);
    root.render(
        <Context.Provider value={{ store, products }}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Context.Provider>
    );
}

/* const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Context.Provider value={{ store }}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Context.Provider>
); */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
