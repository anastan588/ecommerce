import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
// eslint-disable-next-line import/no-extraneous-dependencies
import { makeAutoObservable } from 'mobx';
import { apiRoot, getClientWithToken } from './createClient';
import { projectKey, getLocalStorage } from './BuildClient';

class Store {
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    login(email: string, password: string) {
        console.log(email);
        return apiRoot
            .login()
            .post({
                body: {
                    email: `${email}`,
                    password: `${password}`,
                },
            })
            .execute()
            .then((statusCode) => {
                console.log(statusCode);
                this.setAuth(true);
                localStorage.removeItem('token');
            })
            .catch((e) => {
                alert(e.message);
            });
    }

    logout() {
        localStorage.removeItem('token');
        this.setAuth(false);
    }

    checkAuth() {
        const tokenStore = getLocalStorage();
        const { refreshToken } = tokenStore;
        const client = getClientWithToken(refreshToken);
        const apiRootToken = createApiBuilderFromCtpClient(client);
        const endPointToken = () => {
            return apiRootToken.withProjectKey({ projectKey }).me().get().execute();
        };
        endPointToken()
            /* .then(({ statusCode }) => {
                    console.log(statusCode);
                }) */
            .then(({ statusCode }) => {
                if (statusCode === 200) {
                    console.log(statusCode);
                    this.setAuth(true);
                }
            })
            .catch(console.error);
    }
}
export default Store;
