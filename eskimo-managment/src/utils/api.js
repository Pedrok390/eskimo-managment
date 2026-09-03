class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _getToken() {
    return localStorage.getItem("jwt");
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return res.json().then((error) => {
      return Promise.reject(
        new Error(
          error.message ||
          "Erro na requisição"
        )
      );
    });
  }

  _getJsonHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this._getToken()}`
    };
  }


  // =========================
  // AUTENTICAÇÃO
  // =========================

  signIn(email, password) {
    console.log(email, password);
    return fetch(
      `${this._baseUrl}/users/signin`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          email,
          password
        })
      }
    )
      .then((res) => this._checkResponse(res));
  }


  getCurrentUser() {
    return fetch(
      `${this._baseUrl}/users/me`,
      {
        headers: this._getJsonHeaders()
      }
    )
      .then((res) => this._checkResponse(res));
  }


  logout() {
    console.log("aaa")
    localStorage.removeItem("jwt");
  }


  // =========================
  // PRODUTOS
  // =========================

  getProducts() {
    return fetch(
      `${this._baseUrl}/products`
    )
      .then((res) => this._checkResponse(res));
  }


  getProduct(productId) {
    return fetch(
      `${this._baseUrl}/products/${productId}`
    )
      .then((res) => this._checkResponse(res));
  }


  createProduct(productData) {
    return fetch(
      `${this._baseUrl}/products`,
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${this._getToken()}`
        },

        body: productData
      }
    )
      .then((res) => this._checkResponse(res));
  }


  updateProduct(productId, productData) {
    return fetch(
      `${this._baseUrl}/products/${productId}`,
      {
        method: "PATCH",

        headers: {
          Authorization: `Bearer ${this._getToken()}`
        },

        body: productData
      }
    )
      .then((res) => this._checkResponse(res));
  }


  deleteProduct(productId) {
    return fetch(
      `${this._baseUrl}/products/${productId}`,
      {
        method: "DELETE",

        headers: this._getJsonHeaders()
      }
    )
      .then((res) => this._checkResponse(res));
  }


  updateProductAvailability(
    productId,
    available
  ) {
    return fetch(
      `${this._baseUrl}/products/${productId}/availability`,
      {
        method: "PATCH",

        headers: this._getJsonHeaders(),

        body: JSON.stringify({
          available
        })
      }
    )
      .then((res) => this._checkResponse(res));
  }


  // =========================
  // PEDIDOS
  // =========================

  getOrders() {
    return fetch(
      `${this._baseUrl}/orders`,
      {
        headers: this._getJsonHeaders()
      }
    )
      .then((res) => this._checkResponse(res));
  }


  getOrder(orderId) {
    return fetch(
      `${this._baseUrl}/orders/${orderId}`,
      {
        headers: this._getJsonHeaders()
      }
    )
      .then((res) => this._checkResponse(res));
  }


  updateOrderStatus(orderId, status) {
    return fetch(
      `${this._baseUrl}/orders/${orderId}/status`,
      {
        method: "PATCH",

        headers: this._getJsonHeaders(),

        body: JSON.stringify({
          status
        })
      }
    )
      .then((res) => this._checkResponse(res));
  }


  cancelOrder(orderId) {
    return fetch(
      `${this._baseUrl}/orders/${orderId}/cancel`,
      {
        method: "PATCH",

        headers: this._getJsonHeaders()
      }
    )
      .then((res) => this._checkResponse(res));
  }

  getEmployees(){
    return fetch(`${this._baseUrl}/users/employees`,{
      headers: this._getJsonHeaders()
    })
    .then((res) => this._checkResponse(res))
  }
}


const api = new Api({
  baseUrl:
    import.meta.env.VITE_API_URL ||
    "http://localhost:3000"
});


export default api;