// import { createStore, } from 'redux';
import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';


import { nanoid } from 'nanoid';

//! +++++++++++++++++++++++ ИНИЦИАЛИЗАЦИЯ ЧАСТЕЙ State ++++++++++++
// const initialState = {};

// const allState_OLD = {
//     contacts: {
//         items: [{
//             id: nanoid(),
//             name: "",
//             number: ""
//         }],
//         filter: "",
//     },
// };

// const contactsState1 = {
//     items: [{
//         id: nanoid(),
//         name: "",
//         number: ""
//     }],
// };


// const contactsState = {
//     items: [],
// };

// const filterState = {
//     filter: "",
// };

// console.log("allState_OLD:", allState_OLD); //?
// console.log("contactsState:", contactsState); //?
// console.log("filterState:", filterState); //?

const allState = {
    items: [],
    filter: "",
};

// console.log("STATE ==> contacts:", allState); //!


//! ++++++++++++++++++++++++++++ Reducers  +++++++++++++++++++++++
//! +++++++++++++++++++++ contactsReducer  +++++++++++++++++++++
const contactsReducer = (state = allState, { type, payload }) => {
    // console.log("Лог action в reducer:", type, payload); //!
    switch (type) {
        case "ADD_localStorageContacts":
            // console.log("Лог-IN action в reducer:", type, payload); //!
            const localStorageContacts = JSON.parse(localStorage.getItem("contacts")) ?? [];
            return { ...state, items: localStorageContacts };

        case "ADD_Name&Number":
            // console.log("Лог-IN action в reducer:", type, payload); //!
            const contact = {
                id: nanoid(),
                name: payload.name,
                number: payload.number,
            };
            const localStorageAddContacts = [...state.items, contact]
            localStorage.setItem("contacts", JSON.stringify(localStorageAddContacts))
            return { ...state, items: [...state.items, contact] };

        case "CHANGES_Filter":
            // console.log("Лог-IN action в reducer:", type, payload); //!
            return { ...state, filter: payload };

        case "DELETES_Todo":
            // console.log("Лог-IN action в reducer:", type, payload); //!
            const newContact = state.items.filter(contact => contact.id !== payload)
            localStorage.setItem("contacts", JSON.stringify(newContact))
            return { ...state, items: newContact };

        default:
            // console.log("Лог-default action в reducer:", type, payload); //!
            return state;
    }
};

//! +++++++++++++++++++++ filterReducer  +++++++++++++++++++++
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
//! _______________________ Reducers ____________________________________

//! +++++++++++++++++++++ rootReducer  +++++++++++++++++++++
// const rootReducer = combineReducers({
//     contactsReducer,
//     filterReducer,
// });

const rootReducer = combineReducers({
    // contactsReducer, //! OLD
    contacts: contactsReducer,
});
//! ______________________ rootReducer ______________________

const store = createStore(rootReducer, composeWithDevTools());

//? ++++++++++++++++++++ ВЕСЬ State +++++++++++++++++++++++++++
console.log("store.js ==> store.getState() ==> ВЕСЬ State:", store.getState()); //!


export default store;