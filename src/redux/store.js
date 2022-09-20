import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';

import { itemsSlice } from 'redux/items/itemsSlice';
import { filterSlice } from 'redux/filter/filterSlice';
import { isLoadingSlice } from 'redux/isLoading/isLoadingSlice';
import { errorSlice } from 'redux/error/errorSlice';


//! +++++++++++++++++++++++ ИНИЦИАЛИЗАЦИЯ ВСЕХ частей State ++++++++++++
// const initialItems = []; //* Перенесен в 'redux/itemsSlice';
// const initialFilter = "";  //* Перенесен в 'redux/itemsSlice';
// const initialIsLoading = false; //* Перенесен в 'redux/isLoadingSlice';

//! Модель (проэктирование) State
// const allState = {
//     contacts: {
//         items: initialItems,
//         filter: initialFilter,
//         isLoading: initialIsLoading
//     }
// };



//! With createSlice
const rootReducer = combineReducers({
    items: itemsSlice.reducer,
    filter: filterSlice.reducer,
    isLoading: isLoadingSlice.reducer,
    error: errorSlice.reducer
});

//! +++++++++++ store +++++++++++++++
export const store = configureStore({
    reducer: {
        contacts: rootReducer
    },
});


//! ++++++++++++++++++++++++++++ ВЕСЬ State +++++++++++++++++++++++++++++++++++
// console.log("ВЕСЬ State из App store.js ==> store.getState():", store.getState()); //!
//! ____________________________________________________________________________