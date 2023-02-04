import React, { useEffect } from 'react';
import { useRoutes, useLocation, useNavigate, Link } from 'react-router-dom';

import { SearchOutlined, TableOutlined, AreaChartOutlined } from '@ant-design/icons';
import { Layout, Menu, Result, Tooltip } from 'antd/es';

import PlayerInfo from './features/PlayerInfo/PlayerInfo';
import TanksInfo from './features/TanksInfo/TabksInfo';
import TanksCard from './features/TankCard/TankCard';
import PlayerCard from './features/PlayerInfo/components/PlayerCard';
import AchievementsInfo from './features/AchievementsInfo/AchievementsInfo';
import { useAppSelector } from './app/hooks';
import logo from './imgs/main.png';

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
        path: '/tanks/:id',
        element: <TanksCard />,
    },
    {
        path: '/achievements',
        element: <AchievementsInfo />
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
    const tankName = useAppSelector(store => store.playerInfo.selectedTankName);

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/search-player');
        }
    }, []);

    const menuItems = [
        { label: `Статистика игрока ${nickname}`, key: '/search-player/', hidden: true },
        { label: 'Поиск игрока', key: '/search-player', icon: <SearchOutlined /> },
        { label: `Описание танка ${tankName}`, key: '/tanks/', icon: <TableOutlined />, hidden: true },
        { label: 'Техника', key: '/tanks', icon: <TableOutlined /> },
        { label: 'Достижения', key: '/achievements', icon: <AreaChartOutlined /> },
    ];

    const selectedKeys = [ location.pathname.indexOf('/', 1) === -1 ? location.pathname : location.pathname.substring(0, location.pathname.indexOf('/', 1)) ];

    return (
        <Layout className="main-layout" hasSider>
            <Sider
                collapsible
                collapsedWidth={64}
            >
                <Link to="/search-player">
                    <Tooltip title="На главную" placement="right">
                        <div style={{ background: '#f0f2f5' }}>
                            <img src={logo} alt="Лого" width={64} height={64} style={{ margin: 'auto', display: 'block'}}/>
                        </div>
                    </Tooltip>
                </Link>
                <Menu
                    selectedKeys={selectedKeys}
                    onClick={({ key }) => navigate(key)}
                    theme="dark"
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header>
                    <h1>{menuItems.find(item => location.pathname?.includes(item.key))?.label}</h1>
                </Header>
                <Content>
                    {useRoutes(routes)}
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;
