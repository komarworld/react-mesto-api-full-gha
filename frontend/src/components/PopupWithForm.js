
function PopupWithForm ({
  name,
  title,
  buttonText,
  children,
  isOpen,
  onClose,
  onSubmit
})  {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
          <button className="popup__close-btn" type="button" aria-label="Закрыть" onClick={onClose}></button>
          <h2 className="popup__heading">{title}</h2>
          <form className={`popup__form popup__form_type_${name}`} name ={`form-${name}`} onSubmit={onSubmit}>
              {children}
              <button className="button popup__submit-btn" type="submit">{buttonText}</button>
          </form>
      </div>
    </div>
)
}

export default PopupWithForm 