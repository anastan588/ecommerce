import { fireEvent, render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Header from './components/header/header';
import RegistrationPage, {
    valiDateFirstName,
    valiDateSecondName,
    valiDateEmail,
    valiDatePassword,
    valiDateBirth,
    valiDateStreetShip,
    valiDateCityShip,
    valiDatePostCodeShip,
    valiDateStreetBill,
    valiDateCityBill,
    valiDatePostCodeBill,
} from './components/registration_page/RegistrationPage';
import App from './App';
import { MyProfilePage } from './components/my_profile_page/MyProfilePage';
import AllMembers from './components/about_us_page/ourCommand/allMembers';
import UserInformation from './components/my_profile_page/UserIInformation';
import FirstNameEdit from './components/my_profile_page/userInformation/userFirstName';

// Using render and screen from test-utils.js instead of
// @testing-library/react
window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
});

describe('valiDateFirstName', () => {
    test('should display an error message and update styles when name contains special characters and number', () => {
        const currentInput: HTMLInputElement = document.createElement('input');
        const currentErrorMessage: HTMLParagraphElement = document.createElement('p');
        const currentFormInput: HTMLDivElement = document.createElement('div');
        currentInput.classList.add('input_name');
        currentErrorMessage.classList.add('error_name');
        currentFormInput.classList.add('form_firstname');
        window.document.body.append(currentErrorMessage);
        window.document.body.append(currentFormInput);
        window.document.body.append(currentInput);
        currentInput.value = 'Nastya!!!!)';
        currentInput.style.border = '1px solid #d9d9d9';
        currentFormInput.setAttribute('submit', 'true');
        valiDateFirstName();
        expect(currentErrorMessage.innerHTML).toBe("Name  shouldn't contain special characters");
        expect(currentInput.style.border).toBe('1px solid #ff4d4f');
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(currentFormInput.getAttribute('submit')).toBeUndefined;
    });
});

describe('valiDateSecondName', () => {
    test('should display an error message and update styles when name contains special characters and numbersy', () => {
        const currentInput: HTMLInputElement = document.createElement('input');
        const currentErrorMessage: HTMLParagraphElement = document.createElement('p');
        const currentFormInput: HTMLDivElement = document.createElement('div');
        currentInput.classList.add('input_surname');
        currentErrorMessage.classList.add('error_surname');
        currentFormInput.classList.add('form_secondname');
        window.document.body.append(currentErrorMessage);
        window.document.body.append(currentFormInput);
        window.document.body.append(currentInput);
        currentInput.value = 'Ivanova!!!!)';
        currentInput.style.border = '1px solid #d9d9d9';
        currentFormInput.setAttribute('submit', 'true');
        valiDateSecondName();
        expect(currentErrorMessage.innerHTML).toBe("Last name  shouldn't contain special characters");
        expect(currentInput.style.border).toBe('1px solid #ff4d4f');
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(currentFormInput.getAttribute('submit')).toBeUndefined;
    });
});

describe('valiDateEmail', () => {
    test('should display an error message and update styles when email address contains leading or trailing whitespace', () => {
        const currentInput: HTMLInputElement = document.createElement('input');
        const currentErrorMessage: HTMLParagraphElement = document.createElement('p');
        const currentFormInput: HTMLDivElement = document.createElement('div');
        currentInput.classList.add('input_mail');
        currentErrorMessage.classList.add('error_email');
        currentFormInput.classList.add('form_mail');
        window.document.body.append(currentErrorMessage);
        window.document.body.append(currentFormInput);
        window.document.body.append(currentInput);
        currentInput.value = '  test@example.com  ';
        currentInput.style.border = '1px solid #d9d9d9';
        currentFormInput.setAttribute('submit', 'true');
        valiDateEmail();
        expect(currentErrorMessage.innerHTML).toBe('Email address must not contain leading or trailing whitespace.');
        expect(currentInput.style.border).toBe('1px solid #ff4d4f');
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(currentFormInput.getAttribute('submit')).toBeUndefined;
    });
});

