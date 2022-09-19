import { createSlice } from '@reduxjs/toolkit'

// import { nanoid } from 'nanoid'; //? уже не надо





const initialItems = [];

//* +++++++++++++++++++++ itemsSlice +++++++++++++++++++++
export const itemsSlice = createSlice({
    name: 'items',
    initialState: initialItems,
    reducers: {
        //? уже не надо с redux-persist
        addLocalStorageContacts(state, { payload }) {
            const localStorageContacts = JSON.parse(localStorage.getItem(payload.key)) ?? payload.defaultValue; //? Добавление contacts ИЗ LocalStorage
            // return localStorageContacts; //? уже не надо с redux-persist
            return [...state, ...localStorageContacts]; //? уже не надо с redux-persist
            // console.log(localStorageContacts.items); //* with redux-persist
            // return JSON.parse(localStorageContacts.items); //* with redux-persist
            // if (localStorageContacts.items === undefined) return []; //* with redux-persist
            // return JSON.parse(localStorageContacts.items); //* with redux-persist
        },
        //! для генерации своего id:  уже не надо
        // addItemsFromfetch(state, { payload }) {
        //     const newIdItems = payload.items.map(item => {
        //         return {
        //             id: nanoid(),
        //             name: item.name,
        //             phone: item.phone
        //         };
        //     });
        //     // console.log("newIdItems:", newIdItems); //!
        //     // const fetchItems = [...state, ...payload.items];
        //     const fetchItems = [...state, ...newIdItems];
        //     localStorage.setItem("contacts", JSON.stringify(fetchItems)) //? уже не надо с redux-persist
        //     return fetchItems;
        // },

        addContactsFromAxios(state, { payload }) {
            // console.log("newIdItems:", newIdItems); //!
            const fetchItems = [...state, ...payload.items];
            // const fetchItems = [...state, ...newIdItems];
            localStorage.setItem("contacts", JSON.stringify(fetchItems)) //? Добавление contacts в LocalStorage
            return fetchItems;
        },

        addContact(state, { payload }) {
            const contact = {
                id: payload.id,
                name: payload.name,
                phone: payload.phone,
            };
            const localStorageAddContacts = [...state, contact]
            localStorage.setItem("contacts", JSON.stringify(localStorageAddContacts)) //? Добавление contacts в LocalStorage
            return localStorageAddContacts;
        },

        deleteContact(state, { payload }) {
            const id = payload.contactId;
            const newContact = state.filter(contact => contact.id !== id)
            localStorage.setItem("contacts", JSON.stringify(newContact)) //? Добавление contacts в LocalStorage
            return newContact;
        },
    }
});

export const { addLocalStorageContacts, addContactsFromAxios, addContact, deleteContact } = itemsSlice.actions;
// export const { addContact, deleteContact } = itemsSlice.actions; 