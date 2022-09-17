import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4040';


export async function fetchAuthors() {
  const { data } = await axios.get(`/authors?_embed=books`);
  return data;
}

export async function fetchBooks() {
  const { data } = await axios.get(`/books`);
  return data;
}

export async function fetchBookById(bookId) {
  const { data } = await axios.get(`/books/${bookId}?_expand=author`);
  return data;
}


//! ++++++++++++++++++
// const BASE_URL = 'http://localhost:4040';

// function fetchBooks1() {
//   return fetch(`${BASE_URL}/contacts`)
//     .then(res => res.json())
//   .then(console.log); //!
// }

// const fetchContacts = fetchBooks1()
// console.log(fetchContacts); //!
//! ++++++++++++++++++


//!  'http://localhost:4040/contacts.items'
// export async function fetchItems() {
//   const { data } = await axios.get(`/contacts`);
//   return data.items;
// };


//!  'http://localhost:4040/items'
export async function fetchItems() {
  const { data } = await axios.get(`/items`);
  return data;
}