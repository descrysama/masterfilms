import './index.css';
import 'animate.css';
import Home from './routes/Home';
import MovieDetail from './routes/MovieDetail';
import { useEffect, useState } from 'react';
import * as AuthChecker from './middleware/authChecker'
import Login from './routes/auth/Login';
import Register from './routes/auth/Register';
import Mylist from './routes/board/Mylist';
import { useCookies } from 'react-cookie';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectLogin from './middleware/ProtectLogin';
import ProtectRoute from './middleware/ProtectRoute';


function App() {

  const [auth, setAuth] = useState(false)
  const token = useCookies(["jwt"]);

  useEffect(() => {
    AuthChecker.AuthChecker(token).then(res => setAuth(res.data.status))
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home auth={auth}/>} />
        <Route path="/login" element={<ProtectLogin><Login/></ProtectLogin>} />
        <Route path="/register" element={<ProtectLogin><Register/></ProtectLogin>} />
        <Route path="/movie/:id" element={<MovieDetail/>} />
        <Route path="/mylist" element={<ProtectRoute><Mylist/></ProtectRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
