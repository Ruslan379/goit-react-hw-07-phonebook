import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'




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
      query: (contacts) => ({
        url: "/contacts",
        method: "POST",
        body: contacts,
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
