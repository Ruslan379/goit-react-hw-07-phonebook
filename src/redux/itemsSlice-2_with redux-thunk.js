import { createSlice } from '@reduxjs/toolkit'

// import { nanoid } from 'nanoid'; //? уже не надо





const initialItems = [];

//* +++++++++++++++++++++ itemsSlice +++++++++++++++++++++
export const itemsSlice = createSlice({
    name: 'items',
    initialState: initialItems,
    reducers: {
        addContactsFromAxios(state, { payload }) {
            const newIdItems = payload.items.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    number: item.phone
                };
            });
            console.log("addContactsFromAxios ==> newIdItems:", newIdItems); //!
            return newIdItems;
        },

        addContact(state, { payload }) {
            const contact = {
                id: payload.id,
                name: payload.name,
                number: payload.phone,
            };
            console.log("addContact ==> contact:", contact); //!
            const newContacts = [...state, contact]
            return newContacts;
        },

        deleteContact(state, { payload }) {
            const id = payload.contactId;
            console.log("deleteContact ==> id", id); //!
            const newContact = state.filter(contact => contact.id !== id)
            return newContact;
        },
    }
});

export const { addContactsFromAxios, addContact, deleteContact } = itemsSlice.actions;
