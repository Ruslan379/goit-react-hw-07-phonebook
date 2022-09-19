import { configureStore } from '@reduxjs/toolkit'
// import { createAction, createReducer } from '@reduxjs/toolkit' //! Пока не используем

import { createReducer } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';

import { createSlice } from '@reduxjs/toolkit'

// import { createStore, combineReducers } from 'redux'; //? УЖЕ не используем
// import { composeWithDevTools } from 'redux-devtools-extension'; //? УЖЕ не используем

//! +++ Можно импортировать action ТАК (1 вариант)
import * as action from 'redux/actions'; //! +++ 


// import { nanoid } from 'nanoid'; //? УЖЕ не используем

//! +++++++++++++++++++++++ ИНИЦИАЛИЗАЦИЯ State ++++++++++++
//! Модель (проэктирование) State
//? OLD
// const allState = {
//     items: [],
//     filter: "",
// };


const initialItems = [];
const initialFilter = "";

// const allState = {
//     contacts: {
//         items: initialItems,
//         filter: initialFilter
//     }
// };

// console.log("Модель STATE ==>", allState); //!



//todo +++++++++++++++++++++ contactsReducer OLD +++++++++++++++++++++
// const contactsReducer = (state = allState, { type, payload }) => {
//     // console.log("Лог action в reducer:", type, payload); //!
//     switch (type) {
//         case "ADD_localStorageContacts":
//             // console.log("Лог-IN action в reducer:", type, payload); //!
//             const localStorageContacts = JSON.parse(localStorage.getItem("contacts")) ?? [];
//             return { ...state, items: localStorageContacts };

//         case "ADD_Name&Number":
//             // console.log("Лог-IN action в reducer:", type, payload); //!
//             const contact = {
//                 id: nanoid(),
//                 name: payload.name,
//                 number: payload.number,
//             };
//             const localStorageAddContacts = [...state.items, contact]
//             localStorage.setItem("contacts", JSON.stringify(localStorageAddContacts))
//             return { ...state, items: [...state.items, contact] };

//         case "CHANGES_Filter":
//             // console.log("Лог-IN action в reducer:", type, payload); //!
//             return { ...state, filter: payload };

//         case "DELETES_Todo":
//             // console.log("Лог-IN action в reducer:", type, payload); //!
//             const newContact = state.items.filter(contact => contact.id !== payload)
//             localStorage.setItem("contacts", JSON.stringify(newContact))
//             return { ...state, items: newContact };

//         default:
//             // console.log("Лог-default action в reducer:", type, payload); //!
//             return state;
//     }
// };

//todo +++++++++++++++++++++ filterReducer  +++++++++++++++++++++
// const filterReducer = (state = filterState, { type, payload }) => {
//     console.log("Лог action в reducer:", type, payload); //!
//     switch (type) {
//         case "ADD_FILTER":
//             console.log("Лог-IN action в reducer:", type, payload); //!

//             return state;

//         default:
//             console.log("Лог-default action в reducer:", type, payload);
//             return state;
//     }
// };
//todo _______________________ Reducers ____________________________________

//! +++++++++++++++++++ actions +++++++++++++++++++++++++++++
// const increment = createAction('increment')
// const decrement = createAction('decrement')


//? ---OLD +++++++++++++++++++++ contactsReducer NEW +++++++++++++++++++++
// const contactsReducer = createReducer(allState, { //? ---OLD
//! +++++++++++++++++++++ itemsReducer +++++++++++++++++++++
const itemsReducer = createReducer(initialItems, {
    [action.AddLocalStorageContacts]: (state, { payload }) => {
        const localStorageContacts = JSON.parse(localStorage.getItem(payload.key)) ?? payload.defaultValue;
        // return { ...state, items: localStorageContacts }; //? OLD
        return localStorageContacts;
    },

    [action.addContact]: (state, { payload }) => {
        // console.log("action.addContact:", action); //!
        const contact = {
            // id: nanoid(), //? OLD
            id: payload.id,
            name: payload.name,
            number: payload.number,
        };
        // const localStorageAddContacts = [...state.items, contact] //? OLD
        const localStorageAddContacts = [...state, contact]
        localStorage.setItem("contacts", JSON.stringify(localStorageAddContacts))
        // return { ...state, items: [...state.items, contact] }; //? OLD
        return localStorageAddContacts;
    },
    //? Перенесен в filterReducer
    // [action.changesFilter]: (state, action) => {
    //     return { ...state, filter: action.payload };
    // },

    [action.deletesTodo]: (state, { payload }) => {
        // const newContact = state.items.filter(contact => contact.id !== action.payload) //? OLD
        const id = payload.contactId;
        // console.log("id:", id); //!
        // console.log("action.deletesTodo state:", state); //! не показывает
        const newContact = state.filter(contact => contact.id !== id)
        localStorage.setItem("contacts", JSON.stringify(newContact))
        // return { ...state, items: newContact }; //? OLD
        return newContact;
    },
});


//! +++++++++++++++++++++ filterReducer  +++++++++++++++++++++
const filterReducer = createReducer(initialFilter, {
    [action.changesFilter]: (state, { payload }) => {
        // console.log("action.changesFilter state:", state); //! показывает с задержкой на 1 шаг
        return payload.filterValue;
    },
})


//! +++++++++++++++++++++ rootReducer  +++++++++++++++++++++
//? OLD ---
// const rootReducer = combineReducers({
//     // contactsReducer, //! OLD
//     contacts: contactsReducer,
// });


//! Пока не используем
const rootReducer = combineReducers({
    items: itemsReducer,
    filter: filterReducer
});




//todo: OLD store +++++++++++++++++++++++++++++++++++++++++
// const store = createStore(rootReducer, composeWithDevTools()); //? ---

//! NEW store +++++++++++++++++++++++++++++++++++++++++
//? 
// const store = configureStore({
//     reducer: {
//         contacts: contactsReducer
//     },
// });

export const store = configureStore({
    reducer: {
        contacts: rootReducer
    },
});



//! ++++++++++++++++++++++++++++ ВЕСЬ State +++++++++++++++++++++++++++++++++++
// console.log("ВЕСЬ State из App store.js ==> store.getState():", store.getState()); //!
//! ____________________________________________________________________________

// export default store;