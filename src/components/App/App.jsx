// import { useEffect, useState } from 'react'; //! +++
import { useDispatch, useSelector } from "react-redux"; //! +++

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import * as itemsOperations from 'redux/items/itemsOperations'; 
// import { itemsOperations } from 'redux'; //! ТАК НЕ РАБОТАЕТ с Re-export

// import { getContacts } from 'redux/items/itemsSelectors'; 
import { getFilter } from 'redux/filter/filterSelectors';
// import { getIsLoading } from 'redux/isLoading/isLoadingSelectors'; 
// import { getError } from 'redux/error/errorSelectors';

// import { itemsSelectors, filterSelectors } from 'redux'; //! ТАК НЕ РАБОТАЕТ с Re-export

import { changesFilter } from 'redux/filter/filterSlice'; 

import { Container } from 'components/Container/Container';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { Loader } from 'components/Loader/Loader';
import { ContactList } from 'components/ContactList/ContactList';

import {
  useGetAddAllContactsQuery,
  usePostAddContactMutation,
  // useDeleteContactMutation
} from 'redux/items/itemsSliceRTKQuery'; 
//________________________________________________________________________

export const App = () => {
  //! +++++++ Хук useDispatch +++++++++++++
  const dispatch = useDispatch();



  //! ++++++++++++++++++ Хук useSelector  ++++++++++++++++++
  //! читает данные из state Redux-хранилища и подписывается на их обновление
  const filter = useSelector(getFilter); 



//!---------------------------- GET with RTK Query ----------------------------------
  const { data = [], isFetching: isLoading, isError, error} = useGetAddAllContactsQuery();

      const contacts = data.map(item => {
        return {
          id: item.id,
          name: item.name,
          number: item.phone
        };
      });



//!--------------------------- POST with RTK Query ---------------------------------
  const [addContact, { isLoading: isUpdating }] = usePostAddContactMutation();

  //! Принимаем (name, number) из ContactForm
  //! alert с предупреждением о наявности контакта
  const formSubmitHandler = (name, number) => {
    if (contacts.find(item => item.name.toLowerCase() === name.toLowerCase())) {
      toast.warning(`${name} уже есть в контактах.`); 
      return;
    } else {
      const addNewContact = { name, phone: number };
      //! Делаем запрос на добавление контакта из mockapi.io/contacts 
      addContact(addNewContact).unwrap()
      }
  };




//!---------------------------- DELETE with RTK Query --------------------------------
//! Перенесенн в ContactList



  //! запись значения из input-(Find contacts by name) в filter
  const changeFilter = (event) => {
    const filterValue = event.currentTarget.value; 
    dispatch(changesFilter({filterValue}));
  };



  //! Создание нового массива объектов из contacts с учетом значения поиска из filter
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      (contact.name.toLowerCase()).includes(normalizedFilter),
    );
  };



  const visibleContacts = getVisibleContacts();
  const totalContacts = contacts.length;



// * +++++++++++++++++++++++++++ MARKUP ++++++++++++++++++++++++++++++++++
    return (
      <Container>
        <ToastContainer autoClose={1500} theme={"colored"} />

        <h1>Phonebook HW-7<span style={{ fontSize: "20px" }}> (with RTK Query)</span></h1>

        <ContactForm
          onSubmit={formSubmitHandler}
          addition={isUpdating}
        />

        <h2>Contacts</h2>
        <p>Total: {totalContacts}</p>

      {isError && (
          <div style={{ margin: '0 auto', color: 'red' }}>
            <h1>The request failed:</h1>
            <h2 style={{ textDecoration: "underline", fontStyle: 'italic', color: '#a10000' }}>!!! {error.data}</h2>
          </div>
        )}

        {contacts.length > 0 &&
          (<Filter
          value={filter}
          onChange={changeFilter}
          />
        )}

        <br/>
        {isLoading && <Loader />}
        <br/>

        {contacts.length > 0 && !isLoading &&(
          <ContactList
            visibleContacts={visibleContacts}
            // onDeleteContact={deleteContact} //? уже не надо с RTK Query
            // deleting={isDeleting} //? уже не надо с RTK Query
          />
        )}
      </Container>
    );
  }
