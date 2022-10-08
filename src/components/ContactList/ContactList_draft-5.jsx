import React from 'react';
import PropTypes from 'prop-types';

import { useDeleteContactMutation } from 'redux/items/itemsSliceRTKQuery';

import { Spinner } from 'components/Spinner/Spinner'; 

import css from 'components/ContactList/ContactList.module.css' 



export const ContactList = ({ visibleContacts }) => {

  const [ deleteContact, { isLoading: isDeleting  } ] = useDeleteContactMutation();


  return (
    <ul className={css.ContactList}>
      {visibleContacts.map(({ id, name, number }) => (
        <li
          key={id}
          className={css.ContactListItem}
        >
          <p
            className={css.ContactListText}>{name}:
            <span
              className={css.ContactListNumber}
            > {number}
            </span>
          </p>
          <button
            type="button"
            className={css.ContactListBtn}
            // onClick={() => onDeleteTodo(id)} //? уже не надо с RTK Query
            onClick={() => deleteContact(id)}
            disabled={isDeleting}
          >
            {/* {isDeleting ? "Deleting..." : "Delete"} */}
            {isDeleting ? [<Spinner size= "18"/>, " Deleting..."] : "Delete"}
          </button>
        </li>
      ))}
    </ul>
  );
};


ContactList.propTypes = {
  visibleContacts: PropTypes.array.isRequired,
  // onDeleteTodo: PropTypes.func.isRequired, //? уже не надо с RTK Query
};


