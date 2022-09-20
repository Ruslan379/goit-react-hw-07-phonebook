import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';

import { itemsSlice } from 'redux/items/itemsSlice';
import { filterSlice } from 'redux/filter/filterSlice';
import { isLoadingSlice } from 'redux/isLoading/isLoadingSlice';
import { errorSlice } from 'redux/error/errorSlice';


//? +++++++++++ with RTK Qury +++++++++++++++
// import { pokemonApi } from 'redux/pokemon';
import { axiosGetAddAllContactsNEW } from 'services/mockapi_io-api';

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


// //! With createSlice
// const rootReducer = combineReducers({
//     items: itemsSlice.reducer,
//     filter: filterSlice.reducer,
//     isLoading: isLoadingSlice.reducer,
//     error: errorSlice.reducer
// });

//? +++++++++++ store with with RTKQery pokemon.js (1 вариант - РАБОЧИЙ) +++++++++++++++
const rootReducer = combineReducers({
    items: itemsSlice.reducer,
    // [axiosGetAddAllContactsNEW.reducerPath]: axiosGetAddAllContactsNEW.reducer,
    filter: filterSlice.reducer,
    isLoading: isLoadingSlice.reducer,
    error: errorSlice.reducer
});


//! +++++++++++ store +++++++++++++++
// export const store = configureStore({
//     reducer: {
//         contacts: rootReducer
//     },
// });

//? +++++++++++ store with RTKQery & pokemon.js  (1 вариант - РАБОЧИЙ) +++++++++++++++
export const store = configureStore({
    reducer: {
        contacts: rootReducer,
        // [pokemonApi.reducerPath]: pokemonApi.reducer,
        [axiosGetAddAllContactsNEW.reducerPath]: axiosGetAddAllContactsNEW.reducer,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), axiosGetAddAllContactsNEW.middleware],
});


//? +++++++++++ store with RTKQery (2 вариант - РАБОЧИЙ и простой, ПОКА НЕ ПОДКЛЮЧЕН!!!) +++++++++++++++
export const store_RTK = configureStore({
    reducer: {
        contacts: combineReducers({
            // items: itemsSlice.reducer,
            [axiosGetAddAllContactsNEW.reducerPath]: axiosGetAddAllContactsNEW.reducer,
            filter: filterSlice.reducer,
            // isLoading: isLoadingSlice.reducer,
            // error: errorSlice.reducer
        }),
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), axiosGetAddAllContactsNEW.middleware],
});




//! ++++++++++++++++++++++++++++ ВЕСЬ State +++++++++++++++++++++++++++++++++++
// console.log("ВЕСЬ State из store.js ==> store.getState():", store.getState()); //!
//! ____________________________________________________________________________