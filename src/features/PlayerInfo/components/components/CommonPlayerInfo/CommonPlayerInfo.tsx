import React, { useCallback, useEffect } from 'react';

import { Descriptions, Progress, Spin, Tooltip } from 'antd/es';

import descriptionPattern from '../../descriptionPattern';
import TankCell from '../TankCell/TankCell';
import { useGetAccountInfoQuery } from '../../../playerInfoApi';
import { getAccountName } from '../../../storePlayerInfo';
import { useAppDispatch } from '../../../../../app/hooks';
import { getPrettyNumber } from '../../../../../app/helpers';

interface IProps {
    playerId: string;
}

const CommonPlayerInfo: React.FC<IProps> = ({ playerId }) => {
    const dispatch = useAppDispatch();
    const { data: accountInfo, isFetching } = useGetAccountInfoQuery({ account_id: playerId || '' }, { skip: !playerId });

    const { all } = accountInfo?.data?.[playerId || 0]?.statistics || {};
    const { battles, wins, losses, draws } = all || {};

    useEffect(() => {
        if (accountInfo) {
            dispatch(getAccountName(accountInfo?.data?.[playerId || 0]?.nickname));
        }
    }, [accountInfo]);

    const accountInfoRender = useCallback(
        () =>
            Object.entries(descriptionPattern).map(([key, item]) => (
                <Descriptions.Item contentStyle={{ whiteSpace: 'nowrap', background: 'white' }} label={item} key={key}>
                    <b>{key.includes('tank_id') ? <TankCell tankId={all[key]} /> : getPrettyNumber(all[key].toString())}</b>
                </Descriptions.Item>
            )),
        [all]
    );

    const statisticTooltipTitle = (
        <>
            <div>Подед: {getPrettyNumber(wins?.toString())}</div>
            <div>Поражений: {getPrettyNumber(losses?.toString())}</div>
            <div>Ничьих: {getPrettyNumber(draws?.toString())}</div>
            <div>Всего: {getPrettyNumber(battles?.toString())}</div>
        </>
    );

    const percentWinsRender = () => <h1>{Number.isNaN((wins / battles) * 100) ? 0 : ((wins / battles) * 100).toFixed(2)}%</h1>;

    return (
        <Spin spinning={isFetching}>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '8px' }}>
                <Tooltip title={statisticTooltipTitle} placement="right">
                    <Progress
                        type="dashboard"
                        strokeColor="Crimson"
                        gapDegree={(draws / battles) * 100 || 0}
                        percent={((wins + losses) / battles) * 100}
                        format={() => <Spin spinning={isFetching}>{percentWinsRender()}</Spin>}
                        success={{ percent: (wins / battles) * 100 }}
                    />
                </Tooltip>
            </div>
            <Descriptions column={1} bordered>
                {all ? accountInfoRender() : null}
            </Descriptions>
        </Spin>
    );
};

export default CommonPlayerInfo;
