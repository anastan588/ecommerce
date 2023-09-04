import React from 'react';
import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import store from '../login_page/store';

const ButtonCarts: React.FC = observer(() => {
    return (
        <Space wrap>
            <Button type="dashed" className="button_carts">
                <span className="carts_icon"></span>
                <span className="carts_text">В корзину</span>
            </Button>
        </Space>
    );
});

export default ButtonCarts;