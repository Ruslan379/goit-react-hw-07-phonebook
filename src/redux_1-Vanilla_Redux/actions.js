
//! +++++++++++++++++++ actions +++++++++++++++++++++++++++++
//! Действие (actions) для добавления contacts из LocalStorage
export const AddLocalStorageContacts = () => ({
    type: "ADD_localStorageContacts",
    payload: "contacts",
});

//! Действие (actions) для добавления name и number
export const addNameNumber = (name, number) => ({
    type: "ADD_Name&Number",
    payload: { name, number },
});

//! Действие (actions) для поиска по filter
export const changesFilter = (filter) => ({
    type: "CHANGES_Filter",
    payload: filter,
});

//! Действие (actions) для создание нового массива объектов 
//! из contacts с учетом значения поиска из filter
export const deletesTodo = (contactId) => ({
    type: "DELETES_Todo",
    payload: contactId,
});
//! _____________________ actions ________________________


// todo_OLD
//! динамика
export const myAction = (name, number) => ({
    type: "MY_ACTION",
    payload: { name, number },
});



//! Статика:
export const myAction_2 = {
    type: "MY_ACTION_2",
    payload: { text: "super payload_2" },
};

// export default { myAction, myAction_2 };