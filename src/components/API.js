export default class Api {
  constructor({baseUrl, headers}) {
    this._badeURl = baseUrl;
    this._headers = headers;
  }

  _requestUrl(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }
  
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getUserInfo() {
    return this._requestUrl(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
  }

  patchUserInfo({ name, job }) {
    return this._requestUrl(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        job: job
      })
    });
    
  }
  
  patchUserAvatar({ avatar }) {
    return this._requestUrl(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar
      })
    });
    
  }
  
  getInitialCards() {
    return this._requestUrl(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers
    });
    
  }
  
  addNewCard(data) {
    return this._requestUrl(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
  }
  
  deleteCard(cardId) {
    return this._requestUrl(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers
    });
  }
  
  addLike(cardId) {
    return this._requestUrl(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers
    });
  }
  
  deleteLike(cardId) {
    return this._requestUrl(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers
    });
  }
}
