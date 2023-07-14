class Api {
  constructor(headers) {
    this._headers = headers;
    //this._baseUrl = "http://localhost:3000";
    this._baseUrl = "https://api.syususp.nomoredomains.work";
    this.getInitialCards = this.getInitialCards.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
    this.addCard = this.addCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.likeCard = this.likeCard.bind(this);
    this.unlikeCard = this.unlikeCard.bind(this);
    this.setUserAvatar = this.setUserAvatar.bind(this);
  }

  _request(url, options) {
    return fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        return res.json();
      });
  }

  initializeApi(jwtToken) {
    const { _headers } = createApiHeaders(jwtToken);
    this._headers = _headers;
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  setUserInfo(formData) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: formData.name,
        about: formData.about,
      }),
    });
  }

  addCard(formData) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: formData.name,
        link: formData.link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  likeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  unlikeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  setUserAvatar(formData) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: formData.link,
      }),
    });
  }
}

const createApiHeaders = (tkn) => {
  return new Api({
    authorization: `Bearer ${tkn}`,
    "Content-Type": "application/json",
  });
}

const api = new Api({
  authorization: `Bearer ${localStorage.getItem('jwt')}`,
  "Content-Type": "application/json",
});

export { api };
