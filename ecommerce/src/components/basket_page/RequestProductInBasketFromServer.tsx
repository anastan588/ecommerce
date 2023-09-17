
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { getClientWithToken } from "../login_page/createClient";

const RequestProductInBasketFromServer = async (token: string) => {
  console.log('getCartsAuth'); // это я добавил для тестирования
  const client = getClientWithToken(token);
  const apiRootToken = createApiBuilderFromCtpClient(client);
  console.log('token in getCartsAuth');
  console.log(token);
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