import { createClient } from '@commercetools/sdk-client';
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth';
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http';

const projectKey = 'rsschool-final-task-stage2';

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey,
    credentials: {
        clientId: 'X7xMQJdEw5S3mkVSv8ZKdGy1',
        clientSecret: 'eSSKTHOweSI0n3bIOuLjXCzjzqwjHoPs',
    },
    scopes: [
        'manage_project:rsschool-final-task-stage2 manage_api_clients:rsschool-final-task-stage2 view_audit_log:rsschool-final-task-stage2',
    ],
});
const httpMiddleware = createHttpMiddleware({
    host: 'https://api.europe-west1.gcp.commercetools.com',
});
const client = createClient({
    middlewares: [authMiddleware, httpMiddleware],
});