import { createSlice } from '@reduxjs/toolkit'

import {
    addAllContactsFromMmockapiIo,
    addOneContactToMmockapiIo,
    deleteOneContactFromMmockapiIo
} from 'redux/items//itemsOperations'


const initialIsLoading = false;

//* +++++++++++++++++++++ filterSlice +++++++++++++++++++++
export const isLoadingSlice = createSlice({
    name: 'isLoading',
    initialState: initialIsLoading,
    extraReducers: {
        [addAllContactsFromMmockapiIo.pending]: () => true,
        [addAllContactsFromMmockapiIo.fulfilled]: () => false,
        [addAllContactsFromMmockapiIo.rejected]: () => false,

        [addOneContactToMmockapiIo.pending]: () => true,
        [addOneContactToMmockapiIo.fulfilled]: () => false,
        [addOneContactToMmockapiIo.rejected]: () => false,

        [deleteOneContactFromMmockapiIo.pending]: () => true,
        [deleteOneContactFromMmockapiIo.fulfilled]: () => false,
        [deleteOneContactFromMmockapiIo.rejected]: () => false,
    }
});

// export const { isLoadingSlice } = isLoadingSlice.actions




//! Так НЕ РАБОТАЕТ???
// export const isLoadingSlice = createSlice({
//     name: 'isLoading',
//     initialState: initialIsLoading,
//     extraReducers: {
//         [addAllContactsFromMmockapiIo.pending]: state => { state.isLoading = true },
//         [addAllContactsFromMmockapiIo.fulfilled]: state => { state.isLoading = false },
//         [addAllContactsFromMmockapiIo.rejected]: state => { state.isLoading = false },

//         [addOneContactToMmockapiIo.pending]: state => { state.isLoading = true },
//         [addOneContactToMmockapiIo.fulfilled]: state => { state.isLoading = false },
//         [addOneContactToMmockapiIo.rejected]: state => { state.isLoading = false },

//         [deleteOneContactFromMmockapiIo.pending]: state => { state.isLoading = true },
//         [deleteOneContactFromMmockapiIo.fulfilled]: state => { state.isLoading = false },
//         [deleteOneContactFromMmockapiIo.rejected]: state => { state.isLoading = false },
//     }
// });