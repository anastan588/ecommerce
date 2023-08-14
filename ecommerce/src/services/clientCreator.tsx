import { error } from 'console';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { Body } from 'node-fetch';
import ctpClient from './BuildClient';
import API_CLIENT_SETTINGS from './apiClientSettings';
import { Customer } from '../types';
// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: `${API_CLIENT_SETTINGS.projectKey}`,
});

export const clientDraft: Customer = {
    email: 'getting-started@example.com',
    password: 'examplePassword',
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
