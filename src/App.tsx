import React, { useEffect, useState } from 'react';
import { useRoutes, useLocation, useNavigate } from 'react-router-dom';
import _ from 'lodash';

import { SearchOutlined, TableOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, Result } from 'antd/es';

import PlayerInfo from './features/PlayerInfo/PlayerInfo';
import TanksInfo from './features/TanksInfo/TabksInfo';
import PlayerCard from './features/PlayerInfo/components/PlayerCard';
import { useAppSelector } from './app/hooks';

import './App.css';

const { Content, Sider, Header } = Layout;

const emptyResult = (
    <Result
        status="404"
        title="404"
        subTitle="Страница не найдена"
    />
);
const routes = [
    {
        path: '/search-player',
        element: <PlayerInfo />,
    },
    {
        path: '/search-player/:id',
        element: <PlayerCard />,
    },
    {
        path: '/tanks',
        element: <TanksInfo />,
    },
    {
        path: '*',
        element: emptyResult,
    },
];

const App: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const nickname = useAppSelector(state => state.playerInfo.nickname);

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/search-player');
        }
    }, []);


    const [ collapsed, setCollapsed ] = useState<boolean>(false);

    const menuItems = [
        { label: `Статистика игрока ${nickname}`, key: '/search-player/', hidden: true },
        { label: 'Поиск игрока', key: '/search-player', icon: <SearchOutlined /> },
        { label: 'Техника', key: '/tanks', icon: <TableOutlined /> },
    ];

    return (
        <Layout className="main-layout" hasSider>
            <Sider
                collapsed={collapsed}
                collapsedWidth={50}
            >
                <Button
                    type="primary"
                    onClick={() => setCollapsed(prevState => !prevState)}
                    style={{ margin: '4px auto', display: 'block' }}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                <Menu
                    selectedKeys={[ location.pathname ]}
                    onClick={({ key }) => navigate(key)}
                    theme="dark"
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header>
                    <h1>{_.find(menuItems, item => _.includes(location.pathname, item.key))?.label}</h1>
                </Header>
                <Content>
                    {useRoutes(routes)}
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;
