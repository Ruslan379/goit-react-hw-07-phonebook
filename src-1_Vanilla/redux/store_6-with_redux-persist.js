import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';

import { itemsSlice } from 'redux/itemsSlice';
import { filterSlice } from 'redux/filterSlice';

//! +++++++++++++++++++++++++++++++ redux-persist +++++++++++++++++++++++++++++++
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'


const persistConfig = {
    key: 'items',
    storage,
    whitelist: ['items']
}
//! _______________________________ redux-persist _______________________________


//! With createSlice
const rootReducer = combineReducers({
    items: itemsSlice.reducer,
    filter: filterSlice.reducer
});



//! +++++++++++ persistedItemsReducer with redux-persist +++++++++++++++
const persistedItemsReducer = persistReducer(persistConfig, rootReducer);



//? +++++++++++ store +++++++++++++++
// export const store = configureStore({
//     reducer: {
//         contacts: rootReducer
//     },
// });

//! +++++++++++ store with redux-persist +++++++++++++++
export const store = configureStore({
    reducer: {
        contacts: persistedItemsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});


//! +++++++++++ with redux-persist +++++++++++++++
export const persistor = persistStore(store)



//! ++++++++++++++++++++++++++++ ВЕСЬ State +++++++++++++++++++++++++++++++++++
// console.log("ВЕСЬ State из App store.js ==> store.getState():", store.getState()); //!
//! ____________________________________________________________________________

