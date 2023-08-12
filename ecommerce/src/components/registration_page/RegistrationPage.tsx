import React from 'react';
import { Typography, Button, Input, Form } from 'antd';
import { Link } from 'react-router-dom';
import registyles from './regisration_page.module.css';

// console.log(registyles);

const { Title } = Typography;

function valiDateFirstName() {
    const currentInput = document.querySelector(`.${registyles.input_name}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_name}`) as HTMLParagraphElement;
    console.log(currentInput);
    console.log(currentErrorMessage);
    const validationValue = currentInput.value.trim();
    const numberTemplate = /\d/;
    const specialCharactersTemplate = /[\\^$.[\]|?*+()]/;
    if (specialCharactersTemplate.test(validationValue) && numberTemplate.test(validationValue)) {
        currentErrorMessage.innerHTML = "Name  shouldn't contain special characters and numbers";
        currentInput.style.border = '1px solid #ff4d4f';
    } else if (numberTemplate.test(validationValue)) {
        currentErrorMessage.innerHTML = "Name  shouldn't contain numbers";
        currentInput.style.border = '1px solid #ff4d4f';
    } else if (specialCharactersTemplate.test(validationValue)) {
        currentErrorMessage.innerHTML = "Name  shouldn't contain special characters";
        currentInput.style.border = '1px solid #ff4d4f';
    } else if (validationValue.length < 1) {
        currentErrorMessage.innerHTML = 'Name  should have at least one character';
        currentInput.style.border = '1px solid #ff4d4f';
    } else if (validationValue.length === 0) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #d9d9d9';
    } else {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
    }
}
function valiDateSecondName() {
    const currentInput = document.querySelector(`.${registyles.input_surname}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_surname}`) as HTMLParagraphElement;
    console.log(currentInput);
    console.log(currentErrorMessage);
    const validationValue = currentInput.value.trim();
    const numberTemplate = /\d/;
    const specialCharactersTemplate = /[\\^$.[\]|?*+()]/;
    if (specialCharactersTemplate.test(validationValue) && numberTemplate.test(validationValue)) {
        currentErrorMessage.innerHTML = "Last name  shouldn't contain special characters and numbers";
        currentInput.style.border = '1px solid #ff4d4f';
    } else if (numberTemplate.test(validationValue)) {
        currentErrorMessage.innerHTML = "Last name  shouldn't contain numbers";
        currentInput.style.border = '1px solid #ff4d4f';
    } else if (specialCharactersTemplate.test(validationValue)) {
        currentErrorMessage.innerHTML = "Last name  shouldn't contain special characters";
        currentInput.style.border = '1px solid #ff4d4f';
    } else if (validationValue.length < 1) {
        currentErrorMessage.innerHTML = 'Last name  should have at least one character';
        currentInput.style.border = '1px solid #ff4d4f';
    } else if (validationValue.length === 0) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #d9d9d9';
    } else {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
    }
}

function valiDateEmail() {
    const currentInput = document.querySelector(`.${registyles.input_mail}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_email}`) as HTMLParagraphElement;
    console.log(currentInput);
    console.log(currentErrorMessage);
    const validationValue = currentInput.value.toLocaleLowerCase().trim();
    const emailTemplate =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if (emailTemplate.test(validationValue) === false) {
        currentErrorMessage.innerHTML = 'You entered an invalid email address!';
        currentInput.style.border = '1px solid #ff4d4f';
    } else if (validationValue.length === 0) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #d9d9d9';
    } else {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
    }
}

function valiDatePassword() {
    const currentInput = document.querySelector(`.${registyles.input_password}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_password}`) as HTMLParagraphElement;
    const validationValue = currentInput.value.trim();
    console.log(validationValue);
    const digitTemplate = /(?=.*[0-9])/;
    const lowerCaseTemplate = /(?=.*[a-z])/;
    const upperCaseTemplate = /(?=.*[A-Z])/;
    const passwordTemplate = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
    if (validationValue.length < 8) {
        currentErrorMessage.innerHTML = 'Password length must be at least eight characters';
        currentInput.style.border = '1px solid #ff4d4f';
    } else if (validationValue.length === 0) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #d9d9d9';
    } else if (validationValue.length >= 8) {
        if (passwordTemplate.test(validationValue)) {
            currentErrorMessage.innerHTML = '';
            currentInput.style.border = '1px solid #1fffb7';
        } else if (digitTemplate.test(validationValue) === false) {
            currentErrorMessage.innerHTML = 'Password must contain at least one digit';
            currentInput.style.border = '1px solid #ff4d4f';
        } else if (lowerCaseTemplate.test(validationValue) === false) {
            currentErrorMessage.innerHTML = 'Password must contain at least one lowercase letter';
            currentInput.style.border = '1px solid #ff4d4f';
        } else if (upperCaseTemplate.test(validationValue) === false) {
            currentErrorMessage.innerHTML = 'Password must contain at least one uppercase letter';
            currentInput.style.border = '1px solid #ff4d4f';
        }
    }
}

