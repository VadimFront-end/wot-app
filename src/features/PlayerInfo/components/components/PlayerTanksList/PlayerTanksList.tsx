import React from 'react';
import _ from 'lodash';

import { Table } from 'antd/es';

import TankCell from '../TankCell/TankCell';
import { useGetPlayerTanksListQuery } from '../../../playerInfoApi';
import { getPrettyNumber } from '../../../../../app/helpers';

interface IProps {
    playerId: string,
}

const columns = [
    {
        title: 'Изображение',
        dataIndex: 'image',
        key: 'image',
        render: (text: string, row: Record<string, number>) => <TankCell tankId={row.tank_id} />
    },
    {
        title: 'Знак классности',
        dataIndex: 'master',
        key: 'master',
    },
    {
        title: 'Статистика',
        dataIndex: 'statistic',
        key: 'statistic',
        render: (text: string, { battles, wins }: Record<string, number>) => (
            <>
                <div>Боев: <b>{getPrettyNumber(battles.toString())}</b></div>
                <div>Побед: <b>{getPrettyNumber(wins.toString())} ({_.isNaN(wins / battles * 100) ? '0%' : (wins / battles * 100).toFixed(2)}%)</b></div>
            </>
        ),
    },
];

const TanksInfo: React.FC<IProps> = ({ playerId }) => {
    const { data: tanksInfoList, isFetching } = useGetPlayerTanksListQuery({ account_id: playerId });

    const dataSource = _.map(tanksInfoList?.data?.[playerId], ({ mark_of_mastery, statistics, tank_id }) => ({
        battles: statistics.battles,
        wins: statistics.wins,
        master: mark_of_mastery,
        tank_id,
        key: tank_id,
    }));

    return (
        <Table
            bordered
            loading={isFetching}
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSizeOptions: [ 10, 25, 50 ] }}
        />
    );
};

export default TanksInfo;