import React from 'react';
import Card from './Card'
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main ({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete
}) {

const currentUser = React.useContext(CurrentUserContext)

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-wrap" onClick={onEditAvatar}>
              <img className="profile__avatar" src={currentUser.avatar} alt="Аватарка" />
        </div>
        <div className="profile__info">
          <div className="profile__info-container">
            <h1 className="profile__info-title">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
          </div>
          <p className="profile__info-subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
      </section>

      <section className="cards" aria-label="Секция с картинками">
        <ul className="cards__list">
        {cards.map((card) => (
          <Card 
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike= {onCardLike}
            onCardDelete= {onCardDelete}
          />
        ))}
        </ul>
      </section>
    </main> 
  )
}

export default Main 