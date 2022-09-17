import { useEffect } from 'react'; //! +++
import { useDispatch, useSelector } from "react-redux"; //! +++

// import { useState } from 'react'; //?

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { nanoid } from 'nanoid'; //?

// import store from 'redux/store'; //! +++ здесь не нужен

// import useLocalStorage from 'hooks/useLocalStorage'; //?

//! +++ Можно импортировать action ТАК (1 вариант)
import * as action from 'redux/actions'; //! +++ 

//! +++ Можно импортировать action ТАК (2 вариант)
// import {
//   AddLocalStorageContacts,
//   addNameNumber,
//   changesFilter,
//   deletesTodo
// } from 'redux/actions'; //! +++

import { Container } from 'components/Container/Container';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';





export const App = () => {
  //? useState ===> contacts (аналог this.state.contacts)
  //? Используем Хук useLocalStorage (hooks/useLocalStorage):
  //? const [contacts, setContacts] = useLocalStorage("contacts", []);
  
  //? useState ===> filter (аналог this.state.filter)
  //? const [filter, setFilter] = useState('');


  //! ++++++++++++++++++++++++ useDispatch ++++++++++++++++++++++++++++++
  const dispatch = useDispatch();
  // console.log(dispatch); //!


  //todo ==> Перенесены в 'redux/actions'
  //! +++++++++++++++++++ actions +++++++++++++++++++++++++++++
  // //! Действие (actions) для добавления contacts из LocalStorage
  //   const AddLocalStorageContacts = () => ({
  //     type: "ADD_localStorageContacts",
  //     payload: "contacts",
  //   });

  // //! Действие (actions) для добавления name и number
  //   const addNameNumber = (name, number) => ({
  //     type: "ADD_Name&Number",
  //     payload: { name, number },
  //   });
  
  // //! Действие (actions) для поиска по filter
  //   const changesFilter = (filter) => ({
  //     type: "CHANGES_Filter",
  //     payload: filter,
  //   });
  
  // //! Действие (actions) для создание нового массива объектов 
  // //! из contacts с учетом значения поиска из filter
  //   const deletesTodo = (contactId) => ({
  //     type: "DELETES_Todo",
  //     payload: contactId,
  //   });
  //! _____________________ actions ________________________


  //! ++++++++++++++++++++ ВЕСЬ State & contacts, filter +++++++++++++++++++++++++++
  // console.log("App ==> store.getState() ==> ВЕСЬ State:", store.getState()); //! +++ здесь не нужен
  //!_______________________________________________________________________________

  //! Хук useSelector читает данные из state Redux-хранилища 
  //! и подписывается на их обновление
  // const StateContacts = () => {
  //   // return useSelector(state => state.contactsReducer.items); //! OLD 
  //   return useSelector(state => state.contacts.items);
  // };

  // const StateFilter = () => {
  //   // return useSelector(state => state.contactsReducer.filter); //! OLD
  //   return useSelector(state => state.contacts.filter);
  // };

  // const contacts = StateContacts();
  // const filter = StateFilter();

  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  
  // console.log("contacts, [items] :", contacts); //!
  // console.log("filter:", filter); //!
  //!__________________ Хук useSelector ______________________

  //! Добавление contacts из LocalStorage
  useEffect(() => {
    dispatch(action.AddLocalStorageContacts());
  }, [dispatch]);


  
  //? Добавление контакта в this.state.contacts
  // const addСontact = (name, number) => {
  //   const contact = {
  //     id: nanoid(),
  //     name,
  //     number,
  //   };
  //   setContacts(prevState =>
  //     [...prevState, contact]);
  // };



  //? Принимаем пропсы (name, number) из ContactForm
  //? alert с предупреждением о наявности контакта
  // const formSubmitHandler = (name, number) => {
    
  //   if (contacts.find(item => item.name.toLowerCase() === name.toLowerCase())) {
  //     alert(`${name} is already in contacts.`);
  //     toast.warning(`${name} уже есть в контактах.`);
  //     return;
  //   } else {
  //     addСontact(name, number);
  //     }
  // };

  //! Принимаем пропсы (name, number) из ContactForm
  //! alert с предупреждением о наявности контакта
  //!  Добавление контакта в Действия (actions) ==> 
  const formSubmitHandler = (name, number) => {
    if (contacts.find(item => item.name.toLowerCase() === name.toLowerCase())) {
      toast.warning(`${name} уже есть в контактах.`); 
      return;
    } else {
      // console.log("name, number:", name, number); //!
      dispatch(action.addNameNumber(name, number));
      }
  };



  //? запись значения из input-(Find contacts by name) в this.setState.filter
  // const changeFilter = (event) => {
  //   setFilter(event.currentTarget.value); //? 
  // };

//! запись значения из input-(Find contacts by name) в filter
  const changeFilter = (event) => {
    const filter = event.currentTarget.value;
    dispatch(action.changesFilter(filter));
  };


   //? Создание нового массива объектов из this.state.contacts с учетом значения поиска из this.state.filter
  //! Создание нового массива объектов из contacts с учетом значения поиска из filter
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      (contact.name.toLowerCase()).includes(normalizedFilter),
    );
  };



  //? Создание нового массива объектов из this.state.contacts с учетом удаления контакта по его contact.id
  // const deleteTodo = contactId => {
  //   setContacts(prevState => (prevState.filter(contact => contact.id !== contactId)));
  // };

  //! Создание нового массива объектов из this.state.contacts с учетом удаления контакта по его contact.id
  const deleteTodo = contactId => {
    dispatch(action.deletesTodo(contactId));
  };



  const visibleContacts = getVisibleContacts();
  const totalContacts = contacts.length;



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
