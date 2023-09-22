// eslint-disable-next-line import/no-extraneous-dependencies
import { AudioOutlined } from '@ant-design/icons';
import React, { useContext } from 'react';
import { Input, Space } from 'antd';
import { observer } from 'mobx-react-lite';
import { searchProd } from '../requests';
import { Context } from '../../..';

const { Search } = Input;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1677ff',
        }}
    />
);

const SearchCompponent: React.FC = observer(() => {
    const products = useContext(Context);
    const onSearch = async (value: string) => {
        const search = await searchProd(value);
        products.products.setProducts(search);
    };
    return (
        <Space direction="vertical">
            <Search placeholder="input search text en" onSearch={onSearch} style={{ width: 200 }} />
        </Space>
    );
});

export default SearchCompponent;
