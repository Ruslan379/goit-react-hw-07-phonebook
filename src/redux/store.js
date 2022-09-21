import { configureStore } from '@reduxjs/toolkit'
// import { combineReducers } from 'redux'; //? уже не надо с RTK Query

// import { itemsSlice } from 'redux/items/itemsSlice'; //? уже не надо с RTK Query
import { filterSlice } from 'redux/filter/filterSlice';
// import { isLoadingSlice } from 'redux/isLoading/isLoadingSlice'; //? уже не надо с RTK Query
// import { errorSlice } from 'redux/error/errorSlice'; //? уже не надо с RTK Query


//? +++++++++++ with RTK Query +++++++++++++++
// import { pokemonApi } from 'redux/pokemon';
import { itemsAPIbyRTKQuery } from 'services/mockapi_io-api';

//?________________________________________________

//todo +++++++++++++++++++++++ ИНИЦИАЛИЗАЦИЯ ВСЕХ частей State ++++++++++++
// const initialItems = []; //* Перенесен в 'redux/items/itemsSlice';
// const initialFilter = "";  //* Перенесен в 'redux/filter/filterSlice';
// const initialIsLoading = false; //* Перенесен в 'redux/isLoading/isLoadingSlice';
// const initialError = null; //* Перенесен в 'redux/error/errorSlice';

//todo Модель (проэктирование) State
// const allState = {
//     contacts: {
//         items: initialItems,
//         filter: initialFilter,
//         isLoading: initialIsLoading,
//         error: initialError
//     }
// };
//todo_________________________________________________________________________


//! With createSlice
// const rootReducer = combineReducers({
//     items: itemsSlice.reducer,
//     filter: filterSlice.reducer,
//     isLoading: isLoadingSlice.reducer,
//     error: errorSlice.reducer
// });

//? +++++++++++ store with with RTK Query pokemon.js (1 вариант - РАБОЧИЙ) +++++++++++++++
//? export const getFilter = state => state.contacts.filter;
// const rootReducer = combineReducers({
//     // items: itemsSlice.reducer,
//     // [itemsAPIbyRTKQuery.reducerPath]: itemsAPIbyRTKQuery.reducer,
//     filter: filterSlice.reducer,
//     // isLoading: isLoadingSlice.reducer,
//     // error: errorSlice.reducer
// });


//! +++++++++++ store +++++++++++++++
// export const store = configureStore({
//     reducer: {
//         contacts: rootReducer
//     },
// });

//? +++++++++++ store with RTK Query & pokemon.js  (1 вариант - РАБОЧИЙ) +++++++++++++++
//? export const getFilter = state => state.contacts.filter;
// export const store = configureStore({
//     reducer: {
//         contacts: rootReducer,
//         // [pokemonApi.reducerPath]: pokemonApi.reducer,
//         [itemsAPIbyRTKQuery.reducerPath]: itemsAPIbyRTKQuery.reducer,
//     },
//     middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), itemsAPIbyRTKQuery.middleware],
// });


//? +++++++++++ store with RTK Query (2 вариант - НЕ РАБОЧИЙ, зависает на Loader) +++++++++++++++
// export const store = configureStore({
//     reducer: {
//         contacts: combineReducers({
//             // items: itemsSlice.reducer,
//             [itemsAPIbyRTKQuery.reducerPath]: itemsAPIbyRTKQuery.reducer,
//             filter: filterSlice.reducer
//             // isLoading: isLoadingSlice.reducer,
//             // error: errorSlice.reducer
//         }),
//     },
//     middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), itemsAPIbyRTKQuery.middleware],
// });

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