function valiDatePasswordRepeat() {
    const currentInput = document.querySelector(`.${registyles.input_password_repeat}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_password_repeat}`) as HTMLParagraphElement;
    const passwordInput = document.querySelector(`.${registyles.input_password}`) as HTMLInputElement;
    const validationValue = currentInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    console.log(passwordValue);
    console.log(validationValue);
    if (validationValue === passwordValue && validationValue.length !== 0) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
    } else if (validationValue.length === 0) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #d9d9d9';
    } else {
        currentErrorMessage.innerHTML = "Password don't match with first passrwod";
        currentInput.style.border = '1px solid #ff4d4f';
    }
}
function valiDateBirth() {
    const currentInput = document.querySelector(`.${registyles.input_birth}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_birth}`) as HTMLParagraphElement;
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
    } else if (yearForValidation < 13 && yearForValidation >= 0) {
        currentErrorMessage.innerHTML = 'You must be at least 13 years old';
        currentInput.style.border = '1px solid #ff4d4f';
    } else if (yearForValidation < 0 || yearForValidation > 110) {
        currentErrorMessage.innerHTML = 'Invalid date of birth';
        currentInput.style.border = '1px solid #ff4d4f';
    } else {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #d9d9d9';
    }
}

function valiDateStreet() {
    const currentInput = document.querySelector(`.${registyles.input_street}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_street}`) as HTMLParagraphElement;
    console.log(currentInput);
    console.log(currentErrorMessage);
    const validationValue = currentInput.value.trim();
    if (validationValue.length < 1) {
        currentErrorMessage.innerHTML = 'Street  should have at least one character';
        currentInput.style.border = '1px solid #ff4d4f';
    } else {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
    }
}

function valiDateCity() {
    const currentInput = document.querySelector(`.${registyles.input_city}`) as HTMLInputElement;
    const currentErrorMessage = document.querySelector(`.${registyles.error_town}`) as HTMLParagraphElement;
    console.log(currentInput);
    console.log(currentErrorMessage);
    const validationValue = currentInput.value.trim();
    const numberTemplate = /\d/;
    const specialCharactersTemplate = /[\\^$.[\]|?*+()]/;
    if (specialCharactersTemplate.test(validationValue) && numberTemplate.test(validationValue)) {
        currentErrorMessage.innerHTML = "Name  shouldn't contain special characters and numbers";
        currentInput.style.border = '1px solid #ff4d4f';
    } else if (numberTemplate.test(validationValue)) {
        currentErrorMessage.innerHTML = "City  shouldn't contain numbers";
        currentInput.style.border = '1px solid #ff4d4f';
    } else if (specialCharactersTemplate.test(validationValue)) {
        currentErrorMessage.innerHTML = "City  shouldn't contain special characters";
        currentInput.style.border = '1px solid #ff4d4f';
    } else if (validationValue.length < 1) {
        currentErrorMessage.innerHTML = 'City  should have at least one character';
        currentInput.style.border = '1px solid #ff4d4f';
    } else if (validationValue.length === 0) {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #d9d9d9';
    } else {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #1fffb7';
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
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 800 }}
                >
                    {' '}
                    <div className={registyles.input_block}>
                        <p className={(registyles.error_message, registyles.error_name)}></p>
                        <Form.Item
                            className={registyles.input}
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
                        <p className={(registyles.error_message, registyles.error_surname)}></p>
                        <Form.Item
                            className={registyles.input}
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
                        <p className={(registyles.error_message, registyles.error_email)}></p>
                        <Form.Item
                            className={registyles.input}
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
                        <p className={(registyles.error_message, registyles.error_password)}></p>
                        <Form.Item
                            className={registyles.input}
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
                        <p className={(registyles.error_message, registyles.error_password_repeat)}></p>{' '}
                        <Form.Item
                            className={registyles.input}
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
                        <p className={(registyles.error_message, registyles.error_birth)}></p>
                        <Form.Item
                            className={registyles.input}
                            name="birth"
                            label="Date of birth"
                            rules={[{ required: true }]}
                        >
                            <Input onInput={valiDateBirth} type="date" className={registyles.input_birth} />
                        </Form.Item>
                    </div>
                    <div className={registyles.input_block}>
                        <p className={(registyles.error_message, registyles.error_adress)}></p>
                        <Form.Item
                            className={registyles.input}
                            label="Enter your adress"
                            rules={[{ required: true }]}
                        ></Form.Item>
                    </div>
                    <div className={registyles.input_block}>
                        <p className={(registyles.error_message, registyles.error_street)}></p>
                        <Form.Item
                            className={registyles.input}
                            name="street"
                            label="Street"
                            rules={[{ required: true }]}
                        >
                            <Input
                                onInput={valiDateStreet}
                                className={registyles.input_street}
                                type="text"
                                placeholder="Enter yout street"
                            />
                        </Form.Item>
                    </div>
                    <div className={registyles.input_block}>
                        <p className={(registyles.error_message, registyles.error_town)}></p>
                        <Form.Item className={registyles.input} name="city" label="City" rules={[{ required: true }]}>
                            <Input
                                onInput={valiDateCity}
                                className={registyles.input_city}
                                type="text"
                                placeholder="Enter your city"
                            />
                        </Form.Item>
                    </div>
                    <Form.Item
                        className={registyles.input}
                        name="postcode"
                        label="Postal Code"
                        rules={[{ required: true }]}
                    >
                        <Input
                            className={registyles.input_postcode}
                            type="text"
                            status="error"
                            placeholder="Enter your postal code"
                        />
                    </Form.Item>
                    <Form.Item className={registyles.input} label="Country" rules={[{ required: true }]}>
                        <Input
                            className={registyles.input_country}
                            type="text"
                            status="error"
                            placeholder="Enter your country"
                        />
                    </Form.Item>
                    <Form.Item className={registyles.submit} wrapperCol={{ offset: 11, span: 16 }}>
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
