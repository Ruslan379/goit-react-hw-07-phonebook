import axios from 'axios';

//? +++++++++++ with RTK Qury +++++++++++++++
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//?________________________________________________




axios.defaults.baseURL = 'https://6326c1ee70c3fa390f9bc51d.mockapi.io';

//!  'https://6326c1ee70c3fa390f9bc51d.mockapi.io/contacts'
export async function axiosGetAddAllContacts() {
  const { data } = await axios.get(`/contacts`);
  return data;
};

export async function axiosPostAddContact(contact) {
  const { data } = await axios.post('/contacts', contact);
  return data;
};

export async function axiosDeleteContact(id) {
  const { data } = await axios.delete(`/contacts/${id}`);
  return data;
};
//!____________________________________________________________


//? +++++++++++ with RTK Query +++++++++++++++
export const itemsAPIbyRTKQuery = createApi({
  reducerPath: 'items ',
  tagTypes: ["Contacts"],

  baseQuery: fetchBaseQuery({ baseUrl: 'https://6326c1ee70c3fa390f9bc51d.mockapi.io' }),

  endpoints: (builder) => ({
    getAddAllContacts: builder.query({
      // query: (name) => `/contacts/${name}`,
      query: () => `/contacts`,
      // providesTags: ["Contacts"],
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Contacts', id })),
            { type: 'Contacts', id: 'LIST' },
          ]
          : [{ type: 'Contacts', id: 'LIST' }],
    }),

    postAddContact: builder.mutation({
      query: (body) => ({
        url: "/contacts",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["Contacts"],
      invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
    }),

    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      // invalidatesTags: ["Contacts"],
      invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
    }),
  }),
})

export const { useGetAddAllContactsQuery, usePostAddContactMutation, useDeleteContactMutation } = itemsAPIbyRTKQuery;

//?________________________________________________


//todo ------------------  РЕПЕТА ------------------
// axios.defaults.baseURL = 'http://localhost:4040'; //! OLD

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
//todo __________________ РЕПЕТА __________________