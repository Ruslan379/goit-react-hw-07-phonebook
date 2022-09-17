import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';

import { itemsSlice } from 'redux/itemsSlice';
import { filterSlice } from 'redux/filterSlice';


//! +++++++++++++++++++++++ ИНИЦИАЛИЗАЦИЯ ВСЕХ частей State ++++++++++++
// const initialItems = []; //* Перенесен в 'redux/itemsSlice';
// const initialFilter = "";  //* Перенесен в 'redux/itemsSlice';

//! Модель (проэктирование) State
// const allState = {
//     contacts: {
//         items: initialItems,
//         filter: initialFilter
//     }
// };

//! itemsSlice ==> Перенесен в 'redux/itemsSlice';

//! filterSlice ==> Перенесен в 'redux/filterSlice';


//! With createSlice
const rootReducer = combineReducers({
    items: itemsSlice.reducer,
    filter: filterSlice.reducer
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