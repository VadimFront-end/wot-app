import React from 'react';
import _ from 'lodash';

import { Table } from 'antd/es';

import { useGetAchievementsInfoQuery } from './achievementsInfoApi';

const columns = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
        render: (text: string) => <b>{text}</b>,
    },
    {
        title: 'Изображение',
        dataIndex: 'image',
        key: 'image',
        render: (text: string) => <img src={text} alt="Изображение" />,
    },
    {
        title: 'Условия',
        dataIndex: 'condition',
        key: 'condition',
        render: (text: string) => _.map(text, item => item === '\n' ? <><br/><span>{item}</span></> : item),
    },
];

const AchievementsInfo: React.FC = () => {
    const { data: achievementsInfo, isFetching } = useGetAchievementsInfoQuery({});

    const dataSource = _.map(achievementsInfo?.data, ({ name_i18n, condition, image_big }) => ({ name: name_i18n, condition, image: image_big }));

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

export default AchievementsInfo;