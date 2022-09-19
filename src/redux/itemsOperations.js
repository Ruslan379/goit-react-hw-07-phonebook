import { createAsyncThunk } from '@reduxjs/toolkit'
import * as contactsAPI from 'services/mockapi_io-api';

import { toast } from 'react-toastify';



export const addAllContactsFromMmockapiIo = createAsyncThunk(
    'items/axiosGet',
    async (_, { rejectWithValue }) => {
        try {
            const items = await contactsAPI.axiosGetAddAllContacts();
            console.log("itemsOperations-axiosGet ==> items:", items); //!
            return items;
        } catch (error) {
            console.log(error);
            toast.error(`Ошибка запроса: ${error.message}`, { position: "top-center", autoClose: 2000 });
            return rejectWithValue(error.message);
        }
    },
);



export const addOneContactToMmockapiIo = createAsyncThunk(
    'items/axiosPost',
    async (addNewContact, { rejectWithValue }) => {
        try {
            const addItem = await contactsAPI.axiosPostAddContact(addNewContact);
            console.log("itemsOperations-axiosPost ==> addItem:", addItem); //!
            return addItem;
        } catch (error) {
            console.log(error);
            toast.error(`Ошибка запроса: ${error.message}`, { position: "top-center", autoClose: 2000 });
            return rejectWithValue(error.message);
        }
    },
);



export const deleteOneContactFromMmockapiIo = createAsyncThunk(
    'items/axiosDelete',
    async (contactId, { rejectWithValue }) => {
        try {
            const deleteItem = await contactsAPI.axiosDeleteContact(contactId);
            console.log("itemsOperations-axiosDelete ==> deleteItem:", deleteItem); //!
            return contactId;
        } catch (error) {
            console.log(error);
            toast.error(`Ошибка запроса: ${error.message}`, { position: "top-center", autoClose: 2000 });
            return rejectWithValue(error.message);
        }
    },
);