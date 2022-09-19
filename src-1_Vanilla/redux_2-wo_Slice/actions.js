import { createAction } from '@reduxjs/toolkit'




//? Действие (actions) для добавления contacts из LocalStorage
// export const AddLocalStorageContacts = () => ({
//     type: "ADD_localStorageContacts",
//     payload: "contacts",
// });

//! Действие (actions) для добавления contacts из LocalStorage
export const AddLocalStorageContacts = createAction('items/ADD_LocalStorageContacts');





//? Действие (actions) для добавления name и number
// export const addNameNumber = (name, number) => ({
//     type: "ADD_Name&Number",
//     payload: { name, number },
// });

//! Действие (actions) для добавления name и number
export const addContact = createAction('items/ADD_Contact');






//? Действие (actions) для поиска по filter
// export const changesFilter = (filter) => ({
//     type: "CHANGES_Filter",
//     payload: filter,
// });

//! Действие (actions) для поиска по filter
export const changesFilter = createAction('filter/CHANGES_Filter');





//? Действие (actions) для создание нового массива объектов 
//? из contacts с учетом значения поиска из filter
// export const deletesTodo = (contactId) => ({
//     type: "DELETES_Todo",
//     payload: contactId,
// });

//! Действие (actions) для создание нового массива объектов 
//! из contacts с учетом значения поиска из filter
export const deletesTodo = createAction('items/DELETE_Contact');


