import React from 'react';
import Card from './Card.js'



function Main (props){

  return(
<main className="content">
  <section className="profile">
   <button className="profile__button-avatar" type="button" onClick={props.onEditAvatar}>
     <img className="profile__avatar" alt="фото пользователя" src= {props.userInfo.avatar}  />
   </button>
     <div className="profile__info">
        <h1 className="profile__info-title">{props.userInfo.name}</h1>
        <button className="profile__edit-button" type ="button" onClick={props.onEditProfile} ></button>
        <p className="profile__info-subtitle">{props.userInfo.about}</p>
     </div>
     <button className="profile__add-button" type ="button" onClick={props.onAddPlace}></button>
  </section>

  <section className="elements">
     <ul className="element">
      {props.cards.map((card)=>{
        return <Card
        card = {card}
        key = {card._id}
        />
})}

     </ul>
  </section>
</main>)
}

export default Main
