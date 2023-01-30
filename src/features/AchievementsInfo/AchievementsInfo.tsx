import React from 'react';
import _ from 'lodash';

import { useGetAchievementsInfoQuery } from './achievementsInfoApi';
import { useTable } from '../../app/castomHooks';

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
        render: (text: string) => _.map(text, (item, key)=> item === '\n' ? <div key={key}><br/><span>{item}</span></div> : item),
    },
];

const AchievementsInfo: React.FC = () => {
    const { data: achievementsInfo, isFetching } = useGetAchievementsInfoQuery({});

    const dataSource = _.map(achievementsInfo?.data, ({ name_i18n, condition, image_big, name }) => ({ name: name_i18n, condition, image: image_big, key: name }));

    return useTable({ isFetching, dataSource, columns });
};

export default AchievementsInfo;