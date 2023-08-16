import React, { Children } from 'react';
import { Typography, Button, Input, Form, Select, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { Option } from 'antd/es/mentions';
import registyles from './regisration_page.module.css';
import { Customer } from '../../types';

const { Title } = Typography;

const newCustomer: Customer = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    addresses: [],
    defaultShippingAddress: 0,
    shippingAddressIds: [],
    defaultBillingAddressId: 0,
    billingAddressIds: [],
};

function validateFormToSubmit() {
    const formsCollection = document.querySelectorAll(`.${registyles.input}`) as NodeListOf<Element>;
    console.log(formsCollection);
    const submitTrueArray = [];
    for (let i = 0; i < formsCollection.length; i += 1) {
        if (formsCollection[i].hasAttribute('submit')) {
            const submit = formsCollection[i].getAttribute('submit');
            submitTrueArray.push(submit);
        }
    }
    console.log(submitTrueArray);
    const submitButton = document.querySelector(`.${registyles.submit_button}`) as HTMLButtonElement;
    console.log(submitButton);
    if (submitTrueArray.length === formsCollection.length) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
        console.log(newCustomer);
    }
}

function valiDateFirstName() {
    const currentInput = document.querySelector(`.${registyles.input_name}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_name}`) as HTMLParagraphElement;
    const currentFormInput = document.querySelector(`.${registyles.form_firstname}`) as HTMLDivElement;
    console.log(currentInput);
    console.log(currentErrorMessage);
    console.log(currentFormInput);
    const validationValue = currentInput.value.trim();
    const numberTemplate = /\d/;
    const specialCharactersTemplate = /[\\^$.[\]|?*+()]/;
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
        validateFormToSubmit();
    }
}
function valiDateSecondName() {
    const currentInput = document.querySelector(`.${registyles.input_surname}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_surname}`) as HTMLParagraphElement;
    const currentFormInput = document.querySelector(`.${registyles.form_secondname}`) as HTMLDivElement;
    console.log(currentInput);
    console.log(currentErrorMessage);
    console.log(currentFormInput);
    const validationValue = currentInput.value.trim();
    const numberTemplate = /\d/;
    const specialCharactersTemplate = /[\\^$.[\]|?*+()]/;
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
        validateFormToSubmit();
    }
}

function valiDateEmail() {
    const currentInput = document.querySelector(`.${registyles.input_mail}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_email}`) as HTMLParagraphElement;
    const currentFormInput = document.querySelector(`.${registyles.form_mail}`) as HTMLDivElement;
    console.log(currentInput);
    console.log(currentErrorMessage);
    const validationValue = currentInput.value.toLocaleLowerCase().trim();
    const emailTemplate =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if (emailTemplate.test(validationValue) === false) {
        currentErrorMessage.innerHTML = 'You entered an invalid email address!';
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
        validateFormToSubmit();
    }
}

function valiDatePassword() {
    const currentInput = document.querySelector(`.${registyles.input_password}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_password}`) as HTMLParagraphElement;
    const currentFormInput = document.querySelector(`.${registyles.form_password}`) as HTMLDivElement;
    const validationValue = currentInput.value.trim();
    console.log(validationValue);
    const digitTemplate = /(?=.*[0-9])/;
    const lowerCaseTemplate = /(?=.*[a-z])/;
    const upperCaseTemplate = /(?=.*[A-Z])/;
    const passwordTemplate = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
    if (validationValue.length < 8) {
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
    console.log(passwordValue);
    console.log(validationValue);
    if (validationValue === passwordValue && validationValue.length !== 0) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
        currentFormInput.setAttribute('submit', 'true');
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
    console.log(validationValue);
    const todayDate = new Date();
    console.log(todayDate);
    const dateForValidation = new Date(validationValue);
    // dateForValidation.setFullYear(Number(validationValue.slice(0, 4)));
    // dateForValidation.setMonth(Number(validationValue.slice(5, 7)) - 1);
    // dateForValidation.setDate(Number(validationValue.slice(8)));
    console.log(dateForValidation);
    const todayDateMiliseconds = todayDate.getTime();
    const dateForValidationMiliseconds = dateForValidation.getTime();
    console.log(todayDateMiliseconds);
    console.log(dateForValidationMiliseconds);
    const yearForValidation = Math.floor(
        (todayDateMiliseconds - dateForValidationMiliseconds) / (1000 * 60 * 60 * 24 * 30 * 12)
    );
    console.log(yearForValidation);
    if (yearForValidation >= 13 && yearForValidation <= 110) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
        currentFormInput.setAttribute('submit', 'true');
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
    console.log(currentInput);
    console.log(currentErrorMessage);
    const validationValue = currentInput.value.trim();
    if (validationValue.length < 1) {
        currentErrorMessage.innerHTML = 'Street  should have at least one character';
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
        currentFormInput.setAttribute('submit', 'true');
        validateFormToSubmit();
    }
}

function valiDateCityShip() {
    const currentInput = document.querySelector(`.${registyles.input_city_ship}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_town_ship}`) as HTMLParagraphElement;
    const currentFormInput = document.querySelector(`.${registyles.form_city_ship}`) as HTMLDivElement;
    console.log(currentInput);
    console.log(currentErrorMessage);
    const validationValue = currentInput.value.trim();
    const numberTemplate = /\d/;
    const specialCharactersTemplate = /[\\^$.[\]|?*+()]/;
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
        validateFormToSubmit();
    }
}

