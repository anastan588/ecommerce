// eslint-disable-next-line import/no-extraneous-dependencies
// import fetch from 'node-fetch';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { ByProjectKeyCustomersPasswordTokenByPasswordTokenRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/customers/by-project-key-customers-password-token-by-password-token-request-builder';
import {
    AnonymousAuthMiddlewareOptions,
    ClientBuilder,
    PasswordAuthMiddlewareOptions,
    RefreshAuthMiddlewareOptions,
    TokenCacheOptions,
    TokenStore,
    // Import middlewares
    type AuthMiddlewareOptions, // Required for auth
    type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';
// import fetch from 'node-fetch';

import { ADMIN_CLIENT_ID, ADMIN_CLIENT_SECRET, CTP_PROJECT_KEY, CTP_AUTH_URL, CTP_API_URL } from './data';

export const projectKey = `${CTP_PROJECT_KEY}`;
const scopes = [`manage_project:${projectKey}`];

export function setLocalStorage(cache: TokenStore) {
    if (cache !== null) {
        localStorage.setItem('token', JSON.stringify(cache));
    }
}

export function getLocalStorage() {
    const str = localStorage.getItem('token');
    let cache;
    if (str != null && str.toString()) {
        cache = JSON.parse(str);
    }
    return cache;
}
// Configure authMiddlewareOptions
export const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: `https://auth.${CTP_AUTH_URL}.commercetools.com`,
    projectKey,
    credentials: {
        clientId: `${ADMIN_CLIENT_ID}`,
        clientSecret: `${ADMIN_CLIENT_SECRET}`,
    },
    scopes,
    fetch,
};

// Configure httpMiddlewareOptions
export const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: 'https://api.europe-west1.gcp.commercetools.com',
    fetch,
};
/* const PasswordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: `https://auth.${CTP_AUTH_URL}.commercetools.com`,
    projectKey,
    credentials: {
        clientId: `${ADMIN_CLIENT_ID}`,
        clientSecret: `${ADMIN_CLIENT_SECRET}`,
        user: {
            username: 
        }
    }
} */

// Export the ClientBuilder
// eslint-disable-next-line import/prefer-default-export
export const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware() // Include middleware for logging
    .build();

export const getPasswordFlowOptions = (usermame: string, password: string) => {
    const options: PasswordAuthMiddlewareOptions = {
        host: 'https://auth.europe-west1.gcp.commercetools.com',
        projectKey,
        credentials: {
            clientId: 'X7xMQJdEw5S3mkVSv8ZKdGy1',
            clientSecret: 'eSSKTHOweSI0n3bIOuLjXCzjzqwjHoPs',
            user: {
                username: usermame,
                password,
            },
        },
        tokenCache: {
            get: () => getLocalStorage(),
            set: (cache: TokenStore) => {
                setLocalStorage(cache);
            },
        },
        // scopes: ['manage_project:rsschool-final-task-stage2'],
        fetch,
    };
    return options;
};

// const getPasswordFlowOptions:

export const getClientWithTokenOptions = (token: string) => {
    const options: RefreshAuthMiddlewareOptions = {
        host: 'https://auth.europe-west1.gcp.commercetools.com',
        projectKey,
        credentials: {
            clientId: 'X7xMQJdEw5S3mkVSv8ZKdGy1',
            clientSecret: 'eSSKTHOweSI0n3bIOuLjXCzjzqwjHoPs',
        },
        refreshToken: token,
        /* tokenCache: {
            get: () => getLocalStorage(),
            set: (cache: TokenStore) => {
                setLocalStorage(cache);
            },
        }, */
        // scopes: [ `manage_project:${projectKey}` ],
        fetch,
    };
    return options;
};

export const getAnonymousSessionFlow = () => {
    const options: AnonymousAuthMiddlewareOptions = {
        host: 'https://auth.europe-west1.gcp.commercetools.com',
        projectKey,
        credentials: {
            clientId: 'X7xMQJdEw5S3mkVSv8ZKdGy1',
            clientSecret: 'eSSKTHOweSI0n3bIOuLjXCzjzqwjHoPs',
            anonymousId: process.env.CTP_ANONYMOUS_ID, // a unique id
        },
        scopes: [`manage_project:${projectKey}`],
        fetch,
    };
    return options;
};
