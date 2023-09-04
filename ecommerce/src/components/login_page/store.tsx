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
import { Values } from '../my_profile_page/password/changepassword';

type Address = {
    id: string;
    streetName: string;
    city: string;
    postalCode: string;
    country: string;
};

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
            .then((body) => {
                // console.log(statusCode);
                this.setAuth(true);
                localStorage.removeItem('token');
                const customer = JSON.stringify(body);
                localStorage.setItem('currentCustomer', customer);
            })
            .catch((e) => {
                alert(e.message);
            });
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('currentCustomer');
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
                    this.receiveCustomerById();
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

    updateCustomer(vers: number) {
        const ID = localStorage.getItem('id') as string;
        const customerJSON = localStorage.getItem('currentCustomer') as string;
        const customer = JSON.parse(customerJSON);
        return apiRoot
            .customers()
            .withId({ ID })
            .post({
                body: {
                    // The version of a new Customer is 1. This value is incremented every time an update action is applied to the Customer. If the specified version does not match the current version, the request returns an error.
                    version: vers,
                    actions: [
                        {
                            action: 'setFirstName',
                            firstName: `${customer.body.firstName}`,
                        },
                        {
                            action: 'setLastName',
                            lastName: `${customer.body.lastName}`,
                        },
                        {
                            action: 'setDateOfBirth',
                            dateOfBirth: `${customer.body.dateOfBirth}`,
                        },
                        {
                            action: 'changeEmail',
                            email: `${customer.body.email}`,
                        },
                    ],
                },
            })
            .execute()
            .then((body) => {
                const customerUpdate = JSON.stringify(body);
                localStorage.removeItem('currentCustomer');
                localStorage.setItem('currentCustomer', customerUpdate);
            });
    }

    changePasswordOfCustomer(vers: number, currentPassword: string, nextPassword: string) {
        const ID = localStorage.getItem('id') as string;
        const customerJSON = localStorage.getItem('currentCustomer') as string;
        const customer = JSON.parse(customerJSON);
        return apiRoot
            .customers()
            .password()
            .post({
                body: {
                    id: `${ID}`,
                    version: vers,
                    currentPassword: `${currentPassword}`,
                    newPassword: `${nextPassword}`,
                },
            })
            .execute()
            .then((body) => {
                const customerUpdate = JSON.stringify(body);
                localStorage.removeItem('currentCustomer');
                localStorage.setItem('currentCustomer', customerUpdate);
            });
    }

    changeAddress(vers: number, addressID: string, address: Address) {
        const ID = localStorage.getItem('id') as string;
        const customerJSON = localStorage.getItem('currentCustomer') as string;
        const customer = JSON.parse(customerJSON);
        return apiRoot
            .customers()
            .withId({ ID })
            .post({
                body: {
                    // The version of a new Customer is 1. This value is incremented every time an update action is applied to the Customer. If the specified version does not match the current version, the request returns an error.
                    version: vers,
                    actions: [
                        {
                            action: 'changeAddress',
                            addressId: `${addressID}`,
                            address: {
                                country: `${address.country}`,
                                city: `${address.city}`,
                                streetName: `${address.streetName}`,
                                postalCode: `${address.postalCode}`,
                            },
                        },
                    ],
                },
            })
            .execute()
            .then((body) => {
                const customerUpdate = JSON.stringify(body);
                localStorage.removeItem('currentCustomer');
                localStorage.setItem('currentCustomer', customerUpdate);
            });
    }

    addShippingAddress(vers: number, newShipAddress: string) {
        const ID = localStorage.getItem('id') as string;
        const customerJSON = localStorage.getItem('currentCustomer') as string;
        const customer = JSON.parse(customerJSON);
        return apiRoot
            .customers()
            .withId({ ID })
            .post({
                body: {
                    // The version of a new Customer is 1. This value is incremented every time an update action is applied to the Customer. If the specified version does not match the current version, the request returns an error.
                    version: vers,
                    actions: [
                        {
                            action: 'addShippingAddressId',
                            addressId: `${newShipAddress}`,
                        },
                    ],
                },
            })
            .execute()
            .then((body) => {
                const customerUpdate = JSON.stringify(body);
                localStorage.removeItem('currentCustomer');
                localStorage.setItem('currentCustomer', customerUpdate);
            });
    }

    addBillingAddress(vers: number, newBillAddress: string) {
        const ID = localStorage.getItem('id') as string;
        const customerJSON = localStorage.getItem('currentCustomer') as string;
        const customer = JSON.parse(customerJSON);
        return apiRoot
            .customers()
            .withId({ ID })
            .post({
                body: {
                    // The version of a new Customer is 1. This value is incremented every time an update action is applied to the Customer. If the specified version does not match the current version, the request returns an error.
                    version: vers,
                    actions: [
                        {
                            action: 'addBillingAddressId',
                            addressId: `${newBillAddress}`,
                        },
                    ],
                },
            })
            .execute()
            .then((body) => {
                const customerUpdate = JSON.stringify(body);
                localStorage.removeItem('currentCustomer');
                localStorage.setItem('currentCustomer', customerUpdate);
            });
    }

    deleteShippingAddress(vers: number, deleteShipAddress: string) {
        const ID = localStorage.getItem('id') as string;
        const customerJSON = localStorage.getItem('currentCustomer') as string;
        const customer = JSON.parse(customerJSON);
        return apiRoot
            .customers()
            .withId({ ID })
            .post({
                body: {
                    // The version of a new Customer is 1. This value is incremented every time an update action is applied to the Customer. If the specified version does not match the current version, the request returns an error.
                    version: vers,
                    actions: [
                        {
                            action: 'removeShippingAddressId',
                            addressId: `${deleteShipAddress}`,
                        },
                    ],
                },
            })
            .execute()
            .then((body) => {
                const customerUpdate = JSON.stringify(body);
                localStorage.removeItem('currentCustomer');
                localStorage.setItem('currentCustomer', customerUpdate);
            });
    }

    deleteBillingAddress(vers: number, deleteBillAddress: string) {
        const ID = localStorage.getItem('id') as string;
        const customerJSON = localStorage.getItem('currentCustomer') as string;
        const customer = JSON.parse(customerJSON);
        return apiRoot
            .customers()
            .withId({ ID })
            .post({
                body: {
                    // The version of a new Customer is 1. This value is incremented every time an update action is applied to the Customer. If the specified version does not match the current version, the request returns an error.
                    version: vers,
                    actions: [
                        {
                            action: 'removeBillingAddressId',
                            addressId: `${deleteBillAddress}`,
                        },
                    ],
                },
            })
            .execute()
            .then((body) => {
                const customerUpdate = JSON.stringify(body);
                localStorage.removeItem('currentCustomer');
                localStorage.setItem('currentCustomer', customerUpdate);
            });
    }

    setDefaultShippingAddress(vers: number, newDefShipAddress: string) {
        const ID = localStorage.getItem('id') as string;
        const customerJSON = localStorage.getItem('currentCustomer') as string;
        const customer = JSON.parse(customerJSON);
        return apiRoot
            .customers()
            .withId({ ID })
            .post({
                body: {
                    // The version of a new Customer is 1. This value is incremented every time an update action is applied to the Customer. If the specified version does not match the current version, the request returns an error.
                    version: vers,
                    actions: [
                        {
                            action: 'setDefaultShippingAddress',
                            addressId: `${newDefShipAddress}`,
                        },
                    ],
                },
            })
            .execute()
            .then((body) => {
                const customerUpdate = JSON.stringify(body);
                localStorage.removeItem('currentCustomer');
                localStorage.setItem('currentCustomer', customerUpdate);
            });
    }

    setDefaultBillingAddress(vers: number, newDefBillAddress: string) {
        const ID = localStorage.getItem('id') as string;
        const customerJSON = localStorage.getItem('currentCustomer') as string;
        const customer = JSON.parse(customerJSON);
        return apiRoot
            .customers()
            .withId({ ID })
            .post({
                body: {
                    // The version of a new Customer is 1. This value is incremented every time an update action is applied to the Customer. If the specified version does not match the current version, the request returns an error.
                    version: vers,
                    actions: [
                        {
                            action: 'setDefaultBillingAddress',
                            addressId: `${newDefBillAddress}`,
                        },
                    ],
                },
            })
            .execute()
            .then((body) => {
                const customerUpdate = JSON.stringify(body);
                localStorage.removeItem('currentCustomer');
                localStorage.setItem('currentCustomer', customerUpdate);
            });
    }
}
export default Store;
