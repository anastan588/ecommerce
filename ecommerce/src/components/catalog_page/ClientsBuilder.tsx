import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
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

const projectKey = 'rsschool-final-task-stage2';
const scopes = [
    'manage_my_shopping_lists:rsschool-final-task-stage2 view_categories:rsschool-final-task-stage2 manage_my_quotes:rsschool-final-task-stage2 manage_my_payments:rsschool-final-task-stage2 manage_my_business_units:rsschool-final-task-stage2 manage_my_quote_requests:rsschool-final-task-stage2 manage_my_profile:rsschool-final-task-stage2 create_anonymous_token:rsschool-final-task-stage2 view_published_products:rsschool-final-task-stage2 manage_my_orders:rsschool-final-task-stage2',
];

const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey,
    credentials: {
        clientId: 'P66qoBIuOqJWW2onJFrF48yi',
        clientSecret: 'hTLk63h_ebHQW2J7J9YeYjmPKwujsvvF',
    },
    scopes: [
        'manage_my_shopping_lists:rsschool-final-task-stage2 view_categories:rsschool-final-task-stage2 manage_my_quotes:rsschool-final-task-stage2 manage_my_payments:rsschool-final-task-stage2 manage_my_business_units:rsschool-final-task-stage2 manage_my_quote_requests:rsschool-final-task-stage2 manage_my_profile:rsschool-final-task-stage2 create_anonymous_token:rsschool-final-task-stage2 view_published_products:rsschool-final-task-stage2 manage_my_orders:rsschool-final-task-stage2',
    ],
};
const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: 'https://api.europe-west1.gcp.commercetools.com',
};

// eslint-disable-next-line import/prefer-default-export
export const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware() // Include middleware for logging
    .build();
export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: 'rsschool-final-task-stage2',
});
