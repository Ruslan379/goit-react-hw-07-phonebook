import { createSlice } from '@reduxjs/toolkit'


const initialFilter = "";

//* +++++++++++++++++++++ filterSlice +++++++++++++++++++++
export const filterSlice = createSlice({
    name: 'filter',
    initialState: initialFilter,
    reducers: {
        changesFilter(state, { payload }) {
            return payload.filterValue;
        },
    },
});

export const { changesFilter } = filterSlice.actions