describe('valiDatePassword', () => {
    test('should display an error message and update styles when password does not contain at least one lowercase letter', () => {
        const currentInput: HTMLInputElement = document.createElement('input');
        const currentErrorMessage: HTMLParagraphElement = document.createElement('p');
        const currentFormInput: HTMLDivElement = document.createElement('div');
        currentInput.classList.add('input_password');
        currentErrorMessage.classList.add('error_password');
        currentFormInput.classList.add('form_password');
        window.document.body.append(currentErrorMessage);
        window.document.body.append(currentFormInput);
        window.document.body.append(currentInput);
        currentInput.value = 'PASSWORD123';
        currentInput.style.border = '1px solid #d9d9d9';
        currentFormInput.setAttribute('submit', 'true');
        valiDatePassword();
        expect(currentErrorMessage.innerHTML).toBe('Password must contain at least one lowercase letter');
        expect(currentInput.style.border).toBe('1px solid #ff4d4f');
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(currentFormInput.getAttribute('submit')).toBeUndefined;
    });
});

describe('valiDatePasswordRepeat', () => {
    test('should update UI elements correctly when validationValue does not match passwordValue', () => {
        const currentInput: HTMLInputElement = document.createElement('input');
        const passwordInput: HTMLInputElement = document.createElement('input');
        const currentErrorMessage: HTMLParagraphElement = document.createElement('p');
        const currentFormInput: HTMLDivElement = document.createElement('div');
        currentInput.classList.add('input_password_repeat');
        passwordInput.classList.add('input_password');
        currentErrorMessage.classList.add('error_password_repeat');
        currentFormInput.classList.add('form_password_repeat');
        window.document.body.append(currentErrorMessage);
        window.document.body.append(currentFormInput);
        window.document.body.append(currentInput);
        window.document.body.append(passwordInput);
        currentInput.value = 'password123';
        passwordInput.value = '';

        currentInput.style.border = '1px solid #d9d9d9';
        currentFormInput.setAttribute('submit', 'true');
        valiDatePassword();
        expect(currentErrorMessage.innerHTML).toBe('');
        expect(currentInput.style.border).toBe('1px solid #d9d9d9');
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(currentFormInput.getAttribute('submit')).toBeUndefined;
    });
});

describe('valiDateDate', () => {
    test('should display an error message and update styles when age is less than 13', () => {
        const currentInput: HTMLInputElement = document.createElement('input');
        const currentErrorMessage: HTMLParagraphElement = document.createElement('p');
        const currentFormInput: HTMLDivElement = document.createElement('div');
        currentInput.classList.add('input_birth');
        currentErrorMessage.classList.add('error_birth');
        currentFormInput.classList.add('form_birth');
        window.document.body.append(currentErrorMessage);
        window.document.body.append(currentFormInput);
        window.document.body.append(currentInput);
        const todayDate = new Date();
        const invalidDate = new Date(todayDate.getFullYear() - 10, todayDate.getMonth(), todayDate.getDate());
        const invalidDateArrayFirstDigit = invalidDate.toISOString().split('T')[0];
        currentInput.value = invalidDateArrayFirstDigit;
        currentInput.style.border = '1px solid #d9d9d9';
        currentFormInput.setAttribute('submit', 'true');
        valiDateBirth();
        expect(currentErrorMessage.innerHTML).toBe('You must be at least 13 years old');
        expect(currentInput.style.border).toBe('1px solid #ff4d4f');
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(currentFormInput.getAttribute('submit')).toBeUndefined;
    });
});

