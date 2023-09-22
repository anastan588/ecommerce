import React from 'react';
import { Space, Spin } from 'antd';
import '../../index.css';

const Spinner: React.FC = () => (
    <div className="spinner">
        <Spin size="large" />
    </div>
);

export default Spinner;
