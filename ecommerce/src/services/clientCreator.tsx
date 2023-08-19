import { error } from 'console';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { Body } from 'node-fetch';
import { ctpClient, ctpClientPasswordFlow } from './BuildClient';
import API_CLIENT_SETTINGS from './apiClientSettings';
import { Customer } from '../types';
// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: `${API_CLIENT_SETTINGS.projectKey}`,
});

const apiRootPasswordFlow = createApiBuilderFromCtpClient(ctpClientPasswordFlow).withProjectKey({
    projectKey: `${API_CLIENT_SETTINGS.projectKey}`,
});

export const clientDraft: Customer = {
    addresses: [{ streetName: 'fgf', city: 'gfgfgfg', postalCode: 'fgfgfg', country: 'LT)' }],
    billingAddresses: [0],
    dateOfBirth: '1984-02-02',
    defaultBillingAddress: 0,
    defaultShippingAddress: 0,
    email: 'anas@mail.ru',
    firstName: 'vghghg',
    lastName: 'fgfgf',
    password: '5952473Ui',
    shippingAddresses: [0],
};

export async function createCustomer(client: Customer) {
    const answer = await apiRoot
        .customers()
        .post({
            body: client,
        })
        .execute()
        .then((body) => body)
        .catch((err) => {
            throw err;
        });
    console.log(answer);
    return answer;
}

export async function createCustomerPasswordflow(client: Customer) {
    const answer = await apiRootPasswordFlow
        .customers()
        .post({
            body: client,
        })
        .execute()
        .then((body) => body)
        .catch((err) => {
            throw err;
        });
    console.log(answer);
    return answer;
}