describe('valiDateStreetForShip', () => {
    test('should clear the error message, update styles, and set submit attribute when street name is not empty', () => {
        const currentInput: HTMLInputElement = document.createElement('input');
        const currentErrorMessage: HTMLParagraphElement = document.createElement('p');
        const currentFormInput: HTMLDivElement = document.createElement('div');
        const submitButton: HTMLButtonElement = document.createElement('button');
        const checkShipAddressAsBilling: HTMLDivElement = document.createElement('div');
        const checkShipAddressAsBillingChild: HTMLInputElement = document.createElement('input');
        const checkBillAddressDefault: HTMLDivElement = document.createElement('div');
        const checkBillAddressDefaultChild: HTMLInputElement = document.createElement('input');
        const checkShipAddressDefault: HTMLDivElement = document.createElement('div');
        const checkShipAddressDefaultChild: HTMLInputElement = document.createElement('input');
        currentInput.classList.add('input_street_ship');
        currentErrorMessage.classList.add('error_street_ship');
        currentFormInput.classList.add('form_street_ship');
        submitButton.classList.add('submit_button');
        checkShipAddressAsBilling.classList.add('input_checkbox_ship_bill');
        checkShipAddressAsBillingChild.classList.add('ant-checkbox-checked');
        checkBillAddressDefault.classList.add('input_checkbox_bill_def');
        checkBillAddressDefaultChild.classList.add('ant-checkbox-checked');
        checkShipAddressDefault.classList.add('input_checkbox_ship_def');
        checkShipAddressDefaultChild.classList.add('ant-checkbox-checked');
        window.document.body.append(currentErrorMessage);
        window.document.body.append(currentFormInput);

        window.document.body.append(currentInput);
        window.document.body.append(submitButton);
        checkShipAddressAsBilling.append(checkShipAddressAsBillingChild);
        checkShipAddressAsBilling.append(checkShipAddressAsBillingChild);
        window.document.body.append(checkShipAddressAsBilling);
        checkBillAddressDefault.append(checkBillAddressDefaultChild);
        window.document.body.append(checkBillAddressDefault);
        checkShipAddressDefault.append(checkShipAddressDefaultChild);
        window.document.body.append(checkShipAddressDefault);

        currentInput.value = '123 Main St';
        currentInput.style.border = '1px solid #d9d9d9';
        currentFormInput.setAttribute('submit', 'true');
        valiDateStreetShip();
        expect(currentErrorMessage.innerHTML).toBe('');
        expect(currentInput.style.border).toBe('1px solid #1fffb7');
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(currentFormInput.getAttribute('submit')).toBe('true');
    });
});

describe('valiDateCityForShip', () => {
    test('should clear the error message, update styles, and set submit attribute when city name is not empty', () => {
        const currentInput: HTMLInputElement = document.createElement('input');
        const currentErrorMessage: HTMLParagraphElement = document.createElement('p');
        const currentFormInput: HTMLDivElement = document.createElement('div');
        const submitButton: HTMLButtonElement = document.createElement('button');
        const checkShipAddressAsBilling: HTMLDivElement = document.createElement('div');
        const checkShipAddressAsBillingChild: HTMLInputElement = document.createElement('input');
        const checkBillAddressDefault: HTMLDivElement = document.createElement('div');
        const checkBillAddressDefaultChild: HTMLInputElement = document.createElement('input');
        const checkShipAddressDefault: HTMLDivElement = document.createElement('div');
        const checkShipAddressDefaultChild: HTMLInputElement = document.createElement('input');
        currentInput.classList.add('input_city_ship');
        currentErrorMessage.classList.add('error_town_ship');
        currentFormInput.classList.add('form_city_ship');
        submitButton.classList.add('submit_button');
        checkShipAddressAsBilling.classList.add('input_checkbox_ship_bill');
        checkShipAddressAsBillingChild.classList.add('ant-checkbox-checked');
        checkBillAddressDefault.classList.add('input_checkbox_bill_def');
        checkBillAddressDefaultChild.classList.add('ant-checkbox-checked');
        checkShipAddressDefault.classList.add('input_checkbox_ship_def');
        checkShipAddressDefaultChild.classList.add('ant-checkbox-checked');
        window.document.body.append(currentErrorMessage);
        window.document.body.append(currentFormInput);

        window.document.body.append(currentInput);
        window.document.body.append(submitButton);
        checkShipAddressAsBilling.append(checkShipAddressAsBillingChild);
        checkShipAddressAsBilling.append(checkShipAddressAsBillingChild);
        window.document.body.append(checkShipAddressAsBilling);
        checkBillAddressDefault.append(checkBillAddressDefaultChild);
        window.document.body.append(checkBillAddressDefault);
        checkShipAddressDefault.append(checkShipAddressDefaultChild);
        window.document.body.append(checkShipAddressDefault);

        currentInput.value = 'London';
        currentInput.style.border = '1px solid #d9d9d9';
        currentFormInput.setAttribute('submit', 'true');
        valiDateCityShip();
        expect(currentErrorMessage.innerHTML).toBe('');
        expect(currentInput.style.border).toBe('1px solid #1fffb7');
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(currentFormInput.getAttribute('submit')).toBe('true');
    });
});

