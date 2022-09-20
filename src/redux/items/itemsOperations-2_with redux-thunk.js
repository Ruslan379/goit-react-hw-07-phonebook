import * as contactsAPI from 'services/mockapi_io-api';

import {
    addContactsFromAxios,
    addContact,
    deleteContact
} from 'redux/itemsSlice';


import { toast } from 'react-toastify';



//! Вариант Репеты с redux-thunk и async/await
export const addAllContactsFromMmockapiIo = () => async dispatch => {
    try {
        const items = await contactsAPI.axiosGetAddAllContacts()
        console.log("itemsOperations-axiosGet ==> items:", items); //!
        dispatch(addContactsFromAxios({ items }));
    } catch (error) {
        console.log(error);
        toast.error(`Ошибка запроса: ${error.message}`, { position: "top-center", autoClose: 2000 });
    }
};
// dispatch(addAllContactsFroMmockapiIo());



export const addOneContactToMmockapiIo = (addNewContact) => async dispatch => {
    try {
        const addItem = await contactsAPI.axiosPostAddContact(addNewContact)
        console.log("itemsOperations-axiosPost ==> addItem:", addItem); //!
        dispatch(addContact(addItem));
    } catch (error) {
        console.log(error);
        toast.error(`Ошибка запроса: ${error.message}`, { position: "top-center", autoClose: 2000 });
    }
};




export const deleteOneContactFromMmockapiIo = (contactId) => async dispatch => {
    try {
        const deleteItem = await contactsAPI.axiosDeleteContact(contactId)
        console.log("itemsOperations-axiosDelete ==> deleteItem:", deleteItem); //!
        dispatch(deleteContact({ contactId }));
    } catch (error) {
        console.log(error);
        toast.error(`Ошибка запроса: ${error.message}`, { position: "top-center", autoClose: 2000 });
    }
};