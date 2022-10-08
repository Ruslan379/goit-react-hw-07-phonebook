import React from 'react';
import PropTypes from 'prop-types';

import { useDeleteContactMutation } from 'redux/items/itemsSliceRTKQuery';

import { Spinner } from 'components/Spinner/Spinner'; 

import css from 'components/ContactListItem/ContactListItem.module.css' 



export const ContactListItem = ({ id, name, number }) => {

  const [ deleteContact, { isLoading: isDeleting  } ] = useDeleteContactMutation();

  return (
        <li
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
            onClick={() => deleteContact(id)}
            disabled={isDeleting}
          >
            {isDeleting ? [<Spinner size= "18"/>, " Deleting..."] : "Delete"}
          </button>
        </li>
  );
};


ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  // id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};


