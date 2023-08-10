import React from 'react';
import { Typography, Button, Input, Form, DatePicker } from 'antd';
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
    } else {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #d9d9d9';
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
    } else {
        currentErrorMessage.innerHTML = '';
        currentInput.style.border = '1px solid #d9d9d9';
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
                        <Form.Item className={registyles.input} name="First_name" label="First name">
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
                        <Form.Item className={registyles.input} name="surname" label="Last name">
                            <Input
                                onInput={valiDateSecondName}
                                className={registyles.input_surname}
                                type="text"
                                placeholder="Enter your last name"
                            />
                        </Form.Item>
                    </div>
                    <Form.Item className={registyles.input} name="email" label="E-mail" rules={[{ required: true }]}>
                        <Input
                            className={registyles.input_email}
                            type="email"
                            status="error"
                            placeholder="Enter your e-mail"
                        />
                    </Form.Item>
                    <Form.Item
                        className={registyles.input}
                        name="password"
                        label="Password"
                        rules={[{ required: true }]}
                    >
                        <Input
                            className={registyles.input_password}
                            type="password"
                            status="error"
                            placeholder="Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number"
                        />
                    </Form.Item>
                    <Form.Item
                        className={registyles.input}
                        name="passwordRepeat"
                        label="Repeat Password"
                        rules={[{ required: true }]}
                    >
                        <Input
                            className={registyles.input_password}
                            type="password"
                            status="error"
                            placeholder="Repeate your password"
                        />
                    </Form.Item>
                    <Form.Item
                        className={registyles.input}
                        name="adress"
                        label="Enter your adress"
                        rules={[{ required: true }]}
                    ></Form.Item>
                    <Form.Item className={registyles.input} name="street" label="Street" rules={[{ required: true }]}>
                        <Input
                            className={registyles.input_street}
                            type="text"
                            status="error"
                            placeholder="Enter yout street"
                        />
                    </Form.Item>
                    <Form.Item className={registyles.input} name="city" label="City" rules={[{ required: true }]}>
                        <Input
                            className={registyles.input_city}
                            type="text"
                            status="error"
                            placeholder="Enter your city"
                        />
                    </Form.Item>
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
                    <Form.Item className={registyles.input} name="country" label="Country" rules={[{ required: true }]}>
                        <Input
                            className={registyles.input_country}
                            type="text"
                            status="error"
                            placeholder="Enter your country"
                        />
                    </Form.Item>
                    <Form.Item
                        className={registyles.input}
                        name="birth"
                        label="Date of birth"
                        rules={[{ required: true }]}
                    >
                        <DatePicker className={registyles.input_birth} />
                    </Form.Item>
                    <Form.Item className={registyles.submit} wrapperCol={{ offset: 11, span: 16 }}>
                        <Button className={registyles.submit_button} type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default RegistrationPage;
