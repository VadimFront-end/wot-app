import { createApi } from '@reduxjs/toolkit/dist/query/react';
import queryString from 'query-string';

import { baseQuery, dataWithAccountId } from '../../commonForApi';

interface IAchievementsData {
    status: string,
    meta: {
        count: number,
    },
    data: { [key: number]: { [key: string]: string | boolean | number }}
}

export const achievementsInfoApi = createApi({
    reducerPath: 'achievementsInfo',
    baseQuery,
    endpoints: build => ({
        getAchievementsInfo: build.query<IAchievementsData, {}>({
            query: data => `encyclopedia/achievements/?${queryString.stringify(dataWithAccountId(data))}`,
            keepUnusedDataFor: 0,
        }),
    }),
});

export const {
    useGetAchievementsInfoQuery,
} = achievementsInfoApi;