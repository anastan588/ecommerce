import { Col, InputNumber, Row, Slider } from 'antd';
import React, { useState } from 'react';
import { ImagesType } from './ModalWindow';
import classes from './modalWindow.module.css';

/* const { createRoot } = ReactDOM;
const {  useState  } = React;;
const {  Col, InputNumber, Row, Slider, Space  } = antd; */

type IntegerStepProps = {
    countImages: number;
    imageArray: ImagesType[];
    changeImage: (a: number) => void;
};

const IntegerStep = (props: IntegerStepProps) => {
    console.log('props');
    console.log(props.countImages);
    console.log(props.imageArray);
    const [inputValue, setInputValue] = useState(1);

    const onChange = (newValue: number | null) => {
        if (newValue) {
            setInputValue(newValue);
            props.changeImage(newValue);
        }
    };

    return (
        <Row className={classes.modalIntegerStep}>
            <Col span={12}>
                <Slider
                    min={1}
                    max={props.countImages}
                    onChange={onChange}
                    value={typeof inputValue === 'number' ? inputValue : 0}
                />
            </Col>
            <Col span={4}>
                <InputNumber
                    min={1}
                    max={props.countImages}
                    style={{
                        margin: '0 16px',
                    }}
                    value={inputValue}
                    onChange={onChange}
                />
            </Col>
        </Row>
    );
};

export default IntegerStep;
