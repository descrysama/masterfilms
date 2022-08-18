import axios from "axios";

export const Register = async (name, lastname, email, password) => {
  let response = await axios({
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/register`,
    data: {
      name: name,
      lastname: lastname,
      email: email,
      password: password,
    },
  });

  return response;
};

export const Login = async (email, password) => {
  let response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/login`,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
    credentials: 'include',
    mode: 'cors',
    data: {
      email: email,
      password: password,
    },
  });

  return response;
};