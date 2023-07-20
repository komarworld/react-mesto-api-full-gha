import { useState } from "react";


function Login ({onLogin}){
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
  onLogin(formValue.email, formValue.password)
};

return (
  <div className="register">
    <p className="register__title">Вход</p>
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
        Войти
      </button>
    </form>
  </div>
);
}
export default Login;