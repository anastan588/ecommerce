import fetch from 'node-fetch';
import {
    ClientBuilder,

    // Import middlewares
    type AuthMiddlewareOptions, // Required for auth
    type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

import API_CLIENT_SETTINGS from './apiClientSettings';

console.log(API_CLIENT_SETTINGS);

const projectKey = `${API_CLIENT_SETTINGS.projectKey}`;
const scopes = [`${API_CLIENT_SETTINGS.scope}`];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: `https://auth.${API_CLIENT_SETTINGS.region}.commercetools.com`,
    projectKey,
    credentials: {
        clientId: `${API_CLIENT_SETTINGS.clientId}`,
        clientSecret: `${API_CLIENT_SETTINGS.clientSecret}`,
    },
    scopes,
    fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: `https://api.${API_CLIENT_SETTINGS.region}.commercetools.com`,
    fetch,
};

// Export the ClientBuilder
const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware() // Include middleware for logging
    .build();

export default ctpClient;
