import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function AddPlacePopup({isOpen,onClose}){
return(
  <PopupWithForm
  name = "content"
  title="Новое место"
  buttonText="Сохранить"
  isOpen={isOpen}
  onClose ={onClose}
   >
    <label className="form__field">
        <input className="form__input form__input_type_title" type="text" name="name" placeholder="Название" id="name" minLength="2" maxLength="30" required />
        <span className="form__input-error" id="name-error"> </span>
      </label>
      <label className="form__field">
        <input className="form__input form__input_type_link" type="url" placeholder="Ссылка на картинку" name="link" id="link" required />
        <span className="form__input-error" id="link-error"> </span>
      </label>
   </PopupWithForm>
)


}
