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
      console.log(data);
    });
};

export const signin = ({ email, password }) => {
  // console.log(email, password);
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return;
      }
    })
    .catch((err) => console.log(err));
};

export const userMe = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  })
    .then((res) => {
      try {
        if (res.status === 200) {
          return res.json();
        }
      } catch (e) {
        return e;
      }
    })
    .catch((err) => console.log(err));
};