function valiDatePostCodeShip() {
    const currentInput = document.querySelector(`.${registyles.input_postcode_ship}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_postcode_ship}`) as HTMLParagraphElement;
    const currentFormInput = document.querySelector(`.${registyles.form_code_ship}`) as HTMLDivElement;
    console.log(currentInput);
    console.log(currentErrorMessage);
    const validationValue = currentInput.value.trim();
    const postcodeTemplateAll = /^([0-9]{5,6}|[a-zA-Z][a-zA-Z ]{0,49})$/;
    const postcodeTemplateCanadian = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

    if (
        postcodeTemplateAll.test(validationValue) === false &&
        postcodeTemplateCanadian.test(validationValue) === false
    ) {
        currentErrorMessage.innerHTML = 'You entered an invalid postcode!';
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else if (
        postcodeTemplateAll.test(validationValue) === false &&
        postcodeTemplateCanadian.test(validationValue) === true
    ) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
        currentFormInput.setAttribute('submit', 'true');
        validateFormToSubmit();
    } else if (
        postcodeTemplateAll.test(validationValue) === true &&
        postcodeTemplateCanadian.test(validationValue) === false
    ) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
        currentFormInput.setAttribute('submit', 'true');
        validateFormToSubmit();
    } else if (validationValue.length === 0) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #d9d9d9';
        currentFormInput.removeAttribute('submit');
    } else {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
        currentFormInput.setAttribute('submit', 'true');
        validateFormToSubmit();
    }
}

function valiDateCountryChangeShip(option: string) {
    console.log(option);
    setTimeout(() => {
        const currentInput = document.querySelector(`.${registyles.input_country_ship}`) as HTMLElement;
        const selectCountryInput = currentInput.children[0].innerHTML;
        const currentErrorMessage = document.querySelector(`.${registyles.error_country_ship}`) as HTMLParagraphElement;
        const input = currentInput.children[1].children[0].children[0] as HTMLInputElement;
        const currentFormInput = document.querySelector(`.${registyles.form_country_ship}`) as HTMLDivElement;
        console.log(currentInput);
        console.log(selectCountryInput);
        console.log(currentErrorMessage);
        console.log(input);
        if (selectCountryInput === 'Select your country' && input.value.length === 0) {
            currentErrorMessage.innerHTML = 'Your need to choose country';
            currentInput.style.border = '1px solid #ff4d4f';
            currentFormInput.removeAttribute('submit');
        } else {
            currentErrorMessage.innerHTML = '';
            currentInput.style.border = '1px solid #1fffb7';
            currentFormInput.setAttribute('submit', 'true');
            validateFormToSubmit();
        }
    }, 500);
}

