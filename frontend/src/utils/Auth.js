class Auth {
  constructor({baseUrl, headers}) {
    this._url = baseUrl;
    this._headers = headers;
  } 

  //проверим  ошибки
  _checkResponseResult(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  //регистрация
  register(email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email,
      })
    })
      .then(res => {
        return this._checkResponseResult(res)
      })
  }
  //авторизация
  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email,
      })
    })
      .then(res => {
        return this._checkResponseResult(res)
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          console.log(data)
          return data;
        }
      })
      .catch((err) => console.log(err));  
  }
  //проверяем токин
  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        return this._checkResponseResult(res)
      })
  }
}

const auth = new Auth({
  baseUrl: 'https://api.bella.nomoredomains.xyz',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default auth;