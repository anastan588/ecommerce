import { error } from 'console';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { Body } from 'node-fetch';
import { useNavigate } from 'react-router-dom';
import { ctpClient, ctpClientPasswordFlow } from './BuildClient';
import API_CLIENT_SETTINGS from './apiClientSettings';
import { Customer } from '../types';
import CreateCustomerMessage from '../components/message_create_customer/message_create_customer';
import registyles from '../components/registration_page/regisration_page.module.css';
// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: `${API_CLIENT_SETTINGS.projectKey}`,
});

export async function createCustomer(client: Customer) {
    const answer = await apiRoot
        .customers()
        .post({
            body: client,
        })
        .execute()
        .then((body) => {
            console.log(body.statusCode);
            console.log(body.statusCode === 201);
            const navigate = useNavigate();
            console.log(navigate);

            console.log(body.statusCode);
            navigate('/message-create');
        })
        .catch((err) => {
            if (err.name === 'BadRequest') {
                const currentErrorMessage = document.querySelector(
                    `.${registyles.error_email}`
                ) as HTMLParagraphElement;
                currentErrorMessage.innerHTML = 'There is already an existing customer with the provided email.';
                const currentInput = document.querySelector(`.${registyles.input_mail}`) as HTMLInputElement;
                currentInput.style.border = '1px solid #ff4d4f';
            }
        });
    return answer;
}

export default createCustomer;
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
