import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditAvatarPopup({isOpen,onClose}){
  return(
    <PopupWithForm
    name = "avatar"
    title="Изменить аватар"
    buttonText="Сохранить"
    isOpen={isOpen}
    onClose ={onClose}
     >
      <label className="form__field">
          <input className="form__input form__input_type_avatar" type="url" placeholder="Ссылка на картинку" name="avatar" id="avatar" required />
          <span className="form__input-error" id="avatar-error"> </span>
        </label>

      </PopupWithForm>
  )
}
