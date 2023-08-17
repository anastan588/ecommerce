import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { getClientWithToken } from './createClient';
import { getLocalStorage, projectKey } from './BuildClient';

// eslint-disable-next-line import/prefer-default-export
export const checkUserState = () => {
    const tokenStore = getLocalStorage();
    const { refreshToken } = tokenStore;
    console.log(refreshToken);
    const client = getClientWithToken(refreshToken);
    const apiRootToken = createApiBuilderFromCtpClient(client);

    const endPointToken = () => {
        return apiRootToken.withProjectKey({ projectKey }).me().get().execute();
    };
    endPointToken()
        /* .then(({ statusCode }) => {
            console.log(statusCode);
        }) */
        .then(({ body }) => {
            console.log(body);
        })
        .catch(console.error);
};
