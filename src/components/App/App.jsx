// import { useEffect, useState } from 'react'; //! +++
import { useDispatch, useSelector } from "react-redux"; //! +++

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { store } from 'redux/store'; //? +++ 

// import * as itemsOperations from 'redux/items/itemsOperations'; //! +-+-+-+-
// import { itemsOperations } from 'redux'; //! ТАК НЕ РАБОТАЕТ с Re-export

// import { getContacts } from 'redux/items/itemsSelectors'; //! +-+-+-+-
import { getFilter } from 'redux/filter/filterSelectors';
// import { getIsLoading } from 'redux/isLoading/isLoadingSelectors'; //! +-+-+-+-
// import { getError } from 'redux/error/errorSelectors';

// import { itemsSelectors, filterSelectors } from 'redux'; //! ТАК НЕ РАБОТАЕТ с Re-export

import { changesFilter } from 'redux/filter/filterSlice'; 

import { Container } from 'components/Container/Container';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { Loader } from 'components/Loader/Loader';
import { ContactList } from 'components/ContactList/ContactList';


//? +++++++++++ with RTK Query & pokemon.js +++++++++++++++
// import { useGetPokemonByNameQuery } from 'redux/pokemon'; 
import { useGetAddAllContactsQuery, usePostAddContactMutation, useDeleteContactMutation } from 'services/mockapi_io-api'; 

//?________________________________________________

export const App = () => {
  //! useState ===> contacts (аналог this.state.contacts)
  // const [contacts, setContacts] = useState([]); 
  // const [isLoading, setIsLoading] = useState(false);

  //! +++++++ Хук useDispatch +++++++++++++
  const dispatch = useDispatch();



  //! ++++++++++++++++++ Хук useSelector  ++++++++++++++++++
  //! читает данные из state Redux-хранилища и подписывается на их обновление
  // const contacts = useSelector(state => state.contacts.items); //? 1 вариант
  // const contacts = useSelector(itemsSelectors.getContacts); //! ТАК НЕ РАБОТАЕТ с Re-export
  // const contacts = useSelector(getContacts); //! +-+-+-+-
  // const filter = useSelector(state => state.contacts.filter); //? 1 вариант
  // const filter = useSelector(filterSelectors.getFilter); //! ТАК НЕ РАБОТАЕТ с Re-export
  const filter = useSelector(getFilter); //! +-+-+-+-
  // const filter = ""; //! временно

  // const isLoading = useSelector(getIsLoading); //! +-+-+-+-
  // console.log("isLoading:", isLoading); //!

  // const error = useSelector(getError); //! +-+-+-+-
  // console.log("error:", error); //!

  //? +++++++++++ with RTK Query & pokemon.js +++++++++++++++ НЕ РАБОТАЕТ!!!
  // const contacts_RTK = useSelector(state => state.itemsAPI.queries.'getAddAllContacts(undefined)'.data); //? 2 вариант
  // console.log("contacts_RTK:", contacts_RTK); //!
  //!___________________________________________________________





//? +++++++++++ with RTK Query & pokemon.js +++++++++++++++
  // const { data, error: errorPokemon, isLoading: isLoadingPokemon } = useGetPokemonByNameQuery('bulbasaur');
  // const { data: dataRTKQuery, error: errorPokemonRTKQuery, isLoading: isLoadingPokemonRTKQuery } = usegetAddAllContactsQuery();
  // console.log("dataRTKQuery:", dataRTKQuery); //!
  // console.log("errorPokemonRTKQuery:", errorPokemonRTKQuery); //!
  // console.log("isLoadingPokemonRTKQuery:", isLoadingPokemonRTKQuery); //!
//----------------------------------- GET ------------------------------------------
  // const { data: contacts, isFetching: isLoading, error: error} = usegetAddAllContactsQuery();
  // const { data = [], isFetching: isLoading, error } = useGetAddAllContactsQuery(); //! +-+-+-+-
  const { data = [], isFetching: isLoading, error} = useGetAddAllContactsQuery();
  // console.log("contacts_RTK:", contacts); //!
  console.log("data:", data); //!
  console.log("isLoading_RTK:", isLoading); //!
  // const contacts = data; //! +-+-+-+-
  // const error = null;
  console.log("error_RTK:", error); //!

  // useEffect(() => {
    // const addAllСontact =  async (data) => {
      const contacts = data.map(item => {
        return {
          id: item.id,
          name: item.name,
          number: item.phone
        };
      });
      // setContacts(newIdItems);
    // };

    // addAllСontact(data);
  // }, [data]);

console.log("contacts_RTK:", contacts); //!

//--------------------------------- POST ---------------------------------------
  // const [addContact, { isError }] = usePostAddContactMutation();
  const [addContact] = usePostAddContactMutation();
  // console.log("isError:", isError); //!

  // const handleAddContact = async () => {
  //   // const addNewContact = { name, phone: number };
  //   const addNewContact1 = { name: "Polly", phone: "111-11-111" };
  //   if (addNewContact1) {
  //     await addContact(addNewContact1).unwrap()
  //   };
  // };

  // console.log("handleAddContact:", handleAddContact); //!


  //------------------------------------ DELETE --------------------------------------------
  const [ deleteContact ] = useDeleteContactMutation();
  
  // const handleDeleteContact = async (id) => {
  //     await deleteContact(id).unwrap()
  // };

  // console.log("handleDeleteContact:", handleDeleteContact); //!
//?________________________________________________

  
  
  
  //? уже не надо с RTK Query
  //! Добавление ALL Contacts с помощью axios.get-запроса 
  // useEffect(() => dispatch(itemsOperations.addAllContactsFromMmockapiIo()), [dispatch]);  //! ТАК НЕ РАБОТАЕТ!!!

  // useEffect(() => {
  //   dispatch(itemsOperations.addAllContactsFromMmockapiIo());
  // }, [dispatch]);



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
      // dispatch(itemsOperations.addOneContactToMmockapiIo(addNewContact)); //? уже не надо с RTK Query
      addContact(addNewContact).unwrap()
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
    // dispatch(itemsOperations.deleteOneContactFromMmockapiIo(contactId)); //? уже не надо с RTK Query
    deleteContact(contactId).unwrap()
  };




  //! Создание нового массива объектов из contacts с учетом значения поиска из filter
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      (contact.name.toLowerCase()).includes(normalizedFilter),
    );
  };


  // const visibleContacts = contacts; //? временно, для RTK Query
  const visibleContacts = getVisibleContacts();
  // const totalContacts = 1; //? временно, для RTK Query
  const totalContacts = contacts.length;


  //! Проверка results на пустой объект
  // if (!data) {
  //   return null;
  // };
  