describe('valiDatePostcodeForShip', () => {
    test('should update postcode elements correctly when validationValue is invalid', () => {
        const currentInput: HTMLInputElement = document.createElement('input');
        const currentErrorMessage: HTMLParagraphElement = document.createElement('p');
        const currentFormInput: HTMLDivElement = document.createElement('div');
        const countryInput: HTMLDivElement = document.createElement('div');
        const countryInpuChild0: HTMLDivElement = document.createElement('div');
        const countryInpuChild00: HTMLDivElement = document.createElement('div');
        const countryInpuChild01: HTMLDivElement = document.createElement('div');
        currentInput.classList.add('input_postcode_ship');
        currentErrorMessage.classList.add('error_postcode_ship');
        currentFormInput.classList.add('form_code_ship');
        countryInput.classList.add('input_country_ship');
        window.document.body.append(currentErrorMessage);
        window.document.body.append(currentFormInput);
        window.document.body.append(currentInput);
        countryInpuChild0.append(countryInpuChild00);
        countryInpuChild0.append(countryInpuChild01);
        countryInput.append(countryInpuChild0);
        window.document.body.append(countryInput);
        currentInput.value = 'invalid-postcode';
        currentInput.style.border = '1px solid #d9d9d9';
        currentFormInput.setAttribute('submit', 'true');
        countryInpuChild01.innerHTML = 'Country BL';
        valiDatePostCodeShip();
        expect(currentErrorMessage.innerHTML).toBe('You entered an invalid postcode!');
        expect(currentInput.style.border).toBe('1px solid #ff4d4f');
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(currentFormInput.getAttribute('submit')).toBeUndefined;
    });
});

describe('valiDateStreetForBill', () => {
    test('should clear the error message, update styles, and set submit attribute when street name is not empty', () => {
        const currentInput: HTMLInputElement = document.createElement('input');
        const currentErrorMessage: HTMLParagraphElement = document.createElement('p');
        const currentFormInput: HTMLDivElement = document.createElement('div');
        const submitButton: HTMLButtonElement = document.createElement('button');
        const checkBillAddressAsShipping: HTMLDivElement = document.createElement('div');
        const checkBillAddressAsShippingChild: HTMLInputElement = document.createElement('input');
        const checkShipAddressDefault: HTMLDivElement = document.createElement('div');
        const checkShipAddressDefaultChild: HTMLInputElement = document.createElement('input');
        const checkBillAddressDefault: HTMLDivElement = document.createElement('div');
        const checkBillAddressDefaultChild: HTMLInputElement = document.createElement('input');
        currentInput.classList.add('input_street_bill');
        currentErrorMessage.classList.add('error_street_bill');
        currentFormInput.classList.add('form_street_bil');
        submitButton.classList.add('submit_button');
        checkBillAddressAsShipping.classList.add('input_checkbox_bill_ship');
        checkBillAddressAsShippingChild.classList.add('ant-checkbox-checked');
        checkBillAddressDefault.classList.add('input_checkbox_bill_def');
        checkBillAddressDefaultChild.classList.add('ant-checkbox-checked');
        checkShipAddressDefault.classList.add('input_checkbox_ship_def');
        checkShipAddressDefaultChild.classList.add('ant-checkbox-checked');
        console.log('hello');
        window.document.body.append(currentErrorMessage);
        window.document.body.append(currentFormInput);

        window.document.body.append(currentInput);
        window.document.body.append(submitButton);
        checkBillAddressAsShipping.append(checkBillAddressAsShippingChild);
        checkBillAddressAsShipping.append(checkBillAddressAsShippingChild);
        window.document.body.append(checkBillAddressAsShipping);
        checkBillAddressDefault.append(checkBillAddressDefaultChild);
        window.document.body.append(checkBillAddressDefault);
        checkShipAddressDefault.append(checkShipAddressDefaultChild);
        window.document.body.append(checkShipAddressDefault);

        currentInput.value = '123 Main St';
        currentInput.style.border = '1px solid #d9d9d9';
        currentFormInput.setAttribute('submit', 'true');
        valiDateStreetBill();
        expect(currentErrorMessage.innerHTML).toBe('');
        expect(currentInput.style.border).toBe('1px solid #1fffb7');
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(currentFormInput.getAttribute('submit')).toBe('true');
    });
});

