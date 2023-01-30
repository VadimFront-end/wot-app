import { createSlice } from '@reduxjs/toolkit';

const slicePlayerInfo = createSlice({
    name: 'accountInfo',
    initialState: {
        nickname: '',
        selectedTankName: '',
    },
    reducers: {
        getAccountName: (state, action) => {
            state.nickname = action.payload;
        },
        setSelectedTankName: (state, action) => {
            state.selectedTankName = action.payload;
        },
    }
});

export const { getAccountName, setSelectedTankName } = slicePlayerInfo.actions;

export default slicePlayerInfo.reducer;