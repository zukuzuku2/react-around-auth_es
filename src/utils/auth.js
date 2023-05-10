export const BASE_URL = "https://register.nomoreparties.co";

export const signup = ({ email, password }) => {
  console.log(`${BASE_URL}/signup`);
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }
      return data.error;
    });
};

export const signin = ({ email, password }) => {
  console.log(`Me ejecuto`);
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => {
      res.json();
      console.log(`Llego`);
    })
    .then((data) => {
      debugger;
      if (data.error) {
        throw new Error(data.error);
      } else {
        localStorage.setItem("token", data.token);
        console.log(data);
        return data;
      }
    })
    .catch((err) => console.log(err));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())

    .then((data) => data)
    .catch((err) => console.log(err));
};
