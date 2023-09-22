import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { getClientWithToken } from './createClient';
import { getLocalStorage, projectKey } from './BuildClient';

// eslint-disable-next-line import/prefer-default-export
export const checkUserState = () => {
    const tokenStore = getLocalStorage();
    const { refreshToken } = tokenStore;
    const client = getClientWithToken(refreshToken);
    const apiRootToken = createApiBuilderFromCtpClient(client);

    const endPointToken = () => {
        return apiRootToken.withProjectKey({ projectKey }).me().get().execute();
    };
    endPointToken()
        /* .then(({ statusCode }) => {
        }) */
        .then(({ body }) => {
        })
        .catch(console.error);
};