// * +++++++++++++++++++++++++++ MARKUP ++++++++++++++++++++++++++++++++++
    return (
      <Container>
        <ToastContainer autoClose={1500} theme={"colored"} />

        <h1>Phonebook HW-7<span style={{ fontSize: "20px" }}> (with RTK Query)</span></h1>

        <ContactForm onSubmit={formSubmitHandler} />

        <h2>Contacts</h2>
        <p>Total: {totalContacts}</p>

      {error && (
          <div style={{ margin: '0 auto', color: 'red' }}>
            <h1>The request failed:</h1>
            <h2 style={{ textDecoration: "underline", fontStyle: 'italic', color: '#a10000' }}>!!! {error.data}</h2>
          </div>
        )}

        <Filter
          value={filter}
          onChange={changeFilter}
        />

        <br/>
        {isLoading && <Loader />}
        <br/>

        {/* //? ++++++ Временно - для проверки data with RTK Query +++++ */}
        {/* <p>Contacts with RTK Query</p>
        <ul>
          {data.map(({ id, name, phone }) => (
            <li key={id}>
              <p>{name}: {phone}</p>
            </li>
          ))}
        </ul> */}
        {/* //?________________________________________________ */}


        {totalContacts > 0 && !isLoading &&(
          <ContactList
            visibleContacts={visibleContacts}
            onDeleteTodo={deleteTodo}
          />
        )}
      </Container>
    );
  }
