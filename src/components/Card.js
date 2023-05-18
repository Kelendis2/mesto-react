import React from 'react';

function Card ({card,onOpenImage}){

  function handleClick() {
    onOpenImage(card);
  }
  return(
        <li className="element__item">
          <img className="element__photo"
           src={card.link}
           alt={card.name}
           onClick={handleClick}/>
          <button className="element__trash" type="button"></button>
          <div className="element__photo-info">
             <h2 className="element__title">{card.name}</h2>
             <div className="element__like-wrapper">
              <button className="element__like" type ="button" id ="likes" name="likes" ></button>
             <span className="element__like-quantity"></span>
             </div>
          </div>
        </li>
  )
}

export default Card
