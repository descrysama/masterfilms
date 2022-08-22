import axios from 'axios';

export const AuthChecker = async(token) => {
    if (token) {
      let response = await axios({
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/checktoken`
      })
      return response
    }
}