function valiDateCountryClickShip(event: React.MouseEvent<HTMLDivElement>) {
    const iventType = event.type;
    const targetElement = event.target as HTMLDivElement;
    // event.stopPropagation();
    // const propagationstopped = event.isPropagationStopped();
    // console.log(propagationstopped);
    console.log(iventType);
    console.log(targetElement);
    if (
        !targetElement.classList.contains('ant-select-item-option-content') &&
        !targetElement.classList.contains('ant-select-selection-item')
    ) {
        setTimeout(() => {
            const currentInput = document.querySelector(`.${registyles.input_country_ship}`) as HTMLElement;
            console.log(currentInput);

            const selectCountryInput = currentInput.children[0].children[1].innerHTML;
            const currentErrorMessage = document.querySelector(
                `.${registyles.error_country_ship}`
            ) as HTMLParagraphElement;
            const input = currentInput.children[0].children[0].children[0] as HTMLInputElement;
            const currentFormInput = document.querySelector(`.${registyles.form_country_ship}`) as HTMLDivElement;
            console.log(currentInput);
            console.log(selectCountryInput);
            console.log(currentErrorMessage);
            console.log(input);
            if (selectCountryInput === 'Select your country' && input.value.length === 0) {
                currentErrorMessage.innerHTML = 'Your need to choose country';
                currentInput.style.border = '1px solid #ff4d4f';
                currentFormInput.removeAttribute('submit');
            } else {
                currentErrorMessage.innerHTML = '';
                currentInput.style.border = '1px solid #1fffb7';
                currentFormInput.setAttribute('submit', 'true');
                validateFormToSubmit();
            }
        }, 1500);
    }
}

function valiDateStreetBill() {
    const currentInput = document.querySelector(`.${registyles.input_street_bill}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_street_bill}`) as HTMLParagraphElement;
    const currentFormInput = document.querySelector(`.${registyles.form_street_bil}`) as HTMLDivElement;
    console.log(currentInput);
    console.log(currentErrorMessage);
    const validationValue = currentInput.value.trim();
    if (validationValue.length < 1) {
        currentErrorMessage.innerHTML = 'Street  should have at least one character';
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
        currentFormInput.setAttribute('submit', 'true');
        validateFormToSubmit();
    }
}

function valiDateCityBill() {
    const currentInput = document.querySelector(`.${registyles.input_city_bill}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_town_bill}`) as HTMLParagraphElement;
    const currentFormInput = document.querySelector(`.${registyles.form_city_bill}`) as HTMLDivElement;
    console.log(currentInput);
    console.log(currentErrorMessage);
    const validationValue = currentInput.value.trim();
    const numberTemplate = /\d/;
    const specialCharactersTemplate = /[\\^$.[\]|?*+()]/;
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
        validateFormToSubmit();
    }
}

function valiDatePostCodeBill() {
    const currentInput = document.querySelector(`.${registyles.input_postcode_bill}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_postcode_bill}`) as HTMLParagraphElement;
    const currentFormInput = document.querySelector(`.${registyles.form_code_bill}`) as HTMLDivElement;
    console.log(currentInput);
    console.log(currentErrorMessage);
    const validationValue = currentInput.value.trim();
    const postcodeTemplateAll = /^([0-9]{5,6}|[a-zA-Z][a-zA-Z ]{0,49})$/;
    const postcodeTemplateCanadian = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

    if (
        postcodeTemplateAll.test(validationValue) === false &&
        postcodeTemplateCanadian.test(validationValue) === false
    ) {
        currentErrorMessage.innerHTML = 'You entered an invalid postcode!';
        currentInput.style.border = '1px solid #ff4d4f';
        currentFormInput.removeAttribute('submit');
    } else if (
        postcodeTemplateAll.test(validationValue) === false &&
        postcodeTemplateCanadian.test(validationValue) === true
    ) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
        currentFormInput.setAttribute('submit', 'true');
        validateFormToSubmit();
    } else if (
        postcodeTemplateAll.test(validationValue) === true &&
        postcodeTemplateCanadian.test(validationValue) === false
    ) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
        currentFormInput.setAttribute('submit', 'true');
        validateFormToSubmit();
    } else if (validationValue.length === 0) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #d9d9d9';
        currentFormInput.removeAttribute('submit');
    } else {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
        currentFormInput.setAttribute('submit', 'true');
        validateFormToSubmit();
    }
}

function valiDateCountryChangeBill(option: string) {
    console.log(option);
    setTimeout(() => {
        const currentInput = document.querySelector(`.${registyles.input_country_bill}`) as HTMLElement;
        const selectCountryInput = currentInput.children[0].innerHTML;
        const currentErrorMessage = document.querySelector(`.${registyles.error_country_bill}`) as HTMLParagraphElement;
        const input = currentInput.children[1].children[0].children[0] as HTMLInputElement;
        const currentFormInput = document.querySelector(`.${registyles.form_country_bill}`) as HTMLDivElement;
        console.log(currentInput);
        console.log(selectCountryInput);
        console.log(currentErrorMessage);
        console.log(input);
        if (selectCountryInput === 'Select your country' && input.value.length === 0) {
            currentErrorMessage.innerHTML = 'Your need to choose country';
            currentInput.style.border = '1px solid #ff4d4f';
            currentFormInput.removeAttribute('submit');
        } else {
            currentErrorMessage.innerHTML = '';
            currentInput.style.border = '1px solid #1fffb7';
            currentFormInput.setAttribute('submit', 'true');
            validateFormToSubmit();
        }
    }, 500);
}

