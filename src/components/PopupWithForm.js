
import React from 'react';


function PopupWithForm (props ){
  const popupClass = `popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`;
  return (

    <div className= {popupClass} >
      <div className={`popup__container popup__container_type_${props.name}`}>
        <button className= {`popup__close-button popup__close-button_place_${props.name}`} onClick={props.onClose} type="button" ></button>
        <form className= {`form form_type_${props.name}`} name= {props.name}  onSubmit={props.onSubmit}  noValidate>
          <h2 className="form__title">{props.title}</h2>
          {props.children}
          <button className="form__button-save" type="submit" value={props.buttonText}> {props.buttonText}</button>
        </form>
      </div>
      </div>
      )
      }



export default PopupWithForm;
