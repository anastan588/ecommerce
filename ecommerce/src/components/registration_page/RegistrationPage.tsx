import React, { Children, useContext } from 'react';
import { Typography, Button, Input, Form, Select, Checkbox } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Option } from 'antd/es/mentions';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import Password from 'antd/es/input/Password';
import registyles from './regisration_page.module.css';
import { Customer, Address } from '../../types';
import CreateCustomer from '../../services/clientCreator';
import Store from '../login_page/store';
import { Context } from '../..';
import { getPasswordFlowClient } from '../login_page/createClient';
import API_CLIENT_SETTINGS from '../../services/apiClientSettings';

const { Title } = Typography;

export const newCustomer: Customer = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    addresses: [],
    defaultShippingAddress: undefined,
    shippingAddresses: [],
    defaultBillingAddress: undefined,
    billingAddresses: [],
};

const addressShip: Address = {
    streetName: '',
    city: '',
    postalCode: '',
    country: '',
};
const addressBill: Address = {
    streetName: '',
    city: '',
    postalCode: '',
    country: '',
};

function validateFormToSubmit() {
    const formsCollection = document.querySelectorAll(`.${registyles.input}`) as NodeListOf<Element>;
    const submitTrueArray = [];
    for (let i = 0; i < formsCollection.length; i += 1) {
        if (formsCollection[i].hasAttribute('submit')) {
            const submit = formsCollection[i].getAttribute('submit');
            submitTrueArray.push(submit);
        }
    }
    const submitButton = document.querySelector(`.${registyles.submit_button}`) as HTMLButtonElement;
    const checkShipAddressDefault = document.querySelector(
        `.${registyles.input_checkbox_ship_def}`
    ) as HTMLInputElement;
    const checkBillAddressDefault = document.querySelector(
        `.${registyles.input_checkbox_bill_def}`
    ) as HTMLInputElement;
    const checkShipAddressAsBilling = document.querySelector(
        `.${registyles.input_checkbox_ship_bill}`
    ) as HTMLInputElement;
    const checkBillAddressAsShipping = document.querySelector(
        `.${registyles.input_checkbox_bill_ship}`
    ) as HTMLInputElement;
    const currentInputStreetShip = document.querySelector(`.${registyles.input_street_ship}`) as HTMLInputElement;
    const currentInputCitySheep = document.querySelector(`.${registyles.input_city_ship}`) as HTMLInputElement;
    const currentInputPostcodeShip = document.querySelector(`.${registyles.input_postcode_ship}`) as HTMLInputElement;
    const currentInputCountryShip = document.querySelector(`.${registyles.input_country_ship}`) as HTMLElement;

    const currentInputStreetBill = document.querySelector(`.${registyles.input_street_bill}`) as HTMLInputElement;
    const currentInputCityBill = document.querySelector(`.${registyles.input_city_bill}`) as HTMLInputElement;
    const currentInputPostcodeBill = document.querySelector(`.${registyles.input_postcode_bill}`) as HTMLInputElement;
    const currentInputCountryBill = document.querySelector(`.${registyles.input_country_bill}`) as HTMLElement;
    const currentInputName = document.querySelector(`.${registyles.input_name}`) as HTMLInputElement;
    const currentInputSecondName = document.querySelector(`.${registyles.input_surname}`) as HTMLInputElement;
    const currentInputMail = document.querySelector(`.${registyles.input_mail}`) as HTMLInputElement;
    const currentInputPassword = document.querySelector(`.${registyles.input_password}`) as HTMLInputElement;
    const currentInputRasswordRepeat = document.querySelector(
        `.${registyles.input_password_repeat}`
    ) as HTMLInputElement;
    const currentInputBithDay = document.querySelector(`.${registyles.input_birth}`) as HTMLInputElement;
    if (
        submitTrueArray.length === formsCollection.length ||
        (currentInputStreetShip.getAttribute('style') === 'border: 1px solid rgb(31, 255, 183);' &&
            currentInputCitySheep.getAttribute('style') === 'border: 1px solid rgb(31, 255, 183);' &&
            currentInputPostcodeShip.getAttribute('style') === 'border: 1px solid rgb(31, 255, 183);' &&
            currentInputCountryShip.getAttribute('style') === 'width: 200px; border: 1px solid rgb(31, 255, 183);' &&
            currentInputStreetBill.getAttribute('style') === 'border: 1px solid rgb(31, 255, 183);' &&
            currentInputCityBill.getAttribute('style') === 'border: 1px solid rgb(31, 255, 183);' &&
            currentInputPostcodeBill.getAttribute('style') === 'border: 1px solid rgb(31, 255, 183);' &&
            currentInputCountryBill.getAttribute('style') === 'width: 200px; border: 1px solid rgb(31, 255, 183);' &&
            currentInputName.getAttribute('style') === 'margin-bottom: 0px; border: 1px solid rgb(31, 255, 183);' &&
            currentInputSecondName.getAttribute('style') === 'border: 1px solid rgb(31, 255, 183);' &&
            currentInputMail.getAttribute('style') === 'border: 1px solid rgb(31, 255, 183);' &&
            currentInputPassword.getAttribute('style') === 'border: 1px solid rgb(31, 255, 183);' &&
            // currentInputRasswordRepeat.getAttribute('style') === 'border: 1px solid rgb(31, 255, 183);' &&
            currentInputBithDay.getAttribute('style') === 'border: 1px solid rgb(31, 255, 183);')
    ) {
        submitButton.disabled = false;
        if (checkShipAddressAsBilling.children[0].classList.contains('ant-checkbox-checked')) {
            if (newCustomer.addresses.length === 0) {
                newCustomer.addresses.push(addressShip);
            } else if (newCustomer.addresses.length === 1) {
                newCustomer.addresses.pop();
                newCustomer.addresses.push(addressShip);
            } else if (newCustomer.addresses.length === 2) {
                newCustomer.addresses.pop();
                newCustomer.addresses.pop();
                newCustomer.addresses.push(addressShip);
            }
            if (newCustomer.shippingAddresses.length === 0) {
                newCustomer.shippingAddresses.push(0);
            } else if (newCustomer.addresses.length === 1) {
                newCustomer.shippingAddresses.pop();
                newCustomer.shippingAddresses.push(0);
            }

            if (newCustomer.billingAddresses.length === 0) {
                newCustomer.billingAddresses.push(0);
            } else if (newCustomer.billingAddresses.length === 1) {
                newCustomer.billingAddresses.pop();
                newCustomer.billingAddresses.push(0);
            }
            setTimeout(() => {}, 500);
            if (checkBillAddressDefault.children[0].classList.contains('ant-checkbox-checked')) {
                newCustomer.defaultBillingAddress = 0;
            } else {
                newCustomer.defaultBillingAddress = undefined;
            }
            if (checkShipAddressDefault.children[0].classList.contains('ant-checkbox-checked')) {
                newCustomer.defaultShippingAddress = 0;
            } else {
                newCustomer.defaultShippingAddress = undefined;
            }
        } else if (checkBillAddressAsShipping.children[0].classList.contains('ant-checkbox-checked')) {
            if (newCustomer.addresses.length === 0) {
                newCustomer.addresses.push(addressBill);
            } else if (newCustomer.addresses.length === 1) {
                newCustomer.addresses.pop();
                newCustomer.addresses.push(addressBill);
            } else if (newCustomer.addresses.length === 2) {
                newCustomer.addresses.pop();
                newCustomer.addresses.push(addressBill);
            }
            if (newCustomer.shippingAddresses.length === 0) {
                newCustomer.shippingAddresses.push(0);
            } else if (newCustomer.shippingAddresses.length === 1) {
                newCustomer.shippingAddresses.pop();
                newCustomer.shippingAddresses.push(0);
            } else if (newCustomer.shippingAddresses.length === 2) {
                newCustomer.shippingAddresses.pop();
                newCustomer.shippingAddresses.pop();
                newCustomer.shippingAddresses.push(0);
            }

            if (newCustomer.billingAddresses.length === 0) {
                newCustomer.billingAddresses.push(0);
            } else if (newCustomer.billingAddresses.length === 1) {
                newCustomer.billingAddresses.pop();
                newCustomer.billingAddresses.push(0);
            } else if (newCustomer.billingAddresses.length === 2) {
                newCustomer.billingAddresses.pop();
                newCustomer.billingAddresses.pop();
                newCustomer.billingAddresses.push(0);
            }
            setTimeout(() => {
                if (checkShipAddressDefault.children[0].classList.contains('ant-checkbox-checked')) {
                    newCustomer.defaultShippingAddress = 0;
                } else {
                    newCustomer.defaultShippingAddress = undefined;
                }
                if (checkBillAddressDefault.children[0].classList.contains('ant-checkbox-checked')) {
                    newCustomer.defaultBillingAddress = 0;
                } else {
                    newCustomer.defaultBillingAddress = undefined;
                }
            }, 500);
        } else {
            if (newCustomer.addresses.length === 0) {
                newCustomer.addresses.push(addressShip);
                newCustomer.addresses.push(addressBill);
            } else if (newCustomer.addresses.length === 1) {
                newCustomer.addresses.pop();
                newCustomer.addresses.push(addressShip);
                newCustomer.addresses.push(addressBill);
            } else if (newCustomer.addresses.length === 2) {
                newCustomer.addresses.pop();
                newCustomer.addresses.pop();
                newCustomer.addresses.push(addressShip);
                newCustomer.addresses.push(addressBill);
            }

            if (newCustomer.shippingAddresses.length === 0) {
                newCustomer.shippingAddresses.push(0);
            } else if (newCustomer.addresses.length === 1) {
                newCustomer.shippingAddresses.pop();
                newCustomer.shippingAddresses.push(0);
            }

            if (newCustomer.billingAddresses.length === 0) {
                newCustomer.billingAddresses.push(1);
            } else if (newCustomer.billingAddresses.length === 1) {
                newCustomer.billingAddresses.pop();
                newCustomer.billingAddresses.push(1);
            }
            setTimeout(() => {
                if (
                    checkShipAddressDefault.children[0].classList.contains('ant-checkbox-checked') &&
                    checkBillAddressDefault.children[0].classList.contains('ant-checkbox-checked')
                ) {
                    newCustomer.defaultShippingAddress = 0;
                    newCustomer.defaultBillingAddress = 1;
                } else if (checkShipAddressDefault.children[0].classList.contains('ant-checkbox-checked')) {
                    newCustomer.defaultShippingAddress = 0;
                } else if (checkBillAddressDefault.children[0].classList.contains('ant-checkbox-checked')) {
                    newCustomer.defaultBillingAddress = 1;
                } else {
                    newCustomer.defaultShippingAddress = undefined;
                    newCustomer.defaultBillingAddress = undefined;
                }
            }, 500);
        }
    } else {
        submitButton.disabled = true;
    }
}

