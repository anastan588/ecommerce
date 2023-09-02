import React, { ReactElement, useState, useContext } from 'react';
import { Button, Card, Input, Form } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { Context } from '../../..';

let version = 0;

export type Values = {
    currentPassword: string;
    newPassword: string;
};

type FieldType = {
    currentPassword?: string;
    newPassword?: string;
};

function PasswordChange() {
    const notifyPasswordSuccess = () => {
        toast.success('Password was updated', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };
    const notifyPasswordError = () => {
        toast.error(`The given current password does not match`, {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };

    const notifyPasswordErrorValidation = (str1: string) => {
        toast.error(`${str1}`, {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };

    const { store } = useContext(Context);
    function sendNewPasswordToServer(vers: number, previousPassword: string, nextPassword: string) {
        return store.changePasswordOfCustomer(vers, previousPassword, nextPassword);
    }
    const customerJSON = localStorage.getItem('currentCustomer') as string;
    const customer = JSON.parse(customerJSON);

    const [currentPassword, setPassword] = useState('');
    const [newPassword, setText] = useState('');

    const onFinish = (values: Values) => {
        version = customer.body.version;
        console.log(values);
        console.log(values.currentPassword);
        const previousPassword = values.currentPassword;
        const nextPassword = values.newPassword;
        console.log(customer);
        const customerUpdate = JSON.stringify(customer);
        localStorage.removeItem('currentCustomer');
        localStorage.setItem('currentCustomer', customerUpdate);
        // setPassword(values.currentPassword);
        // changePassword(values.newPassword);
        sendNewPasswordToServer(version, previousPassword, nextPassword)
            .then(() => notifyPasswordSuccess())
            .catch(() => notifyPasswordError());
        setPassword('');
        setText('');
    };

    const onFinishFailed = (errorInfo: ValidateErrorEntity<Values>) => {
        const str1 = errorInfo.errorFields[0].errors.join(', ');
        notifyPasswordErrorValidation(str1);
    };

    return (
        <Form
            name="password"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Current Password"
                name="currentPassword"
                rules={[
                    { required: true, message: 'Please input your current password!' },
                    { pattern: /\S$/, message: 'Password must not contain trailing whitespace' },
                    { pattern: /^\S/, message: 'Password must not contain leading whitespace' },
                    { pattern: /.{8}/, message: 'Password must be at least 8 characters long' },
                    { pattern: /[A-Z]/, message: 'Password must contain at least one uppercase letter (A-Z)' },
                    { pattern: /[a-z]/, message: 'Password must contain at least one lowercase letter (a-z)' },
                    { pattern: /\d/, message: 'Password must contain at least one digit (0-9)' },
                ]}
            >
                <Input.Password value={currentPassword} />
            </Form.Item>

            <Form.Item<FieldType>
                label="New Password"
                name="newPassword"
                rules={[
                    { required: true, message: 'Please input your current password!' },
                    { pattern: /\S$/, message: 'Password must not contain trailing whitespace' },
                    { pattern: /^\S/, message: 'Password must not contain leading whitespace' },
                    { pattern: /.{8}/, message: 'Password must be at least 8 characters long' },
                    { pattern: /[A-Z]/, message: 'Password must contain at least one uppercase letter (A-Z)' },
                    { pattern: /[a-z]/, message: 'Password must contain at least one lowercase letter (a-z)' },
                    { pattern: /\d/, message: 'Password must contain at least one digit (0-9)' },
                ]}
            >
                <Input.Password value={newPassword} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Confirm new Password
                </Button>
            </Form.Item>
        </Form>
    );
}

export default PasswordChange;
