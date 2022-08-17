import React from 'react';
import _ from 'lodash';

import { Table } from 'antd/es';

import TankCell from '../TankCell/TankCell';
import { useGetPlayerTanksListQuery } from "../../../playerInfoApi";

interface IProps {
    playedId: string,
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
                <div>Боев: <b>{battles}</b></div>
                <div>Побед: <b>{wins} ({_.isNaN(wins / battles * 100) ? '0%' : (wins / battles * 100).toFixed(2)}%)</b></div>
            </>
        ),
    },
];

const TanksInfo: React.FC<IProps> = ({ playedId }) => {
    const { data: TanksInfoList, isFetching } = useGetPlayerTanksListQuery({ account_id: playedId });

    const dataSource = _.map(TanksInfoList?.data?.[playedId], ({ mark_of_mastery, statistics, tank_id }) => ({
        battles: statistics.battles,
        wins: statistics.wins,
        master: mark_of_mastery,
        tank_id,
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