function filladdressForBill() {
    const checkShipAddressAsBilling = document.querySelector(
        `.${registyles.input_checkbox_ship_bill}`
    ) as HTMLInputElement;
    const currentInputStreetShip = document.querySelector(`.${registyles.input_street_ship}`) as HTMLInputElement;
    const currentInputCitySheep = document.querySelector(`.${registyles.input_city_ship}`) as HTMLInputElement;
    const currentInputPostcodeShip = document.querySelector(`.${registyles.input_postcode_ship}`) as HTMLInputElement;
    const currentInputCountryShip = document.querySelector(`.${registyles.input_country_ship}`) as HTMLElement;

    const currentInputStreetBill = document.querySelector(`.${registyles.input_street_bill}`) as HTMLInputElement;
    const currentInputCityBill = document.querySelector(`.${registyles.input_city_bill}`) as HTMLInputElement;
    const currentInputPostcodeBill = document.querySelector(`.${registyles.input_postcode_bill}`) as HTMLInputElement;
    const currentInputCountryBill = document.querySelector(`.${registyles.input_country_bill}`) as HTMLElement;
    if (checkShipAddressAsBilling.children[0].classList.contains('ant-checkbox-checked')) {
        if (
            currentInputStreetShip.getAttribute('style') === 'border: 1px solid rgb(31, 255, 183);' &&
            currentInputCitySheep.getAttribute('style') === 'border: 1px solid rgb(31, 255, 183);' &&
            currentInputPostcodeShip.getAttribute('style') === 'border: 1px solid rgb(31, 255, 183);' &&
            currentInputCountryShip.getAttribute('style') === 'width: 200px; border: 1px solid rgb(31, 255, 183);'
        ) {
            currentInputStreetBill.value = currentInputStreetShip.value;
            currentInputStreetBill.style.border = '1px solid #1fffb7';
            currentInputCityBill.value = currentInputCitySheep.value;
            currentInputCityBill.style.border = '1px solid #1fffb7';
            currentInputPostcodeBill.value = currentInputPostcodeShip.value;
            currentInputPostcodeBill.style.border = '1px solid #1fffb7';
            currentInputCountryBill.innerHTML = currentInputCountryShip.innerHTML;
            currentInputCountryBill.style.border = '1px solid #1fffb7';
            currentInputPostcodeBill.removeAttribute('disabled');
            currentInputPostcodeBill.classList.remove('ant-input-disabled');
        }
    }
}

function filladdressForShip() {
    const checkBillAddressAsShipping = document.querySelector(
        `.${registyles.input_checkbox_bill_ship}`
    ) as HTMLInputElement;
    const currentInputStreetShip = document.querySelector(`.${registyles.input_street_ship}`) as HTMLInputElement;
    const currentInputCitySheep = document.querySelector(`.${registyles.input_city_ship}`) as HTMLInputElement;
    const currentInputPostcodeShip = document.querySelector(`.${registyles.input_postcode_ship}`) as HTMLInputElement;
    const currentInputCountryShip = document.querySelector(`.${registyles.input_country_ship}`) as HTMLElement;

    const currentInputStreetBill = document.querySelector(`.${registyles.input_street_bill}`) as HTMLInputElement;
    const currentInputCityBill = document.querySelector(`.${registyles.input_city_bill}`) as HTMLInputElement;
    const currentInputPostcodeBill = document.querySelector(`.${registyles.input_postcode_bill}`) as HTMLInputElement;
    const currentInputCountryBill = document.querySelector(`.${registyles.input_country_bill}`) as HTMLElement;

    if (checkBillAddressAsShipping.children[0].classList.contains('ant-checkbox-checked')) {
        if (
            currentInputStreetBill.getAttribute('style') === 'border: 1px solid rgb(31, 255, 183);' &&
            currentInputCityBill.getAttribute('style') === 'border: 1px solid rgb(31, 255, 183);' &&
            currentInputPostcodeBill.getAttribute('style') === 'border: 1px solid rgb(31, 255, 183);' &&
            currentInputCountryBill.getAttribute('style') === 'width: 200px; border: 1px solid rgb(31, 255, 183);'
        ) {
            currentInputStreetShip.value = currentInputStreetBill.value;
            currentInputStreetShip.style.border = '1px solid #1fffb7';
            currentInputCitySheep.value = currentInputCityBill.value;
            currentInputCitySheep.style.border = '1px solid #1fffb7';
            currentInputPostcodeShip.value = currentInputPostcodeBill.value;
            currentInputPostcodeShip.style.border = '1px solid #1fffb7';
            currentInputCountryShip.innerHTML = currentInputCountryBill.innerHTML;
            currentInputCountryShip.style.border = '1px solid #1fffb7';
            currentInputPostcodeShip.removeAttribute('disabled');
            currentInputPostcodeShip.classList.remove('ant-input-disabled');
        }
    }
}

