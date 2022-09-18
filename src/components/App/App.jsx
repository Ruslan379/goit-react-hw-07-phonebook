// import { useEffect } from 'react'; //! +++
import { useDispatch, useSelector } from "react-redux"; //! +++

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as bookShelfAPI from 'services/bookshelf-api';
// import { getTrendingAllDay } from "fakeAPI";

import { nanoid } from 'nanoid'; 


import {
  addLocalStorageContacts,
  addItemsFromfetch,
  addContact,
  deleteContact
} from 'redux/itemsSlice'; 

import { changesFilter } from 'redux/filterSlice'; 

import { Container } from 'components/Container/Container';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';





export const App = () => {

  //! +++++++ Хук useDispatch +++++++++++++
  const dispatch = useDispatch();



  //! ++++++++++++++++++ Хук useSelector  ++++++++++++++++++
  //! читает данные из state Redux-хранилища и подписывается на их обновление
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);


  //! Делаем запрос на 'http://localhost:4040/contacts/items'
  // useEffect(() => {
  //   bookShelfAPI.fetchItems()
  //     .then((items) => {
  //       console.log(items);
  //       // localStorage.setItem("contacts", JSON.stringify(items))
  //       dispatch(addItems({items}));
  //     })
  //     .catch(error => {
  //       console.log(error.message); //!
  //       toast.error(`Ошибка запроса: ${error.message}`, { position: "top-center", autoClose: 2000 });
  //     });
  //   // dispatch(addItems({items}));
  // }, [dispatch]);



  //? Добавление contacts из LocalStorage ==> уже не надо с кнопкой из LocalStorage
  // useEffect(() => {
  //   dispatch(addLocalStorageContacts({ key: "contacts", defaultValue: []}));
  // }, [dispatch]);


  //? уже не надо с redux-persist
  //! Добавление contacts из LocalStorage with redux-persist
  // useEffect(() => {
  //   dispatch(addLocalStorageContacts({ key: "persist:items", defaultValue: []}));
  // }, [dispatch]);

  // const localStoragePersistItems = JSON.parse(localStorage.getItem("persist:items")) ?? [];
  // console.log(JSON.parse(localStoragePersistItems.items)); //!




  //* Добавление contacts с помощью кнопки из LocalStorage with redux-persist
  const AddAllContactsFromLocalStorage = () => {
    dispatch(addLocalStorageContacts({ key: "contacts", defaultValue: [] }));
  };




//* Добавление contacts с помощью запроса на 'http://localhost:4040/contacts/items'
  const AddAllContactsFromfetchItems = () => {
    //! Делаем запрос на 'http://localhost:4040/contacts/items'
    bookShelfAPI.fetchItems()
      .then((items) => {
        // console.log("App ==> items:", items); //!
        // localStorage.setItem("contacts", JSON.stringify(items))
        dispatch(addItemsFromfetch({ items }));
      })
      .catch(error => {
        console.log(error.message); //!
        toast.error(`Ошибка запроса: ${error.message}`, { position: "top-center", autoClose: 2000 });
      });
  };




  //! Принимаем (name, phone) из ContactForm
  //! alert с предупреждением о наявности контакта
  //!  Добавление контакта в Действия (actions) ==> 
  const formSubmitHandler = (name, phone) => {
    if (contacts.find(item => item.name.toLowerCase() === name.toLowerCase())) {
      toast.warning(`${name} уже есть в контактах.`); 
      return;
    } else {
      dispatch(addContact({id: nanoid(), name, phone}));
      }
  };



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



  //! Создание нового массива объектов из this.state.contacts с учетом удаления контакта по его contact.id
  const deleteTodo = contactId => {
    dispatch(deleteContact({contactId}));
  };



  const visibleContacts = getVisibleContacts();
  const totalContacts = contacts.length;



// * +++++++++++++++++++++++++++ MARKUP ++++++++++++++++++++++++++++++++++
    return (
      <Container>
        <ToastContainer autoClose={1000} />

        <h1>Phonebook HW-7<span style={{ fontSize: "20px" }}> (with ...)</span></h1>

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

        <button type="button"
          onClick={AddAllContactsFromfetchItems}
        >
          {/* Делаем запрос на http://localhost:4040/ */}
          ADD contacts from https://mockapi.io/
        </button>

        {/* <br></br> */}
        <br/>

        <button type="button"
          onClick={AddAllContactsFromLocalStorage}
        >
          Add ALL contacts from LocalStorage
        </button>
      </Container>
    );
  }
