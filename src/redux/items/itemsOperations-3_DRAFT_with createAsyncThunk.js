import { createAsyncThunk } from '@reduxjs/toolkit'
import * as contactsAPI from 'services/mockapi_io-api';

//? уже не надо
// import {
//     addContactsFromAxios,
//     addContact,
//     deleteContact
// } from 'redux/itemsSlice';


// import { toast } from 'react-toastify'; //? уже не надо



//? уже не надо
// export const addAllContactsFromMmockapiIo = () => async dispatch => {
//     try {
//         const items = await contactsAPI.axiosGetAddAllContacts();
//         console.log("itemsOperations-axiosGet ==> items:", items); //!
//         dispatch(addContactsFromAxios({ items }));
//     } catch (error) {
//         console.log(error);
//         toast.error(`Ошибка запроса: ${error.message}`, { position: "top-center", autoClose: 2000 });
//     }
// };
// // dispatch(addAllContactsFroMmockapiIo());

export const addAllContactsFromMmockapiIo = createAsyncThunk(
    'items/axiosGet',
    async () => {
        const items = await contactsAPI.axiosGetAddAllContacts();
        console.log("itemsOperations-axiosGet ==> items:", items); //!
        return items;
    }
);





//? уже не надо
// export const addOneContactToMmockapiIo1 = (addNewContact) => async dispatch => {
//     try {
//         const addItem = await contactsAPI.axiosPostAddContact(addNewContact);
//         console.log("itemsOperations-axiosPost ==> addItem:", addItem); //!
//         dispatch(addContact(addItem));
//     } catch (error) {
//         console.log(error);
//         toast.error(`Ошибка запроса: ${error.message}`, { position: "top-center", autoClose: 2000 });
//     }
// };

export const addOneContactToMmockapiIo = createAsyncThunk(
    'items/axiosPost',
    async (addNewContact) => {
        const addItem = await contactsAPI.axiosPostAddContact(addNewContact);
        console.log("itemsOperations-axiosPost ==> addItem:", addItem); //!
        return addItem;
    }
);






//? уже не надо
// export const deleteOneContactFromMmockapiIo1 = (contactId) => async dispatch => {
//     try {
//         const deleteItem = await contactsAPI.axiosDeleteContact(contactId);
//         console.log("itemsOperations-axiosDelete ==> deleteItem:", deleteItem); //!
//         dispatch(deleteContact({ contactId }));
//     } catch (error) {
//         console.log(error);
//         toast.error(`Ошибка запроса: ${error.message}`, { position: "top-center", autoClose: 2000 });
//     }
// };

export const deleteOneContactFromMmockapiIo = createAsyncThunk(
    'items/axiosDelete',
    async (contactId) => {
        const deleteItem = await contactsAPI.axiosDeleteContact(contactId);
        console.log("itemsOperations-axiosDelete ==> deleteItem:", deleteItem); //!
        return contactId;
    }
);