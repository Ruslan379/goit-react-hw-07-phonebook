import { configureStore } from '@reduxjs/toolkit'
// import { combineReducers } from 'redux'; //? уже не надо с RTK Query

import { filterSlice } from 'redux/filter/filterSlice';

import { itemsAPIbyRTKQuery } from 'redux/items/itemsSliceRTKQuery';




//! +++++++++++ store with RTK Query (3-й вариант - РАБОТАЕТ!!!) +++++++++++++++
//! export const getFilter = state => state.filter;
export const store = configureStore({
    reducer: {
        [itemsAPIbyRTKQuery.reducerPath]: itemsAPIbyRTKQuery.reducer,
        filter: filterSlice.reducer
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), itemsAPIbyRTKQuery.middleware],
});

//! ++++++++++++++++++++++++++++ ВЕСЬ State +++++++++++++++++++++++++++++++++++
// console.log("ВЕСЬ State из store.js ==> store.getState():", store.getState()); //!
//! ____________________________________________________________________________