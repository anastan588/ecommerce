import React, { ReactElement, useState, useContext, lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import MainPage from '../main_page/MainPage';
// import CatalogPage from '../catalog_page/CatalogPage';
import AboutUsPage from '../about_us_page/AboutUsPage';
import BasketPage from '../basket_page/BasketPage';
import RegistrationPage from '../registration_page/RegistrationPage';
import LogInPage from '../login_page/login_page';
import Page404 from '../page_404/Page404';
import CreateCustomerMessage from '../message_create_customer/message_create_customer';
import ProductPage from '../product_page/ProductPage';
import { MyProfilePage } from '../my_profile_page/MyProfilePage';
import { Context } from '../..';
import '../../index.css';
import Spinner from './spinner';

const CatalogPage = lazy(() => import('../catalog_page/CatalogPage'));
// const MainPage = lazy(() => import('../main_page/MainPage'));
// const ProductPage = lazy(() => import('../product_page/ProductPage'));

const RouterComponent = () => {
    const { store } = useContext(Context);

    function MyProfile() {
        if (store.isAuth) {
            return <MyProfilePage />;
        }
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route
                    path="/catalog"
                    element={
                        <Suspense fallback={<Spinner />}>
                            <CatalogPage />
                        </Suspense>
                    }
                />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/basket" element={<BasketPage />} />
                <Route path="/productpage/*" element={<ProductPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/login" element={<LogInPage />} />
                <Route path="/my-profile/*" element={<MyProfile />} />
                <Route path="*" element={<Page404 />} />
                <Route path="/message-create" element={<CreateCustomerMessage />} />
            </Routes>
        </div>
    );
};

export default RouterComponent;
