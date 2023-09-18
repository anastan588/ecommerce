import { apiRootAnonimusClientCastomer } from '../catalog_page/ClientsBuilderCastomer';

const RequestProductInBasketForAnonimClients = async () => {
    return await apiRootAnonimusClientCastomer
        .me()
        .carts()
        .get()
        .execute()
        .then((body) => {
            console.log(body.body.results[0]);
            const { id } = body.body.results[0];
            const { version } = body.body.results[0];
            return { id, version };
        })
        .catch((e) => console.log(e));
};

export default RequestProductInBasketForAnonimClients;