function valiDateCountryClickBill(event: React.MouseEvent<HTMLDivElement>) {
    const iventType = event.type;
    const targetElement = event.target as HTMLDivElement;
    // event.stopPropagation();
    // const propagationstopped = event.isPropagationStopped();
    // console.log(propagationstopped);
    console.log(iventType);
    console.log(targetElement);
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
            console.log(currentInput);
            console.log(selectCountryInput);
            console.log(currentErrorMessage);
            console.log(input);
            if (selectCountryInput === 'Select your country' && input.value.length === 0) {
                currentErrorMessage.innerHTML = 'Your need to choose country';
                currentInput.style.border = '1px solid #ff4d4f';
                currentFormInput.removeAttribute('submit');
            } else {
                currentErrorMessage.innerHTML = '';
                currentInput.style.border = '1px solid #1fffb7';
                currentFormInput.setAttribute('submit', 'true');
                validateFormToSubmit();
            }
        }, 1500);
    }
}

const RegistrationPage = () => {
    return (
        <div className={registyles.registration__page}>
            <div className={registyles.registration__container}>
                <Title className={registyles.title_registration_main} level={2} style={{ marginBottom: 0 }}>
                    Welcome to our store
                </Title>
                <div className={registyles.title_registration_login}>
                    <Title className={registyles.registration_login_title} level={3} style={{ marginBottom: 0 }}>
                        Already have an account?
                    </Title>
                    <Button type="primary" className={registyles.registration_login_link}>
                        <Link to="../login_page/login_page.tsx">Log In</Link>
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
                                type="email"
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
                                className={registyles.input_password}
                                type="password"
                                placeholder="Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number"
                            />
                        </Form.Item>
                    </div>
                    <div className={registyles.input_block}>
                        <p className={`${registyles.error_message} ${registyles.error_password_repeat}`}></p>
                        <Form.Item
                            className={`${registyles.input} ${registyles.form_password_repeat}`}
                            name="repeat"
                            label="Repeat Password"
                            rules={[{ required: true }]}
                        >
                            <Input
                                onInput={valiDatePasswordRepeat}
                                className={registyles.input_password_repeat}
                                type="password"
                                placeholder="Repeate your password"
                            />
                        </Form.Item>
                    </div>
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
                                    onClick={(event) => valiDateCountryClickShip(event)}
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
                                            label: 'Latvia (LV)',
                                        },
                                        {
                                            value: '4',
                                            label: 'United Kingdom (UK)',
                                        },
                                        {
                                            value: '5',
                                            label: 'Poland (PL)',
                                        },
                                        {
                                            value: '6',
                                            label: 'Russia (RU)',
                                        },
                                        {
                                            value: '7',
                                            label: 'Ukraine (UA)',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </div>
                        <div className={registyles.checkbox_block}>
                            <Checkbox className={registyles.input_checkbox_ship}>Use for billing</Checkbox>
                            <Checkbox className={registyles.input_checkbox_ship}>Use as default</Checkbox>
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
                                    onClick={(event) => valiDateCountryClickBill(event)}
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
                                            label: 'Latvia (LV)',
                                        },
                                        {
                                            value: '4',
                                            label: 'United Kingdom (UK)',
                                        },
                                        {
                                            value: '5',
                                            label: 'Poland (PL)',
                                        },
                                        {
                                            value: '6',
                                            label: 'Russia (RU)',
                                        },
                                        {
                                            value: '7',
                                            label: 'Ukraine (UA)',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </div>
                        <div className={registyles.checkbox_block}>
                            <Checkbox className={registyles.input_checkbox_bill}>Use for shipping</Checkbox>
                            <Checkbox className={registyles.input_checkbox_bill}>Use as default</Checkbox>
                        </div>
                    </div>
                </div>
                <Form className="input_block" name="register">
                    <Form.Item
                        className={registyles.submit}
                        wrapperCol={{ offset: 11, span: 16 }}
                        style={{ marginTop: 0 }}
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
