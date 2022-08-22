import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const ProtectRoute = ({ children }) => {

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
    return <Navigate to="/login" />;
  } else if (auth === true) {
    return children;
  }
};

export default ProtectRoute;