import { error } from 'console';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { Body } from 'node-fetch';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { ctpClient, ctpClientPasswordFlow } from './BuildClient';
import API_CLIENT_SETTINGS from './apiClientSettings';
import { Customer } from '../types';
import CreateCustomerMessage from '../components/message_create_customer/message_create_customer';
import registyles from '../components/registration_page/regisration_page.module.css';
import { newCustomer } from '../components/registration_page/RegistrationPage';

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: `${API_CLIENT_SETTINGS.projectKey}`,
});

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