describe('valiDateCityForBill', () => {
    test('should clear the error message, update styles, and set submit attribute when city name is not empty', () => {
        const currentInput: HTMLInputElement = document.createElement('input');
        const currentErrorMessage: HTMLParagraphElement = document.createElement('p');
        const currentFormInput: HTMLDivElement = document.createElement('div');
        const submitButton: HTMLButtonElement = document.createElement('button');
        const checkBillAddressAsShipping: HTMLDivElement = document.createElement('div');
        const checkBillAddressAsShippingChild: HTMLInputElement = document.createElement('input');
        const checkBillAddressDefault: HTMLDivElement = document.createElement('div');
        const checkBillAddressDefaultChild: HTMLInputElement = document.createElement('input');
        const checkShipAddressDefault: HTMLDivElement = document.createElement('div');
        const checkShipAddressDefaultChild: HTMLInputElement = document.createElement('input');
        currentInput.classList.add('input_city_bill');
        currentErrorMessage.classList.add('error_town_bill');
        currentFormInput.classList.add('form_city_bill');
        submitButton.classList.add('submit_button');
        checkBillAddressAsShipping.classList.add('input_checkbox_ship_bill');
        checkBillAddressAsShippingChild.classList.add('ant-checkbox-checked');
        checkBillAddressDefault.classList.add('input_checkbox_bill_def');
        checkBillAddressDefaultChild.classList.add('ant-checkbox-checked');
        checkShipAddressDefault.classList.add('input_checkbox_ship_def');
        checkShipAddressDefaultChild.classList.add('ant-checkbox-checked');
        window.document.body.append(currentErrorMessage);
        window.document.body.append(currentFormInput);

        window.document.body.append(currentInput);
        window.document.body.append(submitButton);
        checkBillAddressAsShipping.append(checkBillAddressAsShippingChild);
        checkBillAddressAsShipping.append(checkBillAddressAsShippingChild);
        window.document.body.append(checkBillAddressAsShipping);
        checkBillAddressDefault.append(checkBillAddressDefaultChild);
        window.document.body.append(checkBillAddressDefault);
        checkShipAddressDefault.append(checkShipAddressDefaultChild);
        window.document.body.append(checkShipAddressDefault);

        currentInput.value = 'London';
        currentInput.style.border = '1px solid #d9d9d9';
        currentFormInput.setAttribute('submit', 'true');
        valiDateCityBill();
        expect(currentErrorMessage.innerHTML).toBe('');
        expect(currentInput.style.border).toBe('1px solid #1fffb7');
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(currentFormInput.getAttribute('submit')).toBe('true');
    });
});

describe('valiDatePostcodeForBill', () => {
    test('should update postcode elements correctly when validationValue is invalid', () => {
        const currentInput: HTMLInputElement = document.createElement('input');
        const currentErrorMessage: HTMLParagraphElement = document.createElement('p');
        const currentFormInput: HTMLDivElement = document.createElement('div');
        const countryInput: HTMLDivElement = document.createElement('div');
        const countryInpuChild0: HTMLDivElement = document.createElement('div');
        const countryInpuChild00: HTMLDivElement = document.createElement('div');
        const countryInpuChild01: HTMLDivElement = document.createElement('div');
        currentInput.classList.add('input_postcode_bill');
        currentErrorMessage.classList.add('error_postcode_bill');
        currentFormInput.classList.add('form_code_bill');
        countryInput.classList.add('input_country_bill');
        window.document.body.append(currentErrorMessage);
        window.document.body.append(currentFormInput);
        window.document.body.append(currentInput);
        countryInpuChild0.append(countryInpuChild00);
        countryInpuChild0.append(countryInpuChild01);
        countryInput.append(countryInpuChild0);
        window.document.body.append(countryInput);
        currentInput.value = 'invalid-postcode';
        currentInput.style.border = '1px solid #d9d9d9';
        currentFormInput.setAttribute('submit', 'true');
        countryInpuChild01.innerHTML = 'Country BL';
        valiDatePostCodeBill();
        expect(currentErrorMessage.innerHTML).toBe('You entered an invalid postcode!');
        expect(currentInput.style.border).toBe('1px solid #ff4d4f');
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(currentFormInput.getAttribute('submit')).toBeUndefined;
    });
});

