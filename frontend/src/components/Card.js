import React from 'react'
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete }) {

    // Передаём контекст
  const currentUser = React.useContext(CurrentUserContext);
   // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner   === currentUser._id;
   // Определяем, есть лайк currentUser
  const isLiked = card.likes.some((id) => id === currentUser._id);
   // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = ( 
  `cards__item-like ${isLiked && 'cards__item-like_active'}` 
  );

  function handleCardClick() {  
   onCardClick(card);
  }
  function handleLikeClick () {
    onCardLike(card)
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
      <li className="cards__item">
        {isOwn && (<button className="cards__item-delete" type="button" onClick={handleDeleteClick} />)} 
          <img className="cards__item-image" src={card.link} alt={card.name} onClick={handleCardClick} />
          <div className="cards__item-info">
            <h2 className="cards__item-caption">{card.name}</h2>
            <div className="cards__item-likes">
              <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
              <p className="cards__item-like-sum">{card.likes.length}</p>
            </div>
          </div>
      </li>
  )
}

export default Card