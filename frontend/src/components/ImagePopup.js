import React from "react";

function ImagePopup ({card, onClose}){
    return (
    <div className={`popup popup_image ${card ? "popup_opened" : " "}`}>
      <div className="popup__container-image">
        <button 
            className="popup__close-btn"
            type="button" aria-label="Закрыть"
            onClick= {onClose}
            ></button>
        <img
            className="popup__pic"
            src={card ? card.link : ' '}
            alt={card ? card.name : ' '}
          />
        <h2 className="popup__pic-caption">{card ? card.name : ' '}</h2>
      </div>
    </div>
    )
}

export default ImagePopup;