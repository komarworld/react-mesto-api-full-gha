import { useState } from "react";
import { Link } from "react-router-dom";

function Register({onRegistartion}){
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

const handleChange =(e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
}
const handleSubmit = (e) => {
  e.preventDefault();
  onRegistartion(formValue.email, formValue.password)
};

return (
  <div className="register">
    <p className="register__title">Регистрация</p>
    <form className="register__form" onSubmit={handleSubmit}>
        <input
          id="email"
          type="email"
          name="email"
          value={formValue.email || ""}
          onChange={handleChange}
          placeholder="Email"
          className="register__input"
          minLength="2"
          maxLength="40"
          required=""
        />
        <input
          id="password"
          type="password"
          name="password"
          value={formValue.password || ""}
          onChange={handleChange}
          placeholder="Пароль"
          className="register__input"
          minLength="6"
          maxLength="40"
          required=""
        />
      <button className="register__btn" type="submit"> 
        Зарегистрироваться
      </button>
    </form>
    <div className="register__signin">
      <p className="register__signin-text">Уже зарегистрированы? </p>
      <Link to="/signin" className="register__signin-link">
         Войти
      </Link>
    </div>
  </div>
);
}
export default Register;