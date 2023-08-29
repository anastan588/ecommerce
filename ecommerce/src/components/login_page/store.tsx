import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
// eslint-disable-next-line import/no-extraneous-dependencies
import { makeAutoObservable } from 'mobx';
import { apiRoot, getClientWithToken, getPasswordFlowClient } from './createClient';
import { projectKey, getLocalStorage } from './BuildClient';
import registyles from '../registration_page/regisration_page.module.css';
import { Customer } from '../../types';
import { newCustomer } from '../registration_page/RegistrationPage';

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
        localStorage.removeItem('id');
        this.setAuth(false);
    }

    registration(client: Customer) {
        return apiRoot
            .customers()
            .post({
                body: client,
            })
            .execute()
            .then((body) => {
                console.log(body.statusCode);
                console.log(body.statusCode === 201);
                alert('Customer has been created');
                this.setAuth(true);
                localStorage.removeItem('token');
                const customer = getPasswordFlowClient(newCustomer.email, newCustomer.password);
                const apiRootClient = createApiBuilderFromCtpClient(customer);
                const endPointPassword = () => {
                    return apiRootClient.withProjectKey({ projectKey }).me().get().execute();
                };
                // eslint-disable-next-line @typescript-eslint/no-shadow
                endPointPassword()
                    // eslint-disable-next-line @typescript-eslint/no-shadow
                    .then(({ body }) => {
                        console.log(body);
                        localStorage.setItem('id', body.id);
                    })
                    .catch(({ error }) => {
                        console.log(error);
                    });
            })
            .catch((err) => {
                // const currentErrorMessage = document.querySelector(
                //     `.${registyles.error_email}`
                // ) as HTMLParagraphElement;
                alert(err.message);
                // currentErrorMessage.innerHTML = 'There is already an existing customer with the provided email.';
                // const currentInput = document.querySelector(`.${registyles.input_mail}`) as HTMLInputElement;
                // currentInput.style.border = '1px solid #ff4d4f';
            });
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

    receiveCustomerById() {
        const ID = localStorage.getItem('id') as string;
        return apiRoot
            .customers()
            .withId({ ID })
            .get()
            .execute()
            .then((body) => {
                console.log(body);
                const customer = JSON.stringify(body);
                localStorage.setItem('currentCustomer', customer);
            });
    }

    updateCustomer() {
        const ID = localStorage.getItem('id') as string;
        const customerJSON = localStorage.getItem('currentCustomer') as string;
        const customer = JSON.parse(customerJSON);
        return apiRoot
            .customers()
            .withId({ ID })
            .post({
                body: {
                    // The version of a new Customer is 1. This value is incremented every time an update action is applied to the Customer. If the specified version does not match the current version, the request returns an error.
                    version: 1,
                    actions: [
                        {
                            action: 'setFirstName',
                            firstName: `${customer.body.firstName}`,
                        },
                    ],
                },
            })
            .execute();
    }
}
export default Store;
