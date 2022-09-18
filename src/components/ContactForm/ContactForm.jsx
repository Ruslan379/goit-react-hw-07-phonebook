import { useState } from 'react';
import PropTypes from 'prop-types';

import { nanoid } from 'nanoid';

import css from 'components/ContactForm/ContactForm.module.css' 





export const ContactForm = ({ onSubmit }) => {
  //! useState ===> name (аналог this.state.name)
  const [name, setName] = useState('');
  //! useState ===> phone (аналог this.state.phone)
  const [phone, setPhone] = useState('');


  const contactInputId = nanoid();
  

// * +++++++++++++++++++++++++++ МЕТОДЫ ++++++++++++++++++++++++++++++++++
   //! Ввод значений в поля инпутов
  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'phone':
        setPhone(value);
        break;

      default:
        return;
    }
  };



  //! Очистка полей ФОРМЫ
    const reset = () => {
      setName('');
      setPhone('');
  };



  //! NEW - Submit ФОРМЫ
  const handleSubmit = event => {
    event.preventDefault();
    //! Передача значений State (name, phone) в App
      //* Здесь, вероятно, можно сделать ==> dispatch(addContact({id: nanoid(), name, phone}));
      //* вместо ==> onSubmit(name, phone);
    onSubmit(name, phone);
    reset(); 
  };



// * +++++++++++++++++++++++++++ MARKUP ++++++++++++++++++++++++++++++++++
    return (
      <form
        className={css.Form}
        onSubmit={handleSubmit}
      >

        <label
          className={css.FormLabel}
          htmlFor={contactInputId}
        >
            Name
            <br />
            <input
              className={css.FormInput}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={handleChange}
              id={contactInputId}
            />
          </label>
          <br />

        <label
          className={css.FormLabel}
          htmlFor={contactInputId}
        >
            Phone
            <br />
            <input
              className={css.FormInput}
              type="tel"
              name="phone"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={phone}
              onChange={handleChange}
              id={contactInputId}
            />
          </label>
          <br />

        <button
          className={css.FormBtn}
          type="submit">
            Add contact
          </button>
        </form>
    );
  } 


  
ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};