import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup ({isOpen, onClose, onAddPlace, buttonText}) {
  const [cardName, setСardName] = React.useState('')
  const [cardLink, setСardLink] = React.useState('')

  React.useEffect(() => {
    setСardName("");
    setСardLink("");
  }, [isOpen]);

  function handleNameChange (evt) {
    setСardName(evt.target.value)
  }
  function handleLinkChange (evt) {
    setСardLink(evt.target.value)
  }
    function handleSubmit(e){
    e.preventDefault();
    onAddPlace(
      {name: cardName,
       link: cardLink,
      });
  }
  
  return (
    <PopupWithForm
          name="card"
          title="Новое&nbsp;место"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          buttonText={buttonText}
        >
          <input
              id="form-title"
              className="popup__input popup__input_title"
              type="text" placeholder="Название"
              name="form-title"
              minLength="2"
              maxLength="30"
              value={cardName || ''}
              onChange={handleNameChange}
              required/>
            <span className="popup__input-error form-title-error" ></span>
          <input
              id= "form-link"
              className="popup__input popup__input_link"
              type="url"
              placeholder="Ссылка на картинку"
              name="form-link"
              value={cardLink || ''}
              onChange={handleLinkChange}
              required/>
            <span className="popup__input-error form-link-error" ></span>
        </PopupWithForm>
  )
}

export default AddPlacePopup