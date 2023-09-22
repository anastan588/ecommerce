import React, { ReactElement, useState, useContext } from 'react';
import { Button, Card, Input, Form } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../..';

let version = 0;

function DateOfBirthEdit() {
    const notifyDateOfBirth = () => {
        toast.info('Date of birth was updated', {
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
    function sendUpdateCustomerToServer(vers: number) {
        return store.updateCustomer(vers);
    }
    const customerJSON = localStorage.getItem('currentCustomer') as string;
    const customer = JSON.parse(customerJSON);
    const [text, setText] = useState(customer);
    const [isEdit, setIsEdit] = useState(false);
    let returnDateOfBirth: ReactElement = <div>{text.body.dateOfBirth}</div>;

    if (isEdit) {
        returnDateOfBirth = (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Form
                    style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
                    name="birth"
                    className="form"
                    wrapperCol={{ span: 30 }}
                    initialValues={{ remember: true }}
                    fields={[
                        {
                            name: ['birth'],
                            value: text.body.dateOfBirth,
                        },
                    ]}
                    // autoComplete="off"
                    onFinish={() => {
                        setIsEdit(false);
                        sendUpdateCustomerToServer(version).then(() => notifyDateOfBirth());
                    }}
                >
                    <Form.Item
                        name="birth"
                        style={{ width: '80%' }}
                        rules={[
                            { required: true, message: 'Please, enter your date of birth' },
                            {
                                message: `You must be at least 13 years old`,
                                validator: (_, value) => {
                                    const todayDate = new Date();
                                    const dateForValidation = new Date(value);
                                    const todayDateMiliseconds = todayDate.getTime();
                                    const dateForValidationMiliseconds = dateForValidation.getTime();
                                    const yearForValidation = Math.floor(
                                        (todayDateMiliseconds - dateForValidationMiliseconds) /
                                            (1000 * 60 * 60 * 24 * 365.25)
                                    );
                                    if (yearForValidation < 13 && yearForValidation >= 0) {
                                        return Promise.reject(new Error(`You must be at least 13 years old`));
                                    }
                                    return Promise.resolve();
                                },
                            },
                            {
                                message: `Invalid date of birth`,
                                validator: (_, value) => {
                                    const todayDate = new Date();
                                    const dateForValidation = new Date(value);
                                    const todayDateMiliseconds = todayDate.getTime();
                                    const dateForValidationMiliseconds = dateForValidation.getTime();
                                    const yearForValidation = Math.floor(
                                        (todayDateMiliseconds - dateForValidationMiliseconds) /
                                            (1000 * 60 * 60 * 24 * 365.25)
                                    );
                                    if (yearForValidation < 0 || yearForValidation > 110) {
                                        return Promise.reject(new Error(`Invalid date of birth`));
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <Input
                            style={{ width: '100%' }}
                            type="date"
                            value={text.body.dateOfBirth}
                            onChange={(event) => {
                                customer.body.dateOfBirth = event.target.value;
                                version = customer.body.version;
                                const customerUpdate = JSON.stringify(customer);
                                localStorage.removeItem('currentCustomer');
                                localStorage.setItem('currentCustomer', customerUpdate);
                                setText(customer);
                            }}
                        />
                    </Form.Item>
                    <div>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </div>
                </Form>
            </div>
        );
    } else {
        returnDateOfBirth = <div>{text.body.dateOfBirth}</div>;
    }

    return (
        <Card
            type="inner"
            title="Date of Birth"
            extra={
                <Button
                    icon={<EditOutlined />}
                    onClick={() => {
                        setIsEdit(true);
                    }}
                >
                    Edit
                </Button>
            }
        >
            {returnDateOfBirth}
        </Card>
    );
}

export default DateOfBirthEdit;
