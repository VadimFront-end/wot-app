import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { baseQuery, dataWithAccountId } from '../../commonForApi';

interface ITanksListData {
    status: string;
    meta: {
        count: number;
        limit: number;
        page: number;
        page_total: number;
        total: number;
    },
    data: Record<string, Record<string, string | number> | any>;
}

export const tanksInfoApi = createApi({
    reducerPath: 'tanksList',
    baseQuery,
    endpoints: build => ({
        getTanksList: build.query<ITanksListData, { limit?: number, page_no: number }>({
            query: data => ({
                url: 'encyclopedia/vehicles/',
                params: dataWithAccountId(data),
            }),
            keepUnusedDataFor: 0,
        }),
    }),
});

export const { useGetTanksListQuery } = tanksInfoApi;