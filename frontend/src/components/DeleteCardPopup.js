import PopupWithForm from "./PopupWithForm";
import React from 'react';

function DeleteCardPopup({ isOpen, onClose, onDeleteCard, buttonText}) {

  function handleDeleteSubmit(e) {
    e.preventDefault();
    onDeleteCard();
  } 
  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      buttonText={buttonText}
      onSubmit ={handleDeleteSubmit}
      isOpen= {isOpen}
      onClose={onClose}
    >
    </PopupWithForm> 
  )
}

export default DeleteCardPopup