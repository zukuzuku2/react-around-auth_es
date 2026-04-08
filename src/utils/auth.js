export const BASE_URL = "https://register.nomoreparties.co";

let _token = null;

export const saveToken = (token) => { _token = token; };
export const getToken = () => _token;
export const removeToken = () => { _token = null; };

function checkResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export const signup = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    });
};

export const signin = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        saveToken(data.token);
        return data;
      } else {
        throw new Error(data.error || "Error al iniciar sesión");
      }
    });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
