import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser, buttonText}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext)

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser,isOpen]); 

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm
          name="profile"
          title="Редактировать&nbsp;профиль"
          isOpen={isOpen}
          onClose={onClose}
          buttonText={buttonText}
          onSubmit={handleSubmit}
        >
          <input 
              id="form-name"
              className="popup__input popup__input_name"
              type="text"
              placeholder="Имя"
              name="name"
              minLength="2"
              maxLength="40"
              required
              value= {name || ""}
              onChange={handleNameChange}
              />
            <span className="popup__input-error form-name-error" ></span>
          <input 
              id="form-job"
              className="popup__input popup__input_job"
              type="text"
              placeholder="Род деятельности"
              name="about" 
              minLength="2"
              maxLength="40"
              required
              value= {description || ""}
              onChange={handleDescriptionChange}
              />
            <span className="popup__input-error form-job-error" ></span> 
        </PopupWithForm>
  )
}

export default EditProfilePopup;