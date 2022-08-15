import React, {useCallback, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

import { Progress, Tooltip, Descriptions, Spin } from 'antd/es';

import descriptionPattern from './descriptionPattern';
import { useGetAccountInfoQuery } from '../playerInfoApi';
import { useAppDispatch } from '../../../app/hooks';
import { getAccountName } from '../storePlayerInfo';
import TankCell from "./components/TankCell/TankCell";

const PlayerCard: React.FC = () => {
    const dispatch = useAppDispatch();
    const { id: playerId } = useParams<{ id: string }>();

    const { data: accountInfo, isFetching } = useGetAccountInfoQuery({ account_id: playerId || '' }, { skip: !playerId });

    const { all } = accountInfo?.data?.[playerId || 0]?.statistics || {};
    const { battles, wins, losses, draws } = all || {};

    useEffect(() => {
        if (accountInfo) {
            dispatch(getAccountName(accountInfo?.data?.[playerId || 0]?.nickname));
        }
    }, [ accountInfo ]);

    const accountInfoRender = useCallback(() => _.map(descriptionPattern, (item, key) => (
        <Descriptions.Item
            contentStyle={{ whiteSpace: 'nowrap', background: 'white' }}
            label={item}
            key={key}
        >
            <b>{_.includes(key, 'tank_id') ? <TankCell tankId={all[key]} /> : all[key]}</b>
        </Descriptions.Item>
    )), [ all ]);

    const percentWinsRender = () => <h1>{_.isNaN((wins / battles * 100)) ? 0 : (wins / battles * 100).toFixed(2)}%</h1>;

    return (
        playerId ? (
            <Spin spinning={isFetching}>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '8px' }}>
                    <Tooltip title={`Подед: ${wins}; Поражений: ${losses}; Ничьих: ${draws}; Всего: ${battles}`} placement="right">
                        <Progress
                            type="dashboard"
                            strokeColor="Crimson"
                            gapDegree={draws / battles * 100 || 0}
                            percent={(wins + losses) / battles * 100}
                            format={() => <Spin spinning={isFetching}>{percentWinsRender()}</Spin>}
                            success={{ percent: wins / battles * 100 }}
                        />
                    </Tooltip>
                </div>
                <Descriptions title={<div style={{ textAlign: 'center' }}>Данные игрока</div>} column={1} bordered>
                    {all ? accountInfoRender() : null}
                </Descriptions>
            </Spin>
        ) : null
    );
};

export default PlayerCard;