import { Col, InputNumber, Row, Slider } from 'antd';
import React, { useEffect, useState } from 'react';
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


let startImage: number = 27;

export function changeStartImage(i: number) {
    startImage = i;
}

const IntegerStep = (props: IntegerStepProps) => {
    const [inputValue, setInputValue] = useState(23);



    useEffect(() => {
        setInputValue(startImage)

    }, [startImage])













    const onChange = (newValue: number | null) => {
        if (newValue) {

            startImage = newValue;
/*             setInputValue(newValue); */
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
