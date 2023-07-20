class Api {
  constructor({ url, headers }) {
    this._url = url;
  }
 
  //проверим  ошибки
  _checkResponseStatus(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
 
  //инфо пользователя с сервера
  getUserInfo() {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/users/me`, {
    method: "GET",
    headers: {
      "authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    }).then((res) => this._checkResponseStatus(res))
  };
 
  //обновляем данные пользователя
  editProfile({ name, about }) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about
      }),
    }).then((res) => this._checkResponseStatus(res));
  }
 
  //получение карточек по умолчанию
  getInitialCards() {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResponseStatus(res));
  }
 
  editProfileAvatar({ avatar }) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this._checkResponseStatus(res));
  }
 
 
  //добавление новой карточки
  addNewCard({name, link}) {
    const token = localStorage.getItem('token');
    console.log('addnewcard')
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link
      }),
    }).then((res) => this._checkResponseStatus(res));
  }
 
  //удаление карточки
  deleteCard(cardId) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResponseStatus(res))
    
  }
 
  addLike(cardId) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResponseStatus(res))
    .then((data) => {
      return data.likes; 
    });
  }
 
  deleteLike(cardId) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResponseStatus(res))
    .then((data) => {
      return data.likes; 
    });
  }

  changeLikeCardStatus(id, isLiked) {
    const token = localStorage.getItem('token');
    if (isLiked) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: 'PUT',
        headers: {
          "authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(res => this._checkResponseStatus(res));
    } else {
        return fetch(`${this._url}/cards/${id}/likes`, {
          method: 'DELETE',
          headers: {
            "authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }).then(res => this._checkResponseStatus(res));
    }
  }
}
 
const api = new Api({
  url: `http://localhost:4000`,
  headers: {
    authorization: "95e95c6c-51d6-4d7a-ab8a-1eae75c75183",
    "Content-Type": "application/json",
  },
});

export default api