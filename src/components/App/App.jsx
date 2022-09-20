import { useEffect } from 'react'; //! +++
import { useDispatch, useSelector } from "react-redux"; //! +++

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import * as itemsOperations from 'redux/items/itemsOperations';
// import { itemsOperations } from 'redux'; //! ТАК НЕ РАБОТАЕТ с Re-export

import { getContacts } from 'redux/items/itemsSelectors';
import { getFilter } from 'redux/filter/filterSelectors';
import { getIsLoading } from 'redux/isLoading/isLoadingSelectors';
import { getError } from 'redux/error/errorSelectors';

// import { itemsSelectors, filterSelectors } from 'redux'; //! ТАК НЕ РАБОТАЕТ с Re-export

import { changesFilter } from 'redux/filter/filterSlice'; 

import { Container } from 'components/Container/Container';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { Loader } from 'components/Loader/Loader';
import { ContactList } from 'components/ContactList/ContactList';





export const App = () => {

  //! +++++++ Хук useDispatch +++++++++++++
  const dispatch = useDispatch();



  //! ++++++++++++++++++ Хук useSelector  ++++++++++++++++++
  //! читает данные из state Redux-хранилища и подписывается на их обновление
  // const contacts = useSelector(state => state.contacts.items); //? 1 вариант
  // const contacts = useSelector(itemsSelectors.getContacts); //! ТАК НЕ РАБОТАЕТ с Re-export
  const contacts = useSelector(getContacts);
  // const filter = useSelector(state => state.contacts.filter); //? 1 вариант
  // const filter = useSelector(filterSelectors.getFilter); //! ТАК НЕ РАБОТАЕТ с Re-export
  const filter = useSelector(getFilter);

  const isLoading = useSelector(getIsLoading);
  console.log("isLoading:", isLoading); //!

  const error = useSelector(getError);
  // console.log("error:", error); //!
  //!___________________________________________________________




  //! Добавление ALL Contacts с помощью axios.get-запроса 
  // useEffect(() => dispatch(itemsOperations.addAllContactsFromMmockapiIo()), [dispatch]);  //! ТАК НЕ РАБОТАЕТ!!!

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
      //! Делаем запрос на добавление контакта из mockapi.io/contacts 
      dispatch(itemsOperations.addOneContactToMmockapiIo(addNewContact));
      }
  };




//! запись значения из input-(Find contacts by name) в filter
  const changeFilter = (event) => {
    const filterValue = event.currentTarget.value; 
    dispatch(changesFilter({filterValue}));
  };




//! Создание нового массива объектов из this.state.contacts с учетом удаления контакта по его contact.id
  const deleteTodo = contactId => {
    //! Делаем запрос на УДАЛЕНИЕ контакта из mockapi.io/contacts 
    dispatch(itemsOperations.deleteOneContactFromMmockapiIo(contactId));
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

        <h1>Phonebook HW-7<span style={{ fontSize: "20px" }}> (with createAsyncThunk)</span></h1>

        <ContactForm onSubmit={formSubmitHandler} />

        <h2>Contacts</h2>
        <p>Total: {totalContacts}</p>

      {error && (
          <div style={{ margin: '0 auto', color: 'red' }}>
            <h1>The request failed:</h1>
            <h2 style={{ textDecoration: "underline", fontStyle: 'italic', color: '#a10000' }}>!!! {error}</h2>
          </div>
        )}

        <Filter
          value={filter}
          onChange={changeFilter}
        />

        <br/>
        {isLoading && <Loader />}
        <br/>

        {totalContacts > 0 && !isLoading && (
          <ContactList
            visibleContacts={visibleContacts}
            onDeleteTodo={deleteTodo}
          />
        )}
      </Container>
    );
  }
