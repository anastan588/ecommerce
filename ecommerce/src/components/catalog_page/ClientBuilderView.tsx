import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: 'rsschool-final-task-stage2',
    credentials: {
        clientId: 'emL6tGuMHx98lxZwYRFbVMhm',
        clientSecret: 'vfLqYLKgIJkKCKlN8wQ3-swT1mBJvjKX',
    },
    scopes: ['view_products:rsschool-final-task-stage2 view_product_selections:rsschool-final-task-stage2'],
    fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: 'https://api.europe-west1.gcp.commercetools.com',
    fetch,
};

// Export the ClientBuilder
// eslint-disable-next-line import/prefer-default-export
export const ctpClient = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: 'rsschool-final-task-stage2',
});
