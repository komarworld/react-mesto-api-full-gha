import tooltip_success from '../images/tooltip_success.png'
import tooltip_error from '../images/tooltip_error.png'

function InfoTooltip ({isOpen,isRegister, onClose}){
  return (
  <div className={`popup popup_tooltip ${isOpen ? "popup_opened" : ""}`}>
      <div className="tooltip__container">
          <button className="popup__close-btn" type="button" aria-label="Закрыть" onClick={onClose}></button>
          <img className="tooltip__image" 
          src= {isRegister ? tooltip_success : tooltip_error  }
          alt={isRegister ? 'Успешно' : 'Ошибка'}
          />
          <p className="tooltip__text">
              {isRegister ?'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Пропробуйте ещё раз'}
          </p>
      </div>
    </div>
  )
}

export default InfoTooltip