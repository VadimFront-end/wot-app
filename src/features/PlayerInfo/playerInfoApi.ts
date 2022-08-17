import { createApi } from '@reduxjs/toolkit/dist/query/react';
import queryString from 'query-string';

import { baseQuery, dataWithAccountId } from '../../commonForApi';

export interface IAccountData {
    nickname: string,
    account_id: number,
}

interface ITankData {
    statistics: {
        wins: number,
        battles: number,
    },
    mark_of_mastery: number,
    tank_id: number,
}

interface ITanksListData {
    data: { [key: string]: ITankData[] },
    status: string,
    meta: {
        count: number,
    },
}

interface IDataPlayers {
    data: IAccountData[],
    status: string,
    meta: {
        count: number,
    },
}

interface IDataPlayer {
    data: { [key: string]: { [key: string]: string | number } | any },
    status: string,
    meta: {
        count: number,
    },
}

export const accountListApi = createApi({
    reducerPath: 'accountList',
    baseQuery,
    endpoints: build => ({
        getAccountList: build.query<IDataPlayers, { search: string }>({
            query: data => `/account/list/?${queryString.stringify(dataWithAccountId(data))}`,
            keepUnusedDataFor: 0,
        }),
        getAccountInfo: build.query<IDataPlayer, { account_id: string }>({
            query: data => `/account/info/?${queryString.stringify(dataWithAccountId(data))}`,
            keepUnusedDataFor: 0,
        }),
        getPlayerTanksList: build.query<ITanksListData, { account_id: string }>({
            query: data => `/account/tanks/?${queryString.stringify(dataWithAccountId(data))}`,
            keepUnusedDataFor: 0,
        }),
    }),
});

export const {
    useGetAccountListQuery,
    useGetAccountInfoQuery,
    useGetPlayerTanksListQuery,
} = accountListApi;