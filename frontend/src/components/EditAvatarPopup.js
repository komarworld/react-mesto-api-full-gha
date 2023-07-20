import React from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, buttonText}) {

  const avatarInput = React.useRef()

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarInput.current.value
    });
  } 

  React.useEffect(() => {
    avatarInput.current.value = '';
  }, [isOpen])

  return (
    <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        buttonText={buttonText}
    >
      
        <input
          id= "form-ava"
          className="popup__input popup__input_ava"
          type="url"
          placeholder="Ссылка на аватар"
          name="avatar"
          ref ={avatarInput}
          required
        />
        <span className="popup__input-error form-ava-error" ></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup