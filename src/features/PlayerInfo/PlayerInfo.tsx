import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import _ from 'lodash';

import { SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import { Input, Spin, List, Empty } from 'antd/es';

import { IAccountData, useGetAccountListQuery } from './playerInfoApi';

const PlayerInfo: React.FC = () => {
    const navigate = useNavigate();

    const [ searchValue, setSearchValue ] = useState<string>('');

    const { data: accountList, isFetching } = useGetAccountListQuery({ search: searchValue }, { skip: searchValue.length < 3 });

    const nickNameList = _.map(accountList?.data, (account: IAccountData) => (
        <List.Item
            onClick={() => navigate(`/search-player/${account.account_id}`)}
            key={account.account_id}
            style={{ cursor: 'pointer' }}
        >
            {account.nickname}
        </List.Item>
    ));

    return (
        <div>
            <Input
                size="large"
                prefix={isFetching ? <LoadingOutlined /> : <SearchOutlined />}
                placeholder="Введите ник игрока"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
            />
            <Spin spinning={isFetching}>
                <List bordered>
                    {nickNameList.length ? nickNameList : (
                        <Empty
                            description={<b>Нет совпадений или введено менее 3-х символов</b>}
                            style={{ padding: '8px', fontSize: '16px' }}
                        />)}
                </List>
            </Spin>
        </div>
    );
}

export default PlayerInfo;