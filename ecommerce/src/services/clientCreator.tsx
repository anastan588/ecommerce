import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './BuildClient';
import API_CLIENT_SETTINGS from './apiClientSettings';
import { Customer } from '../types';
import registyles from '../components/registration_page/regisration_page.module.css';
import { getPasswordFlowClient } from '../components/login_page/createClient';
// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: `${API_CLIENT_SETTINGS.projectKey}`,
});

const projectKey = `${API_CLIENT_SETTINGS.projectKey}`;

async function CreateCustomer(client: Customer) {
    const answer = await apiRoot
        .customers()
        .post({
            body: client,
        })
        .execute()
        .then((body) => {
            console.log(body.statusCode);
            console.log(body.statusCode === 201);
            alert('Customer has been created');
            const customer = getPasswordFlowClient(client.email, client.password);
            const apiRootClient = createApiBuilderFromCtpClient(customer);

            const endPointPassword = () => {
                return apiRootClient.withProjectKey({ projectKey }).me().get().execute();
            };
            // eslint-disable-next-line @typescript-eslint/no-shadow
            endPointPassword()
                // eslint-disable-next-line @typescript-eslint/no-shadow
                .then(({ body }) => {
                    console.log(body);
                })
                .catch(({ err }) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            if (err.name === 'BadRequest') {
                const currentErrorMessage = document.querySelector(
                    `.${registyles.error_email}`
                ) as HTMLParagraphElement;
                alert('There is already an existing customer with the provided email.');
                currentErrorMessage.innerHTML = 'There is already an existing customer with the provided email.';
                const currentInput = document.querySelector(`.${registyles.input_mail}`) as HTMLInputElement;
                currentInput.style.border = '1px solid #ff4d4f';
            }
        });
    return answer;
}

// function clickCustomer() {
//     const navigate = useNavigate();
//     const { store } = useContext(Context);
//     const login = store.registratin(newCustomer.email, newCustomer.password);
// }

export default CreateCustomer;
// export async function createCustomerPasswordflow(client: Customer) {
//     const answer = await apiRootPasswordFlow
//         .customers()
//         .post({
//             body: client,
//         })
//         .execute()
//         .then((body) => body)
//         .catch((err) => {
//             throw err;
//         });
//     console.log(answer);
//     return answer;
// }
