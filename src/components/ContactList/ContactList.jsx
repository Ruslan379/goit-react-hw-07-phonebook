import React from 'react';
import PropTypes from 'prop-types';

import { ContactListItem } from 'components/ContactListItem/ContactListItem.jsx';

import css from 'components/ContactList/ContactList.module.css' 



export const ContactList = ({ visibleContacts }) => {

  return (
    <ul className={css.ContactList}>
      {visibleContacts.map(({ id, name, number }) => (
        <ContactListItem 
          key={id}
          // key={Number(id)}
          id={id}
          // id={Number(id)}
          name={name}
          number={number}
        />
      ))}
    </ul>
  );
};


ContactList.propTypes = {
  visibleContacts: PropTypes.array.isRequired,
};


