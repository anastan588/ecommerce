import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { getClientWithToken } from '../login_page/createClient';

const RequestProductInBasketFromServer = async (token: string) => {
    const client = getClientWithToken(token);
    const apiRootToken = createApiBuilderFromCtpClient(client);
    const answer = await apiRootToken
        .withProjectKey({ projectKey: 'rsschool-final-task-stage2' })
        .me()
        .activeCart()
        .get()
        .execute()
        .then((body) => {
            return body.body.lineItems;
        })
        .catch((e) => {
            console.log(e);
        });
    return answer;
};

export default RequestProductInBasketFromServer;
