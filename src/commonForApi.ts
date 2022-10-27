import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const dataWithAccountId = (data: { [key: string]: string | number })=> ({ application_id: '3c4d97aabbf1f1abc18a0559ffbda320', ...data });

export const baseQuery = fetchBaseQuery({
    baseUrl: 'https://api.tanki.su/wot',
});