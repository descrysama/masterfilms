import './index.css';
import 'animate.css';
import Home from './routes/Home';
import MovieDetail from './routes/MovieDetail';
import Login from './routes/auth/Login';
import Register from './routes/auth/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/movie/:id" element={<MovieDetail/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
