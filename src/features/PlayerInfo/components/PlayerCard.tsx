import React from 'react';
import { useParams } from 'react-router-dom';

import { Tabs } from 'antd/es';

import PlayerTanksList from './components/PlayerTanksList/PlayerTanksList';
import CommonPlayerInfo from './components/CommonPlayerInfo/CommonPlayerInfo';

const { TabPane } = Tabs;

const PlayerCard: React.FC = () => {
    const { id: playerId } = useParams<{ id: string }>();

    return (
        playerId ? (
                <Tabs defaultActiveKey="1" size="large">
                    <TabPane tab="Общая информация" key="1">
                        <CommonPlayerInfo playerId={playerId} />
                    </TabPane>
                    <TabPane tab="Техника игрока" key="2">
                        <PlayerTanksList playerId={playerId} />
                    </TabPane>
                </Tabs>
        ) : null
    );
};

export default PlayerCard;