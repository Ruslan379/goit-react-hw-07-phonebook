import { useEffect } from 'react'; //! +++
import { useDispatch, useSelector } from "react-redux"; //! +++

// import { useState } from 'react'; //?

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { nanoid } from 'nanoid'; //?

// import { store } from 'redux/store'; //! Пока не используем

// import useLocalStorage from 'hooks/useLocalStorage'; //?

//! +++ Можно импортировать action ТАК (1 вариант)
import * as action from 'redux/actions'; //! +++ 

//! +++ Можно импортировать action ТАК (2 вариант)
// import {
//   AddLocalStorageContacts,
//   addContact,
//   changesFilter,
//   deletesTodo
// } from 'redux/actions'; //! +++

import { Container } from 'components/Container/Container';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';





export const App = () => {

  //! +++++++ Хук useDispatch +++++++++++++
  const dispatch = useDispatch();

  //todo:  Действие (actions) ==> Перенесены в 'redux/actions'
  

  

  //! ++++++++++++++++++ Хук useSelector  ++++++++++++++++++
  //! читает данные из state Redux-хранилища и подписывается на их обновление
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  // const contacts = useSelector(state => state.rootReducer.contacts.items); //? -+
  // const filter = useSelector(state => state.rootReducer.contacts.filter); //? -+
  // console.log("contacts, [items] :", contacts); //!
  // console.log("filter:", filter); //!
  //!__________________ Хук useSelector _____________________________



  //! Добавление contacts из LocalStorage
  useEffect(() => {
    // dispatch(action.AddLocalStorageContacts()); //? OLD
    dispatch(action.AddLocalStorageContacts({ key: "contacts", defaultValue: []}));
  }, [dispatch]);



  //! Принимаем (name, number) из ContactForm
  //! alert с предупреждением о наявности контакта
  //!  Добавление контакта в Действия (actions) ==> 
  const formSubmitHandler = (name, number) => {
    if (contacts.find(item => item.name.toLowerCase() === name.toLowerCase())) {
      toast.warning(`${name} уже есть в контактах.`); 
      return;
    } else {
      // console.log("name, number:", name, number); //!
      dispatch(action.addContact({id: nanoid(), name, number}));
      }
  };



//! запись значения из input-(Find contacts by name) в filter
  const changeFilter = (event) => {
    const filterValue = event.currentTarget.value; 
    dispatch(action.changesFilter({filterValue}));
  };



  //! Создание нового массива объектов из contacts с учетом значения поиска из filter
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      (contact.name.toLowerCase()).includes(normalizedFilter),
    );
  };



  //! Создание нового массива объектов из this.state.contacts с учетом удаления контакта по его contact.id
  const deleteTodo = contactId => {
    // console.log("contactId:", contactId); //!
    dispatch(action.deletesTodo({contactId}));
  };



  const visibleContacts = getVisibleContacts();
  const totalContacts = contacts.length;


  //! ++++++++++++++++++++++++++++ ВЕСЬ State ++++++++++++++++++++++++++++++++++
  // console.log("ВЕСЬ State из App ==> store.getState():", store.getState()); //!
  //!___________________________________________________________________________
  
// * +++++++++++++++++++++++++++ MARKUP ++++++++++++++++++++++++++++++++++
    return (
      <Container>
        <ToastContainer autoClose={1000} />

        <h1>Phonebook (HW-6)</h1>

        <ContactForm onSubmit={formSubmitHandler} />

        <h2>Contacts</h2>
        <p>Total: {totalContacts}</p>

        <Filter
          value={filter}
          onChange={changeFilter}
        />
        
        <ContactList
          visibleContacts={visibleContacts}
          onDeleteTodo={deleteTodo}
        />
      </Container>
    );
  }
