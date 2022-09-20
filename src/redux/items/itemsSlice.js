import { createSlice } from '@reduxjs/toolkit'

// import { nanoid } from 'nanoid'; //? уже не надо

import {
    addAllContactsFromMmockapiIo,
    addOneContactToMmockapiIo,
    deleteOneContactFromMmockapiIo
} from 'redux/items/itemsOperations'



const initialItems = [];

//* +++++++++++++++++++++ itemsSlice +++++++++++++++++++++
export const itemsSlice = createSlice({
    name: 'items',
    initialState: initialItems,
    extraReducers: {
        [addAllContactsFromMmockapiIo.fulfilled]: (_, { payload }) => {
            const newIdItems = payload.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    number: item.phone
                };
            });
            console.log("addContactsFromAxios ==> newIdItems:", newIdItems); //!
            return newIdItems;
        },

        [addOneContactToMmockapiIo.fulfilled]: (state, { payload }) => {
            const contact = {
                id: payload.id,
                name: payload.name,
                number: payload.phone,
            };
            console.log("addContact ==> contact:", contact); //!
            const newContacts = [...state, contact]
            return newContacts;
        },

        [deleteOneContactFromMmockapiIo.fulfilled]: (state, { payload }) => {
            const id = payload;
            console.log("deleteContact ==> id", id); //!
            const newContact = state.filter(contact => contact.id !== id)
            return newContact;
        },
    }
});

// export const { addContactsFromAxios, addContact, deleteContact } = itemsSlice.actions; //? уже не надо