function checkShippingAddress() {
    const checkShipAddressAsBilling = document.querySelector(
        `.${registyles.input_checkbox_ship_bill}`
    ) as HTMLInputElement;
    const checkBillAddressAsShipping = document.querySelector(
        `.${registyles.input_checkbox_bill_ship}`
    ) as HTMLInputElement;

    if (checkBillAddressAsShipping.children[0].classList.contains('ant-checkbox-checked')) {
        if (
            !checkShipAddressAsBilling.children[0].classList.contains('ant-checkbox-checked') &&
            checkBillAddressAsShipping.children[0].classList.contains('ant-checkbox-checked')
        ) {
            checkBillAddressAsShipping.children[0].classList.remove('ant-checkbox-checked');

            setTimeout(() => {
                checkShipAddressAsBilling.children[0].classList.add('ant-checkbox-checked');
            }, 500);
        }
    }
    setTimeout(() => {
        if (checkShipAddressAsBilling.children[0].classList.contains('ant-checkbox-checked')) {
            filladdressForBill();
            validateFormToSubmit();
        }
    }, 800);
}

function checkBilligAddress() {
    const checkShipAddressAsBilling = document.querySelector(
        `.${registyles.input_checkbox_ship_bill}`
    ) as HTMLInputElement;
    const checkBillAddressAsShipping = document.querySelector(
        `.${registyles.input_checkbox_bill_ship}`
    ) as HTMLInputElement;
    if (checkShipAddressAsBilling.children[0].classList.contains('ant-checkbox-checked')) {
        if (
            !checkBillAddressAsShipping.children[0].classList.contains('ant-checkbox-checked') &&
            checkShipAddressAsBilling.children[0].classList.contains('ant-checkbox-checked')
        ) {
            checkShipAddressAsBilling.children[0].classList.remove('ant-checkbox-checked');

            setTimeout(() => {
                checkBillAddressAsShipping.children[0].classList.add('ant-checkbox-checked');
            }, 500);
        }
    }
    setTimeout(() => {
        if (checkBillAddressAsShipping.children[0].classList.contains('ant-checkbox-checked')) {
            filladdressForShip();
            validateFormToSubmit();
        }
    }, 800);
}
export function valiDateFirstName() {
    const currentInput = document.querySelector(`.${registyles.input_name}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_name}`) as HTMLParagraphElement;
    const currentFormInput = document.querySelector(`.${registyles.form_firstname}`) as HTMLDivElement;
    const validationValue = currentInput.value.trim();
    const numberTemplate = /\d/;
    const specialCharactersTemplate = /[\\^$.[\]|~`?!@#$%&\-_={}:;"'<>.,*+()]/;
    const sucsess = false;
    if (specialCharactersTemplate.test(validationValue) && numberTemplate.test(validationValue)) {
        currentErrorMessage.innerHTML = "Name  shouldn't contain special characters and numbers";
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else if (numberTemplate.test(validationValue)) {
        currentErrorMessage.innerHTML = "Name  shouldn't contain numbers";
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else if (specialCharactersTemplate.test(validationValue)) {
        currentErrorMessage.innerHTML = "Name  shouldn't contain special characters";
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else if (validationValue.length < 1) {
        currentErrorMessage.innerHTML = 'Name  should have at least one character';
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else if (validationValue.length === 0) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #d9d9d9';
        currentFormInput.removeAttribute('submit');
    } else {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
        currentFormInput.setAttribute('submit', 'true');
        newCustomer.firstName = currentInput.value;
        validateFormToSubmit();
    }
    return sucsess;
}
function valiDateSecondName() {
    const currentInput = document.querySelector(`.${registyles.input_surname}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_surname}`) as HTMLParagraphElement;
    const currentFormInput = document.querySelector(`.${registyles.form_secondname}`) as HTMLDivElement;
    const validationValue = currentInput.value.trim();
    const numberTemplate = /\d/;
    const specialCharactersTemplate = /[\\^$.[\]|~`?!@#$%&\-_={}:;"'<>.,*+()]/;
    if (specialCharactersTemplate.test(validationValue) && numberTemplate.test(validationValue)) {
        currentErrorMessage.innerHTML = "Last name  shouldn't contain special characters and numbers";
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else if (numberTemplate.test(validationValue)) {
        currentErrorMessage.innerHTML = "Last name  shouldn't contain numbers";
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else if (specialCharactersTemplate.test(validationValue)) {
        currentErrorMessage.innerHTML = "Last name  shouldn't contain special characters";
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else if (validationValue.length < 1) {
        currentErrorMessage.innerHTML = 'Last name  should have at least one character';
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else if (validationValue.length === 0) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #d9d9d9';
        currentFormInput.removeAttribute('submit');
    } else {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
        currentFormInput.setAttribute('submit', 'true');
        newCustomer.lastName = currentInput.value;
        validateFormToSubmit();
    }
}

function valiDateEmail() {
    const currentInput = document.querySelector(`.${registyles.input_mail}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_email}`) as HTMLParagraphElement;
    const currentFormInput = document.querySelector(`.${registyles.form_mail}`) as HTMLDivElement;
    const validationValue = currentInput.value;
    const emailTemplate =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    const whitespacesStart = /^\S/;
    const whitespacesEnd = /\S$/;
    let spaces = 0;
    for (let i = 0; i < validationValue.length; i += 1) {
        if (validationValue[i] === ' ') {
            spaces += 1;
        }
    }
    if (emailTemplate.test(validationValue) === false && spaces === 0) {
        currentErrorMessage.innerHTML = 'You entered an invalid email address!';
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else if (spaces > 0) {
        currentErrorMessage.innerHTML = 'Email address must not contain leading or trailing whitespace.';
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else if (validationValue.length === 0) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #d9d9d9';
        currentFormInput.removeAttribute('submit');
    } else {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
        currentFormInput.setAttribute('submit', 'true');
        newCustomer.email = currentInput.value.toLocaleLowerCase().trim();
        validateFormToSubmit();
    }
}

function valiDatePassword() {
    const currentInput = document.querySelector(`.${registyles.input_password}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_password}`) as HTMLParagraphElement;
    const currentFormInput = document.querySelector(`.${registyles.form_password}`) as HTMLDivElement;
    const validationValue = currentInput.value;
    const digitTemplate = /(?=.*[0-9])/;
    const lowerCaseTemplate = /(?=.*[a-z])/;
    const upperCaseTemplate = /(?=.*[A-Z])/;
    const passwordTemplate = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
    let spaces = 0;
    for (let i = 0; i < validationValue.length; i += 1) {
        if (validationValue[i] === ' ') {
            spaces += 1;
        }
    }
    if (spaces > 0) {
        currentErrorMessage.innerHTML = 'Password must not contain leading or trailing whitespace';
        currentInput.style.border = '1px solid #d9d9d9';
        currentFormInput.removeAttribute('submit');
    } else if (validationValue.length < 8) {
        currentErrorMessage.innerHTML = 'Password length must be at least eight characters';
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else if (validationValue.length === 0) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #d9d9d9';
        currentFormInput.removeAttribute('submit');
    } else if (validationValue.length >= 8) {
        if (passwordTemplate.test(validationValue)) {
            currentErrorMessage.innerHTML = '';
            currentInput.style.border = '1px solid #1fffb7';
            currentFormInput.setAttribute('submit', 'true');
            newCustomer.password = currentInput.value;
            validateFormToSubmit();
        } else if (digitTemplate.test(validationValue) === false) {
            currentErrorMessage.innerHTML = 'Password must contain at least one digit';
            currentInput.style.border = '1px solid #ff4d4f';
            currentFormInput.removeAttribute('submit');
        } else if (lowerCaseTemplate.test(validationValue) === false) {
            currentErrorMessage.innerHTML = 'Password must contain at least one lowercase letter';
            currentInput.style.border = '1px solid #ff4d4f';
            currentFormInput.removeAttribute('submit');
        } else if (upperCaseTemplate.test(validationValue) === false) {
            currentErrorMessage.innerHTML = 'Password must contain at least one uppercase letter';
            currentInput.style.border = '1px solid #ff4d4f';
            currentFormInput.removeAttribute('submit');
        }
    }
}

function valiDatePasswordRepeat() {
    const currentInput = document.querySelector(`.${registyles.input_password_repeat}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_password_repeat}`) as HTMLParagraphElement;
    const passwordInput = document.querySelector(`.${registyles.input_password}`) as HTMLInputElement;
    const currentFormInput = document.querySelector(`.${registyles.form_password_repeat}`) as HTMLDivElement;
    const validationValue = currentInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    let spaces = 0;
    for (let i = 0; i < validationValue.length; i += 1) {
        if (validationValue[i] === ' ') {
            spaces += 1;
        }
    }

    if (spaces > 0) {
        currentErrorMessage.innerHTML = 'Password must not contain leading or trailing whitespace';
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else if (validationValue === passwordValue && validationValue.length !== 0) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
        currentFormInput.setAttribute('submit', 'true');
        newCustomer.password = currentInput.value;
        validateFormToSubmit();
    } else if (validationValue.length === 0) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #d9d9d9';
        currentFormInput.removeAttribute('submit');
    } else {
        currentErrorMessage.innerHTML = "Password don't match with first passrwod";
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    }
}
function valiDateBirth() {
    const currentInput = document.querySelector(`.${registyles.input_birth}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_birth}`) as HTMLParagraphElement;
    const currentFormInput = document.querySelector(`.${registyles.form_birth}`) as HTMLDivElement;
    const validationValue = currentInput.value.trim();
    console.log(currentInput.value.trim());
    const todayDate = new Date();
    const dateForValidation = new Date(validationValue);
    // dateForValidation.setFullYear(Number(validationValue.slice(0, 4)));
    // dateForValidation.setMonth(Number(validationValue.slice(5, 7)) - 1);
    // dateForValidation.setDate(Number(validationValue.slice(8)));
    const todayDateMiliseconds = todayDate.getTime();
    const dateForValidationMiliseconds = dateForValidation.getTime();
    const yearForValidation = Math.floor(
        (todayDateMiliseconds - dateForValidationMiliseconds) / (1000 * 60 * 60 * 24 * 365.25)
    );
    if (yearForValidation >= 13 && yearForValidation <= 110) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
        currentFormInput.setAttribute('submit', 'true');
        const date = new Date(currentInput.value).toISOString().split('T')[0];
        newCustomer.dateOfBirth = date;
        validateFormToSubmit();
    } else if (yearForValidation < 13 && yearForValidation >= 0) {
        currentErrorMessage.innerHTML = 'You must be at least 13 years old';
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else if (yearForValidation < 0 || yearForValidation > 110) {
        currentErrorMessage.innerHTML = 'Invalid date of birth';
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #d9d9d9';
        currentFormInput.removeAttribute('submit');
    }
}

function valiDateStreetShip() {
    const currentInput = document.querySelector(`.${registyles.input_street_ship}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_street_ship}`) as HTMLParagraphElement;
    const currentFormInput = document.querySelector(`.${registyles.form_street_ship}`) as HTMLDivElement;
    const validationValue = currentInput.value.trim();
    if (validationValue.length < 1) {
        currentErrorMessage.innerHTML = 'Street  should have at least one character';
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
        currentFormInput.setAttribute('submit', 'true');
        addressShip.streetName = currentInput.value;
        validateFormToSubmit();
    }
}

function valiDateCityShip() {
    const currentInput = document.querySelector(`.${registyles.input_city_ship}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_town_ship}`) as HTMLParagraphElement;
    const currentFormInput = document.querySelector(`.${registyles.form_city_ship}`) as HTMLDivElement;
    const validationValue = currentInput.value.trim();
    const numberTemplate = /\d/;
    const specialCharactersTemplate = /[\\^$.[\]|~`?!@#$%&\-_={}:;"'<>.,*+()]/;
    if (specialCharactersTemplate.test(validationValue) && numberTemplate.test(validationValue)) {
        currentErrorMessage.innerHTML = "Name  shouldn't contain special characters and numbers";
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else if (numberTemplate.test(validationValue)) {
        currentErrorMessage.innerHTML = "City  shouldn't contain numbers";
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else if (specialCharactersTemplate.test(validationValue)) {
        currentErrorMessage.innerHTML = "City  shouldn't contain special characters";
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else if (validationValue.length < 1) {
        currentErrorMessage.innerHTML = 'City  should have at least one character';
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else if (validationValue.length === 0) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #d9d9d9';
        currentFormInput.removeAttribute('submit');
    } else {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
        currentFormInput.setAttribute('submit', 'true');
        addressShip.city = currentInput.value;
        validateFormToSubmit();
    }
}

function valiDatePostCodeShip() {
    const currentInput = document.querySelector(`.${registyles.input_postcode_ship}`) as HTMLInputElement;
    currentInput.removeAttribute('disabled');
    currentInput.classList.remove('ant-input-disabled');
    const currentErrorMessage = document.querySelector(`.${registyles.error_postcode_ship}`) as HTMLParagraphElement;
    const currentFormInput = document.querySelector(`.${registyles.form_code_ship}`) as HTMLDivElement;
    const countryInput = document.querySelector(`.${registyles.input_country_ship}`) as HTMLElement;
    const countryArray = countryInput.children[0].children[1].innerHTML.split(' ');
    const country = countryArray[1].slice(1, 3);
    let postcodeTemplateAll: RegExp = /^([0-9]{5,6}|[a-zA-Z][a-zA-Z ]{0,49})$/;
    if (country === 'BL') {
        postcodeTemplateAll = /\b2\d\d\d\d\d\b/;
    } else if (country === 'PL') {
        postcodeTemplateAll = /\b\d\d-\d\d\d\b/;
    } else if (country === 'RU') {
        postcodeTemplateAll = /\b\d\d\d\d\d\d\b/;
    } else if (country === 'KZ') {
        postcodeTemplateAll = /\b\d\d\d\d\d\d\b/;
    } else if (country === 'LT') {
        postcodeTemplateAll = /\b\d\d\d\d\d\b/;
    } else if (country === 'UA') {
        postcodeTemplateAll = /\b\d\d\d\d\d\b/;
    }
    const validationValue = currentInput.value.trim();

    if (postcodeTemplateAll.test(validationValue) === false) {
        currentErrorMessage.innerHTML = 'You entered an invalid postcode!';
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else if (validationValue.length === 0) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #d9d9d9';
        currentFormInput.removeAttribute('submit');
    } else {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
        currentFormInput.setAttribute('submit', 'true');
        addressShip.postalCode = currentInput.value;
        validateFormToSubmit();
    }
}

function valiDateCountryChangeShip(option: string) {
    setTimeout(() => {
        const currentInput = document.querySelector(`.${registyles.input_country_ship}`) as HTMLElement;
        const selectCountryInput = currentInput.children[0].innerHTML;
        const currentErrorMessage = document.querySelector(`.${registyles.error_country_ship}`) as HTMLParagraphElement;
        const input = currentInput.children[1].children[0].children[0] as HTMLInputElement;
        const currentFormInput = document.querySelector(`.${registyles.form_country_ship}`) as HTMLDivElement;
        const inputPostCodeShip = document.querySelector(`.${registyles.input_postcode_ship}`) as HTMLInputElement;
        const postErrorMessage = document.querySelector(`.${registyles.error_postcode_ship}`) as HTMLParagraphElement;
        inputPostCodeShip.removeAttribute('disabled');
        inputPostCodeShip.classList.remove('ant-input-disabled');
        if (selectCountryInput === 'Select your country' && input.value.length === 0) {
            currentErrorMessage.innerHTML = 'Your need to choose country';
            currentInput.style.border = '1px solid #ff4d4f';
            currentFormInput.removeAttribute('submit');
        } else {
            currentErrorMessage.innerHTML = '';
            currentInput.style.border = '1px solid #1fffb7';
            currentFormInput.setAttribute('submit', 'true');
            const countryArray = currentInput.children[0].innerHTML.split(' ');
            addressShip.country = countryArray[1].slice(1, 3);
            validateFormToSubmit();
            if (inputPostCodeShip.value.length > 0) {
                if (addressShip.country === 'BL') {
                    if (/\b2\d\d\d\d\d\b/.test(inputPostCodeShip.value) === false) {
                        postErrorMessage.innerHTML = 'You entered an invalid postcode!';
                        inputPostCodeShip.style.border = '1px solid #ff4d4f';
                        inputPostCodeShip.removeAttribute('submit');
                    } else {
                        inputPostCodeShip.style.border = '1px solid #1fffb7';
                        inputPostCodeShip.setAttribute('submit', 'true');
                    }
                } else if (addressShip.country === 'PL') {
                    if (/\b\d\d-\d\d\d\b/.test(inputPostCodeShip.value) === false) {
                        postErrorMessage.innerHTML = 'You entered an invalid postcode!';
                        inputPostCodeShip.style.border = '1px solid #ff4d4f';
                        inputPostCodeShip.removeAttribute('submit');
                    } else {
                        inputPostCodeShip.style.border = '1px solid #1fffb7';
                        inputPostCodeShip.setAttribute('submit', 'true');
                    }
                } else if (addressShip.country === 'RU') {
                    if (/\b\d\d\d\d\d\d\b/.test(inputPostCodeShip.value) === false) {
                        postErrorMessage.innerHTML = 'You entered an invalid postcode!';
                        inputPostCodeShip.style.border = '1px solid #ff4d4f';
                        inputPostCodeShip.removeAttribute('submit');
                    } else {
                        inputPostCodeShip.style.border = '1px solid #1fffb7';
                        inputPostCodeShip.setAttribute('submit', 'true');
                    }
                } else if (addressShip.country === 'KZ') {
                    if (/\b\d\d\d\d\d\d\b/.test(inputPostCodeShip.value) === false) {
                        postErrorMessage.innerHTML = 'You entered an invalid postcode!';
                        inputPostCodeShip.style.border = '1px solid #ff4d4f';
                        inputPostCodeShip.removeAttribute('submit');
                    } else {
                        inputPostCodeShip.style.border = '1px solid #1fffb7';
                        inputPostCodeShip.setAttribute('submit', 'true');
                    }
                } else if (addressShip.country === 'LT') {
                    if (/\b\d\d\d\d\d\b/.test(inputPostCodeShip.value) === false) {
                        postErrorMessage.innerHTML = 'You entered an invalid postcode!';
                        inputPostCodeShip.style.border = '1px solid #ff4d4f';
                        inputPostCodeShip.removeAttribute('submit');
                    } else {
                        inputPostCodeShip.style.border = '1px solid #1fffb7';
                        inputPostCodeShip.setAttribute('submit', 'true');
                    }
                } else if (addressShip.country === 'UA') {
                    if (/\b\d\d\d\d\d\b/.test(inputPostCodeShip.value) === false) {
                        postErrorMessage.innerHTML = 'You entered an invalid postcode!';
                        inputPostCodeShip.style.border = '1px solid #ff4d4f';
                        inputPostCodeShip.removeAttribute('submit');
                    } else {
                        inputPostCodeShip.style.border = '1px solid #1fffb7';
                        inputPostCodeShip.setAttribute('submit', 'true');
                    }
                }
            }
        }
    }, 500);
}

function valiDateCountryClickShip(event: React.MouseEvent<HTMLDivElement>) {
    const iventType = event.type;
    const targetElement = event.target as HTMLDivElement;
    if (
        !targetElement.classList.contains('ant-select-item-option-content') &&
        !targetElement.classList.contains('ant-select-selection-item')
    ) {
        setTimeout(() => {
            const currentInput = document.querySelector(`.${registyles.input_country_ship}`) as HTMLElement;

            const selectCountryInput = currentInput.children[0].children[1].innerHTML;
            const currentErrorMessage = document.querySelector(
                `.${registyles.error_country_ship}`
            ) as HTMLParagraphElement;
            const input = currentInput.children[0].children[0].children[0] as HTMLInputElement;
            const currentFormInput = document.querySelector(`.${registyles.form_country_ship}`) as HTMLDivElement;
            if (selectCountryInput === 'Select your country' && input.value.length === 0) {
                currentErrorMessage.innerHTML = 'Your need to choose country';
                currentInput.style.border = '1px solid #ff4d4f';
                currentFormInput.removeAttribute('submit');
            } else {
                currentErrorMessage.innerHTML = '';
                currentInput.style.border = '1px solid #1fffb7';
                currentFormInput.setAttribute('submit', 'true');
                addressShip.country = currentInput.innerHTML.slice(-1, -3);
                validateFormToSubmit();
            }
        }, 1500);
    }
}

function valiDateStreetBill() {
    const currentInput = document.querySelector(`.${registyles.input_street_bill}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_street_bill}`) as HTMLParagraphElement;
    const currentFormInput = document.querySelector(`.${registyles.form_street_bil}`) as HTMLDivElement;
    const validationValue = currentInput.value.trim();
    if (validationValue.length < 1) {
        currentErrorMessage.innerHTML = 'Street  should have at least one character';
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
        currentFormInput.setAttribute('submit', 'true');
        addressBill.streetName = currentInput.value;
        validateFormToSubmit();
    }
}

function valiDateCityBill() {
    const currentInput = document.querySelector(`.${registyles.input_city_bill}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_town_bill}`) as HTMLParagraphElement;
    const currentFormInput = document.querySelector(`.${registyles.form_city_bill}`) as HTMLDivElement;
    const validationValue = currentInput.value.trim();
    const numberTemplate = /\d/;
    const specialCharactersTemplate = /[\\^$.[\]|~`?!@#$%&\-_={}:;"'<>.,*+()]/;
    if (specialCharactersTemplate.test(validationValue) && numberTemplate.test(validationValue)) {
        currentErrorMessage.innerHTML = "Name  shouldn't contain special characters and numbers";
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else if (numberTemplate.test(validationValue)) {
        currentErrorMessage.innerHTML = "City  shouldn't contain numbers";
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else if (specialCharactersTemplate.test(validationValue)) {
        currentErrorMessage.innerHTML = "City  shouldn't contain special characters";
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else if (validationValue.length < 1) {
        currentErrorMessage.innerHTML = 'City  should have at least one character';
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else if (validationValue.length === 0) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #d9d9d9';
        currentFormInput.removeAttribute('submit');
    } else {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
        currentFormInput.setAttribute('submit', 'true');
        addressBill.city = currentInput.value;
        validateFormToSubmit();
    }
}

function valiDatePostCodeBill() {
    const currentInput = document.querySelector(`.${registyles.input_postcode_bill}`) as HTMLInputElement;
    currentInput.removeAttribute('disabled');
    currentInput.classList.remove('ant-input-disabled');
    const currentErrorMessage = document.querySelector(`.${registyles.error_postcode_bill}`) as HTMLParagraphElement;
    const currentFormInput = document.querySelector(`.${registyles.form_code_bill}`) as HTMLDivElement;
    const countryInput = document.querySelector(`.${registyles.input_country_bill}`) as HTMLElement;
    const countryArray = countryInput.children[0].children[1].innerHTML.split(' ');
    const country = countryArray[1].slice(1, 3);

    let postcodeTemplateAll: RegExp = /^([0-9]{5,6}|[a-zA-Z][a-zA-Z ]{0,49})$/;
    if (country === 'BL') {
        postcodeTemplateAll = /\b2\d\d\d\d\d\b/;
    } else if (country === 'PL') {
        postcodeTemplateAll = /\b\d\d-\d\d\d\b/;
    } else if (country === 'RU') {
        postcodeTemplateAll = /\b\d\d\d\d\d\d\b/;
    } else if (country === 'KZ') {
        postcodeTemplateAll = /\b\d\d\d\d\d\d\b/;
    } else if (country === 'LT') {
        postcodeTemplateAll = /\b\d\d\d\d\d\b/;
    } else if (country === 'UA') {
        postcodeTemplateAll = /\b\d\d\d\d\d\b/;
    }
    const validationValue = currentInput.value.trim();
    // const postcodeTemplateAll = /^([0-9]{5,6}|[a-zA-Z][a-zA-Z ]{0,49})$/;
    // const postcodeTemplateCanadian = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

    if (postcodeTemplateAll.test(validationValue) === false) {
        currentErrorMessage.innerHTML = 'You entered an invalid postcode!';
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else if (validationValue.length === 0) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #d9d9d9';
        currentFormInput.removeAttribute('submit');
    } else {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
        currentFormInput.setAttribute('submit', 'true');
        addressBill.postalCode = currentInput.value;
        validateFormToSubmit();
    }
}

function valiDateCountryChangeBill(option: string) {
    setTimeout(() => {
        const currentInput = document.querySelector(`.${registyles.input_country_bill}`) as HTMLElement;
        const selectCountryInput = currentInput.children[0].innerHTML;
        const currentErrorMessage = document.querySelector(`.${registyles.error_country_bill}`) as HTMLParagraphElement;
        const input = currentInput.children[1].children[0].children[0] as HTMLInputElement;
        const currentFormInput = document.querySelector(`.${registyles.form_country_bill}`) as HTMLDivElement;
        const inputPostCodeShip = document.querySelector(`.${registyles.input_postcode_bill}`) as HTMLInputElement;
        const postErrorMessage = document.querySelector(`.${registyles.error_postcode_bill}`) as HTMLParagraphElement;
        inputPostCodeShip.removeAttribute('disabled');
        inputPostCodeShip.classList.remove('ant-input-disabled');

        if (selectCountryInput === 'Select your country' && input.value.length === 0) {
            currentErrorMessage.innerHTML = 'Your need to choose country';
            currentInput.style.border = '1px solid #ff4d4f';
            currentFormInput.removeAttribute('submit');
        } else {
            currentErrorMessage.innerHTML = '';
            currentInput.style.border = '1px solid #1fffb7';
            currentFormInput.setAttribute('submit', 'true');
            const countryArray = currentInput.children[0].innerHTML.split(' ');
            addressBill.country = countryArray[1].slice(1, 3);
            validateFormToSubmit();
            if (inputPostCodeShip.value.length > 0) {
                if (addressShip.country === 'BL') {
                    if (/\b2\d\d\d\d\d\b/.test(inputPostCodeShip.value) === false) {
                        postErrorMessage.innerHTML = 'You entered an invalid postcode!';
                        inputPostCodeShip.style.border = '1px solid #ff4d4f';
                        inputPostCodeShip.removeAttribute('submit');
                    } else {
                        inputPostCodeShip.style.border = '1px solid #1fffb7';
                        inputPostCodeShip.setAttribute('submit', 'true');
                    }
                } else if (addressShip.country === 'PL') {
                    if (/\b\d\d-\d\d\d\b/.test(inputPostCodeShip.value) === false) {
                        postErrorMessage.innerHTML = 'You entered an invalid postcode!';
                        inputPostCodeShip.style.border = '1px solid #ff4d4f';
                        inputPostCodeShip.removeAttribute('submit');
                    } else {
                        inputPostCodeShip.style.border = '1px solid #1fffb7';
                        inputPostCodeShip.setAttribute('submit', 'true');
                    }
                } else if (addressShip.country === 'RU') {
                    if (/\b\d\d\d\d\d\d\b/.test(inputPostCodeShip.value) === false) {
                        postErrorMessage.innerHTML = 'You entered an invalid postcode!';
                        inputPostCodeShip.style.border = '1px solid #ff4d4f';
                        inputPostCodeShip.removeAttribute('submit');
                    } else {
                        inputPostCodeShip.style.border = '1px solid #1fffb7';
                        inputPostCodeShip.setAttribute('submit', 'true');
                    }
                } else if (addressShip.country === 'KZ') {
                    if (/\b\d\d\d\d\d\d\b/.test(inputPostCodeShip.value) === false) {
                        postErrorMessage.innerHTML = 'You entered an invalid postcode!';
                        inputPostCodeShip.style.border = '1px solid #ff4d4f';
                        inputPostCodeShip.removeAttribute('submit');
                    } else {
                        inputPostCodeShip.style.border = '1px solid #1fffb7';
                        inputPostCodeShip.setAttribute('submit', 'true');
                    }
                } else if (addressShip.country === 'LT') {
                    if (/\b\d\d\d\d\d\b/.test(inputPostCodeShip.value) === false) {
                        postErrorMessage.innerHTML = 'You entered an invalid postcode!';
                        inputPostCodeShip.style.border = '1px solid #ff4d4f';
                        inputPostCodeShip.removeAttribute('submit');
                    } else {
                        inputPostCodeShip.style.border = '1px solid #1fffb7';
                        inputPostCodeShip.setAttribute('submit', 'true');
                    }
                } else if (addressShip.country === 'UA') {
                    if (/\b\d\d\d\d\d\b/.test(inputPostCodeShip.value) === false) {
                        postErrorMessage.innerHTML = 'You entered an invalid postcode!';
                        inputPostCodeShip.style.border = '1px solid #ff4d4f';
                        inputPostCodeShip.removeAttribute('submit');
                    } else {
                        inputPostCodeShip.style.border = '1px solid #1fffb7';
                        inputPostCodeShip.setAttribute('submit', 'true');
                    }
                }
            }
        }
    }, 500);
}

function valiDateCountryClickBill(event: React.MouseEvent<HTMLDivElement>) {
    const iventType = event.type;
    const targetElement = event.target as HTMLDivElement;
    if (
        !targetElement.classList.contains('ant-select-item-option-content') &&
        !targetElement.classList.contains('ant-select-selection-item')
    ) {
        setTimeout(() => {
            const currentInput = document.querySelector(`.${registyles.input_country_bill}`) as HTMLElement;
            const selectCountryInput = currentInput.children[0].children[1].innerHTML;
            const currentErrorMessage = document.querySelector(
                `.${registyles.error_country_bill}`
            ) as HTMLParagraphElement;
            const input = currentInput.children[0].children[0].children[0] as HTMLInputElement;
            const currentFormInput = document.querySelector(`.${registyles.form_country_bill}`) as HTMLDivElement;
            if (selectCountryInput === 'Select your country' && input.value.length === 0) {
                currentErrorMessage.innerHTML = 'Your need to choose country';
                currentInput.style.border = '1px solid #ff4d4f';
                currentFormInput.removeAttribute('submit');
            } else {
                currentErrorMessage.innerHTML = '';
                currentInput.style.border = '1px solid #1fffb7';
                currentFormInput.setAttribute('submit', 'true');
                addressBill.country = currentInput.innerHTML.slice(-1, -3);
                validateFormToSubmit();
            }
        }, 1500);
    }
}

const projectKey = `${API_CLIENT_SETTINGS.projectKey}`;

const RegistrationPage: React.FC = () => {
    const navigate = useNavigate();
    const { store } = useContext(Context);
    function clickCustomer() {
        const registration = store.registration(newCustomer);
        registration.then(() => {
            navigate('/');
        });
    }

    return (
        <div className={registyles.registration__page}>
            <div className={registyles.registration__container}>
                <Title
                    className={registyles.title_registration_main}
                    level={2}
                    style={{ marginBottom: 0, color: '#2e2ed2' }}
                >
                    Welcome to our store
                </Title>
                <div className={registyles.title_registration_login}>
                    <Title
                        className={registyles.registration_login_title}
                        level={3}
                        style={{ marginBottom: 0, color: '#2e2ed2' }}
                    >
                        Already have an account?
                    </Title>
                    <Button type="primary" className={registyles.registration_login_link}>
                        <Link to="/login">Log In</Link>
                    </Button>
                </div>
                <Form
                    className="input_block"
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 18 }}
                    style={{ maxWidth: 800 }}
                >
                    <div className={registyles.input_block}>
                        <p className={`${registyles.error_message} ${registyles.error_name}`}></p>
                        <Form.Item
                            className={`${registyles.input} ${registyles.form_firstname}`}
                            name="firstname"
                            label="First name"
                            rules={[{ required: true }]}
                        >
                            <Input
                                onInput={valiDateFirstName}
                                className={registyles.input_name}
                                type="text"
                                placeholder="Enter your first name"
                                style={{ marginBottom: 0 }}
                            />
                        </Form.Item>
                    </div>
                    <div className={registyles.input_block}>
                        <p className={`${registyles.error_message} ${registyles.error_surname}`}></p>
                        <Form.Item
                            className={`${registyles.input} ${registyles.form_secondname}`}
                            name="surname"
                            label="Last name"
                            rules={[{ required: true }]}
                        >
                            <Input
                                onInput={valiDateSecondName}
                                className={registyles.input_surname}
                                type="text"
                                placeholder="Enter your last name"
                            />
                        </Form.Item>
                    </div>
                    <div className={registyles.input_block}>
                        <p className={`${registyles.error_message} ${registyles.error_email}`}></p>
                        <Form.Item
                            className={`${registyles.input} ${registyles.form_mail}`}
                            name="email"
                            label="E-mail"
                            rules={[{ required: true }]}
                        >
                            <Input
                                onInput={valiDateEmail}
                                className={registyles.input_mail}
                                placeholder="Enter your e-mail"
                            />
                        </Form.Item>
                    </div>
                    <div className={registyles.input_block}>
                        <p className={`${registyles.error_message} ${registyles.error_password}`}></p>
                        <Form.Item
                            className={`${registyles.input} ${registyles.form_password}`}
                            name="password"
                            label="Password"
                            rules={[{ required: true }]}
                        >
                            <Input
                                onInput={valiDatePassword}
                                type="password"
                                className={registyles.input_password}
                                placeholder="Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number"
                            />
                        </Form.Item>
                    </div>
                    {/* <div className={registyles.input_block}>
                        <p className={`${registyles.error_message} ${registyles.error_password_repeat}`}></p>
                        <Form.Item
                            className={`${registyles.input} ${registyles.form_password_repeat}`}
                            name="repeat"
                            label="Repeat Password"
                            rules={[{ required: true }]}
                        >
                            <Input
                                onInput={valiDatePasswordRepeat}
                                type="password"
                                className={registyles.input_password_repeat}
                                placeholder="Repeate your password"
                            />
                        </Form.Item>
                    </div> */}
                    <div className={registyles.input_block}>
                        <p className={`${registyles.error_message} ${registyles.error_birth}`}></p>
                        <Form.Item
                            className={`${registyles.input} ${registyles.form_birth}`}
                            name="birth"
                            label="Date of birth"
                            rules={[{ required: true }]}
                        >
                            <Input onInput={valiDateBirth} type="date" className={registyles.input_birth} />
                        </Form.Item>
                    </div>
                </Form>
                <div className={registyles.address_container}>
                    <div className={registyles.address_block}>
                        <div className={registyles.input_block}>
                            <p className={`${registyles.error_message} ${registyles.error_address_ship}`}></p>
                            <Form.Item
                                className={`${registyles.form_address_ship}`}
                                label="Enter your shipping address"
                                rules={[{ required: true }]}
                            ></Form.Item>
                        </div>
                        <div className={registyles.input_block}>
                            <p className={`${registyles.error_message} ${registyles.error_street_ship}`}></p>
                            <Form.Item
                                className={`${registyles.input} ${registyles.form_street_ship}`}
                                name="street"
                                label="Street"
                                rules={[{ required: true }]}
                            >
                                <Input
                                    onInput={valiDateStreetShip}
                                    className={registyles.input_street_ship}
                                    type="text"
                                    placeholder="Enter yout street"
                                />
                            </Form.Item>
                        </div>
                        <div className={registyles.input_block}>
                            <p className={`${registyles.error_message} ${registyles.error_town_ship}`}></p>
                            <Form.Item
                                className={`${registyles.input} ${registyles.form_city_ship}`}
                                name="city"
                                label="City"
                                rules={[{ required: true }]}
                            >
                                <Input
                                    onInput={valiDateCityShip}
                                    className={registyles.input_city_ship}
                                    type="text"
                                    placeholder="Enter your city"
                                />
                            </Form.Item>
                        </div>
                        <div className={registyles.input_block}>
                            <p className={`${registyles.error_message} ${registyles.error_postcode_ship}`}></p>
                            <Form.Item
                                className={`${registyles.input} ${registyles.form_code_ship}`}
                                name="postcode"
                                label="Postal Code"
                                rules={[{ required: true }]}
                            >
                                <Input
                                    onInput={valiDatePostCodeShip}
                                    className={registyles.input_postcode_ship}
                                    type="text"
                                    placeholder="Enter your postal code"
                                    disabled
                                />
                            </Form.Item>
                        </div>
                        <div className={registyles.input_block}>
                            <p className={`${registyles.error_message} ${registyles.error_country_ship}`}></p>
                            <Form.Item
                                className={`${registyles.input} ${registyles.form_country_ship}`}
                                name="country"
                                label="Country"
                                rules={[{ required: true }]}
                            >
                                <Select
                                    onChange={(option: string) => valiDateCountryChangeShip(option)}
                                    // onClick={(event) => valiDateCountryClickShip(event)}
                                    className={registyles.input_country_ship}
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Select your country"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '')
                                            .toLowerCase()
                                            .localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={[
                                        {
                                            value: '0',
                                            label: 'Belarus (BL)',
                                        },
                                        {
                                            value: '1',
                                            label: 'Kazakhstan (KZ)',
                                        },
                                        {
                                            value: '2',
                                            label: 'Lithuania (LT)',
                                        },
                                        {
                                            value: '3',
                                            label: 'Poland (PL)',
                                        },
                                        {
                                            value: '4',
                                            label: 'Russia (RU)',
                                        },
                                        {
                                            value: '5',
                                            label: 'Ukraine (UA)',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </div>
                        <div className={registyles.checkbox_block}>
                            <Checkbox
                                className={registyles.input_checkbox_ship_bill}
                                onChange={() => {
                                    checkShippingAddress();
                                }}
                            >
                                Use for billing
                            </Checkbox>
                            <Checkbox
                                className={registyles.input_checkbox_ship_def}
                                onChange={() => {
                                    // newCustomer.defaultShippingAddress = 0;
                                    validateFormToSubmit();
                                }}
                            >
                                Use as default
                            </Checkbox>
                        </div>
                    </div>
                    <div className={registyles.address_block}>
                        <div className={registyles.input_block}>
                            <p className={`${registyles.error_message} ${registyles.error_address_bill}`}></p>
                            <Form.Item
                                className={`${registyles.form_address_bill}`}
                                label="Enter your billing address"
                                rules={[{ required: true }]}
                            ></Form.Item>
                        </div>
                        <div className={registyles.input_block}>
                            <p className={`${registyles.error_message} ${registyles.error_street_bill}`}></p>
                            <Form.Item
                                className={`${registyles.input} ${registyles.form_street_bil}`}
                                name="street"
                                label="Street"
                                rules={[{ required: true }]}
                            >
                                <Input
                                    onInput={valiDateStreetBill}
                                    className={registyles.input_street_bill}
                                    type="text"
                                    placeholder="Enter yout street"
                                />
                            </Form.Item>
                        </div>
                        <div className={registyles.input_block}>
                            <p className={`${registyles.error_message} ${registyles.error_town_bill}`}></p>
                            <Form.Item
                                className={`${registyles.input} ${registyles.form_city_bill}`}
                                name="city"
                                label="City"
                                rules={[{ required: true }]}
                            >
                                <Input
                                    onInput={valiDateCityBill}
                                    className={registyles.input_city_bill}
                                    type="text"
                                    placeholder="Enter your city"
                                />
                            </Form.Item>
                        </div>
                        <div className={registyles.input_block}>
                            <p className={`${registyles.error_message} ${registyles.error_postcode_bill}`}></p>
                            <Form.Item
                                className={`${registyles.input} ${registyles.form_code_bill}`}
                                name="postcode"
                                label="Postal Code"
                                rules={[{ required: true }]}
                            >
                                <Input
                                    onInput={valiDatePostCodeBill}
                                    className={registyles.input_postcode_bill}
                                    type="text"
                                    placeholder="Enter your postal code"
                                    disabled
                                />
                            </Form.Item>
                        </div>
                        <div className={registyles.input_block}>
                            <p className={`${registyles.error_message} ${registyles.error_country_bill}`}></p>
                            <Form.Item
                                className={`${registyles.input} ${registyles.form_country_bill}`}
                                name="country"
                                label="Country"
                                rules={[{ required: true }]}
                            >
                                <Select
                                    onChange={(option: string) => valiDateCountryChangeBill(option)}
                                    // onClick={(event) => valiDateCountryClickBill(event)}
                                    className={registyles.input_country_bill}
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Select your country"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '')
                                            .toLowerCase()
                                            .localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={[
                                        {
                                            value: '0',
                                            label: 'Belarus (BL)',
                                        },
                                        {
                                            value: '1',
                                            label: 'Kazakhstan (KZ)',
                                        },
                                        {
                                            value: '2',
                                            label: 'Lithuania (LT)',
                                        },
                                        {
                                            value: '3',
                                            label: 'Poland (PL)',
                                        },
                                        {
                                            value: '4',
                                            label: 'Russia (RU)',
                                        },
                                        {
                                            value: '5',
                                            label: 'Ukraine (UA)',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </div>
                        <div className={registyles.checkbox_block}>
                            <Checkbox
                                type="checkbox"
                                className={registyles.input_checkbox_bill_ship}
                                onChange={() => {
                                    checkBilligAddress();
                                }}
                            >
                                Use for shipping
                            </Checkbox>
                            <Checkbox
                                className={registyles.input_checkbox_bill_def}
                                onChange={() => {
                                    // newCustomer.defaultBillingAddress = 1;
                                    validateFormToSubmit();
                                }}
                            >
                                Use as default
                            </Checkbox>
                        </div>
                    </div>
                </div>
                <Form
                    className="input_block"
                    name="register"
                    onClick={() => {
                        clickCustomer();
                    }}
                >
                    <Form.Item
                        className={registyles.submit}
                        wrapperCol={{ offset: 11, span: 16 }}
                        style={{ margin: 0 }}
                    >
                        <Button className={registyles.submit_button} type="primary" htmlType="submit" disabled>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default RegistrationPage;
