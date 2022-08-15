import { createApi } from '@reduxjs/toolkit/dist/query/react';
import queryString from 'query-string';

import { baseQuery, dataWithAccountId } from '../../commonForApi';

export interface IAccountData {
    nickname: string,
    account_id: number,
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
        getAccountList: build.query<IDataPlayers, { [key: string]: string }>({
            query: data => `/account/list/?${queryString.stringify(dataWithAccountId(data))}`,
            keepUnusedDataFor: 0,
        }),
        getAccountInfo: build.query<IDataPlayer, { [key: string]: string }>({
            query: data => `/account/info/?${queryString.stringify(dataWithAccountId(data))}`,
            keepUnusedDataFor: 0,
        }),
    }),
});

export const {
    useGetAccountListQuery,
    useGetAccountInfoQuery,
} = accountListApi;