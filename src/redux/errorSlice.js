import { createSlice } from '@reduxjs/toolkit'

import {
    addAllContactsFromMmockapiIo,
    addOneContactToMmockapiIo,
    deleteOneContactFromMmockapiIo
} from 'redux/itemsOperations'


const initialError = null;

//* +++++++++++++++++++++ filterSlice +++++++++++++++++++++
export const errorSlice = createSlice({
    name: 'error',
    initialState: initialError,
    extraReducers: {
        [addAllContactsFromMmockapiIo.pending]: () => null,
        [addAllContactsFromMmockapiIo.fulfilled]: () => null,
        [addAllContactsFromMmockapiIo.rejected]: (_, action) => action.payload,

        [addOneContactToMmockapiIo.pending]: () => null,
        [addOneContactToMmockapiIo.fulfilled]: () => null,
        [addOneContactToMmockapiIo.rejected]: (_, action) => action.payload,

        [deleteOneContactFromMmockapiIo.pending]: () => null,
        [deleteOneContactFromMmockapiIo.fulfilled]: () => null,
        [deleteOneContactFromMmockapiIo.rejected]: (_, action) => action.payload,
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