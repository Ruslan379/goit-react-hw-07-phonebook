import * as contactsAPI from 'services/mockapi_io-api';

import {
    addContactsFromAxios,
    // addContact,
    // deleteContact
} from 'redux/itemsSlice';

//! Вариант Репеты с redux-thunk и async/await
export const addAllContactsFroMmockapiIo = () => async dispatch => {
    try {
        const items = await contactsAPI.axiosGetAddAllContacts()
        console.log("App-axiosGet ==> items:", items); //!
        dispatch(addContactsFromAxios({ items }));
    } catch (error) {
        console.log(error);
    }
};

// const t = addAllContactsFroMmockapiIo();
//   console.log(t);

// dispatch(addAllContactsFroMmockapiIo());