describe('render Registration Page', () => {
    it('Registration Page is in the document', () => {
        render(<App />);
        const linkElement = screen.getByText('Registration');
        fireEvent.click(linkElement);
        expect(screen.getByText('Welcome to our store')).toBeInTheDocument();
    });
});

describe('render registration input fields', () => {
    it('input fields are required', () => {
        render(
            <BrowserRouter>
                <RegistrationPage />
            </BrowserRouter>
        );
        expect(screen.getByText('Welcome to our store')).toBeInTheDocument();
        expect(screen.getByText('First name')).toBeInTheDocument();
        expect(screen.getByText('Last name')).toBeInTheDocument();
        expect(screen.getByText('E-mail')).toBeInTheDocument();
        expect(screen.getByText('Password')).toBeInTheDocument();
        expect(screen.getByText('Date of birth')).toBeInTheDocument();
        expect(screen.getByText('Enter your shipping address')).toBeInTheDocument();
        expect(screen.getByText('Enter your billing address')).toBeInTheDocument();
        expect(screen.getByText('Use for billing')).toBeInTheDocument();
        expect(screen.getByText('Use for shipping')).toBeInTheDocument();
        expect(screen.getByText('Register')).toBeInTheDocument();
    });
});

describe('render header all navigation fields', () => {
    it('navigation items are required', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );
        expect(screen.getByText('Main page')).toBeInTheDocument();
        expect(screen.getByText('Catalog page')).toBeInTheDocument();
        expect(screen.getByText('About Us')).toBeInTheDocument();
        expect(screen.getByText('Basket page')).toBeInTheDocument();
        expect(screen.getByText('Registration')).toBeInTheDocument();
    });
});

describe('MyProfilePage', () => {
    test('renders PassWord component for "/change-password" path', () => {
        render(
            <MemoryRouter initialEntries={['/change-password']}>
                <MyProfilePage />
            </MemoryRouter>
        );

        expect(screen.getByText('Change Password')).toBeInTheDocument();
    });
});

describe('AllMembers', () => {
    it('renders the component without errors', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <AllMembers />
            </MemoryRouter>
        );
        expect(screen.getByText('Anastasiya Andronova')).toBeInTheDocument();
        expect(screen.getByText('Yulia Ivashchenko')).toBeInTheDocument();
        expect(screen.getByText('Aliaksandr Fedukovich')).toBeInTheDocument();
    });

    it('navigates to Nastya page when clicked', () => {
        render(
            <MemoryRouter initialEntries={['/nastya']}>
                <AllMembers />
            </MemoryRouter>
        );
        expect(screen.getByText('Anastasiya Andronova')).toBeInTheDocument();
    });

    it('navigates to Yulia page when clicked', () => {
        render(
            <MemoryRouter initialEntries={['/yulia']}>
                <AllMembers />
            </MemoryRouter>
        );
        expect(screen.getByText('Yulia Ivashchenko')).toBeInTheDocument();
    });

    it('navigates to Sasha page when clicked', () => {
        render(
            <MemoryRouter initialEntries={['/aliaksandr']}>
                <AllMembers />
            </MemoryRouter>
        );
        expect(screen.getByText('Aliaksandr Fedukovich')).toBeInTheDocument();
    });
});

// const newCustomer = {
//     body: {
//         email: '',
//         password: '',
//         firstName: '',
//         lastName: '',
//         dateOfBirth: '',
//         addresses: [[{ street: '', city: '', postalcode: '', country: '' }]],
//         defaultShippingAddress: undefined,
//         shippingAddresses: [],
//         defaultBillingAddress: undefined,
//         billingAddresses: [],
//     },
// };

// describe('UserInformation', () => {
//     const setText = jest.fn();
//     const setIsEdit = jest.fn();
//     // jest.mock('react', () => ({
//     //     ...jest.requireActual('react'),
//     //     useState: jest.fn(),
//     // }));
//     // const setState = jest.fn();
//     test('renders PassWord component for "/change-password" path', () => {
//         jest.spyOn(React, 'useState').mockImplementationOnce(() => [newCustomer, setText]);
//         jest.spyOn(React, 'useState').mockImplementationOnce(() => [false, setIsEdit]);
//         render(
//             <BrowserRouter>
//                 <UserInformation />
//             </BrowserRouter>
//         );

//         expect(screen.getByText('Change Password')).toBeInTheDocument();
//     });
// });
