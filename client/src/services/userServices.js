import axios from "axios";

export const Register = async (username, email, password) => {
  let response = await axios({
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/register`,
    data: {
      username: username,
      email: email,
      password: password,
    },
  });

  return response;
};

export const Login = async (email, password) => {
  let response = await axios({
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": process.env.REACT_APP_API_URL,
    },
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/login`,
    withCredentials: true,
    credentials: 'include',
    cors: true,
    data: {
      email: email,
      password: password,
    },
  });

  return response;
};

export const getUsers = async() => {
  let response = await axios({
    headers: {
      "Content-Type":"application/json"
    },
    url: `${process.env.REACT_APP_API_URL}/getusers`,
    withCredentials: true
  })

  return response;
}