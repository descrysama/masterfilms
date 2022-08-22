import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const ProtectLogin = ({children}) => {

  const [auth, setAuth] = useState();
  const token = useCookies(["jwt"]);
  const myRequest = async () => {
    if (token) {
      await axios({
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*", 
        },
        withCredentials: true,
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/checktoken`,
      }).then((response) => {
        setAuth(response.data.status)
      });
    } 
  };
  
  useEffect(() => {
    myRequest();
  });

  if (auth === false) {
    return children;
  } else if (auth === true) {
    return <Navigate to="/" />;
  }
};

export default ProtectLogin;