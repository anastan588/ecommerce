// eslint-disable-next-line import/no-extraneous-dependencies
import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder, PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import {
    ctpClient,
    authMiddlewareOptions,
    httpMiddlewareOptions,
    projectKey,
    getPasswordFlowOptions,
    getClientWithTokenOptions,
    getAnonymousSessionFlow,
} from './BuildClient';

// Create apiRoot from the imported ClientBuilder and include your Project key
export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: 'rsschool-final-task-stage2',
});

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
const getProject = () => {
    return apiRoot.get().execute();
};

// Retrieve Project information and output the result to the log
getProject().then(console.log).catch(console.error);

export const getPasswordFlowClient = (username: string, password: string) => {
    const ctpClientLogin = new ClientBuilder()
        .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
        .withClientCredentialsFlow(authMiddlewareOptions)
        .withHttpMiddleware(httpMiddlewareOptions)
        .withLoggerMiddleware() // Include middleware for logging
        .withPasswordFlow(getPasswordFlowOptions(username, password))
        .build();

    return ctpClientLogin;
};

export const getClientWithToken = (token: string) => {
    const ctpClientToken = new ClientBuilder()
        .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
        .withClientCredentialsFlow(authMiddlewareOptions)
        .withHttpMiddleware(httpMiddlewareOptions)
        .withLoggerMiddleware() // Include middleware for logging
        .withRefreshTokenFlow(getClientWithTokenOptions(token))
        .build();

    return ctpClientToken;
};

export const getAnonimusClient = () => {
    const strAnonimusClient = new ClientBuilder()
        .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
        .withClientCredentialsFlow(authMiddlewareOptions)
        .withAnonymousSessionFlow(getAnonymousSessionFlow())
        .withHttpMiddleware(httpMiddlewareOptions)
        .withLoggerMiddleware() // Include middleware for logging
        .build();

    return strAnonimusClient;
};

export const apiRootAnonimusClient = createApiBuilderFromCtpClient(getAnonimusClient()).withProjectKey({
    projectKey: 'rsschool-final-task-stage2',
});
