import { useEffect } from 'react'; //! +++
import { useDispatch, useSelector } from "react-redux"; //! +++

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import * as contactsAPI from 'services/mockapi_io-api'; //? уже не надо
import * as itemsOperations from 'redux/itemsOperations';

// import { nanoid } from 'nanoid'; 

//? уже не надо
// import {
//   addContactsFromAxios,
//   addContact,
//   deleteContact
// } from 'redux/itemsSlice'; 

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


  //? Добавление ALL Contacts с помощью axios.get-запроса (МОЙ ВАРИАНТ)
  //? Делаем запрос на 'https://6326c1ee70c3fa390f9bc51d.mockapi.io'/contacts'
  // useEffect(() => {
  //   contactsAPI.axiosGetAddAllContacts()
  //     .then((items) => {
  //       console.log("App-axiosGet ==> items:", items); //!
  //       dispatch(addContactsFromAxios({ items }));
  //     })
  //     .catch(error => {
  //       console.log(error.message); //!
  //       toast.error(`Ошибка запроса: ${error.message}`, { position: "top-center", autoClose: 2000 });
  //     });
  // }, [dispatch]);

  //* Добавление ALL Contacts с помощью axios.get-запроса (Вариант РЕПЕТЫ с redux-thunk и async/await)
  //! addAllContactsFroMmockapiIo ==> перенесен в itemsOperations
  useEffect(() => {
    dispatch(itemsOperations.addAllContactsFromMmockapiIo());
  }, [dispatch]);
  
  

  //! Принимаем (name, number) из ContactForm
  //! alert с предупреждением о наявности контакта
  //!  Добавление контакта в Действия (actions) ==> 
  const formSubmitHandler = (name, number) => {
    if (contacts.find(item => item.name.toLowerCase() === name.toLowerCase())) {
      toast.warning(`${name} уже есть в контактах.`); 
      return;
    } else {
      const addNewContact = { name, phone: number };
      //* Делаем запрос на добавление контакта из mockapi.io/contacts (Вариант РЕПЕТЫ с redux-thunk и async/await):
      dispatch(itemsOperations.addOneContactToMmockapiIo(addNewContact));

    //? Делаем запрос на добавление контакта из mockapi.io/contacts (МОЙ ВАРИАНТ)
    // contactsAPI.axiosPostAddContact(addNewContact)
    //   .then((addItem) => {
    //     console.log("App-axiosPost ==> addItem:", addItem); //!
    //     dispatch(addContact(addItem));
    //   })
    //   .catch(error => {
    //     console.log(error.message); //!
    //     toast.error(`Ошибка запроса: ${error.message}`, { position: "top-center", autoClose: 2000 });
    //   });
    //   // dispatch(addContact({id: nanoid(), name, number})); //?
      
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
    //* Делаем запрос на УДАЛЕНИЕ контакта из mockapi.io/contacts (Вариант РЕПЕТЫ с redux-thunk и async/await):
    dispatch(itemsOperations.deleteOneContactFromMmockapiIo(contactId));



    //? Делаем запрос на УДАЛЕНИЕ контакта из mockapi.io/contacts (МОЙ ВАРИАНТ)
    // contactsAPI.axiosDeleteContact(contactId)
    //   .then((deleteItem) => {
    //     console.log("App-axiosDelete ==> deleteItem:", deleteItem); //!
    //     // localStorage.setItem("contacts", JSON.stringify(items))
    //     dispatch(deleteContact({contactId}));
    //   })
    //   .catch(error => {
    //     console.log(error.message); //!
    //     toast.error(`Ошибка запроса: ${error.message}`, { position: "top-center", autoClose: 2000 });
    //   });
    
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
      </Container>
    );
  }
