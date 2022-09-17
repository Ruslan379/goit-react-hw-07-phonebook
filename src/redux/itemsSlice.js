import { createSlice } from '@reduxjs/toolkit'



const initialItems = [];
//* +++++++++++++++++++++ itemsSlice +++++++++++++++++++++


export const itemsSlice = createSlice({
    name: 'items',
    initialState: initialItems,
    reducers: {
        addLocalStorageContacts(state, { payload }) {
            const localStorageContacts = JSON.parse(localStorage.getItem(payload.key)) ?? payload.defaultValue;
            // return localStorageContacts; //? уже не надо с redux-persist
            // console.log(localStorageContacts.items); //!
            if (localStorageContacts.items === undefined) return []; //? with redux-persist
            return JSON.parse(localStorageContacts.items); //? with redux-persist

        },

        addContact(state, { payload }) {
            const contact = {
                id: payload.id,
                name: payload.name,
                number: payload.number,
            };
            const localStorageAddContacts = [...state, contact]
            // localStorage.setItem("contacts", JSON.stringify(localStorageAddContacts)) //? уже не надо с redux-persist
            return localStorageAddContacts;
        },

        deleteContact(state, { payload }) {
            const id = payload.contactId;
            const newContact = state.filter(contact => contact.id !== id)
            // localStorage.setItem("contacts", JSON.stringify(newContact)) //? уже не надо с redux-persist
            return newContact;
        },
    }
});

export const { addLocalStorageContacts, addContact, deleteContact } = itemsSlice.actions