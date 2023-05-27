import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({isOpen,onClose}){
  const currentUser = React.useContext(CurrentUserContext);
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    setValue({
      name: currentUser.name,
      about: currentUser.about,
    });
  }, [currentUser]);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return(
    <PopupWithForm
        name = "profile"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isOpen}
        onClose ={onClose}
         >
          <label className="form__field">
          <input className="form__input form__input_type_name"
            type="text"
            name="name"
            placeholder="Имя"
            id="Username"
            minLength="2"
            maxLength="40"
            required
            value={value.name}
            onChange={handleChange} />
          <span className="form__input-error" id="Username-error"> </span>
          </label>

          <label className="form__field">
          <input className="form__input form__input_type_about"
              type="text"
              placeholder="Описание профиля"
              name="about" id="about"
              minLength="2"
              maxLength="200"
              required
              value={value.about}
              onChange={handleChange}/>
          <span className="form__input-error" id="about-error"> </span>
          </label>

          </PopupWithForm>
  )

}
