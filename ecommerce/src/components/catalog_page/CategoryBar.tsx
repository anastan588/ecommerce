import React, { useContext, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { MenuProps, MenuTheme, theme, Menu, Switch } from 'antd';
import { observer } from 'mobx-react-lite';
import Item from 'antd/es/list/Item';
import { Context } from '../..';
// import Color from './filter_components/Color';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Categories', 'sub1', <AppstoreOutlined />, [
        getItem('Option 1', '1'),
        getItem('Option 2', '2'),
        getItem('Option 3', '3'),
        getItem('Option 4', '4'),
    ]),

    getItem('Color', 'sub2', <AppstoreOutlined />, [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),

    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),
];

const CategoryBar: React.FC = observer(() => {
    const { products } = useContext(Context);

    /* const itemsMenu = () => {
    const arr = products.category.map((item, i) => getItem(`${item}`, i));
    return [getItem('Category', 'sub1', <AppstoreOutlined />, arr)];
}; */
    const types = products.types.map((item, i) => getItem(`${item.name}`, item.id));
    // const categories = products.category.map((item, i) => getItem(`${item}`, item));
    // console.log(categories);
    // const attributes = products.attributes.map((item, i) => getItem(`${item}`, item));
    const itemsMenu = [
        getItem('TYPE PRODUCTS', 'sub1', <AppstoreOutlined />, types),
        // getItem('Category', 'sub2', <AppstoreOutlined />, categories),
        // getItem('Attributes', 'sub3', <AppstoreOutlined />, ),
    ];

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const [theme, setTheme] = useState<MenuTheme>('dark');
    const [current, setCurrent] = useState('1');

    const changeTheme = (value: boolean) => {
        setTheme(value ? 'dark' : 'light');
    };

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        console.log(e.key);
        setCurrent(e.key);
    };

    return (
        <>
            <Switch
                checked={theme === 'dark'}
                onChange={changeTheme}
                checkedChildren="Dark"
                unCheckedChildren="Light"
            />
            <br />
            <br />
            <Menu
                theme={theme}
                onClick={onClick}
                style={{ width: 256 }}
                defaultOpenKeys={['sub1']}
                selectedKeys={[current]}
                mode="inline"
                items={itemsMenu}
            />
        </>
    );
});
export default CategoryBar;
