import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom'
import Spinner from '../../assets/content/spinloader.gif'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import {BsArrowReturnLeft} from 'react-icons/bs'
import * as UserService from '../../services/userServices'
import * as MovieService from '../../services/MovieService'
import Navbar from '../../components/Navbar';

const UserDetail = () => {

  const location = useLocation();
  const url = location.pathname.split("/")[2];
  const id = url.split("-")[0]

  const [username, setUsername] = useState('');
  const [movies, setMovies] = useState([]);
  const [seenMovies, setSeenMovies] = useState([]);
  const [unseenMovies, setUnseenMovies] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    MovieService.getUserFilm(id).then(res => {
      setUsername(res.data.username)
      setMovies(res.data.movies)
      setSeenMovies(res.data.movies.filter(film => film.status === true))
      setUnseenMovies(res.data.movies.filter(film => film.status === false))
      setLoading(false)
    })
  }, [])
  
  const filterFilms = (filter) => {
    switch(filter) {
      case true:
        setMovies(seenMovies)
        break;
      case false:
        setMovies(unseenMovies)
        break;
    }
  }

  return (
    <>
      <Navbar/>
      <div className="mx-auto md:max-w-[1400px] w-full h-auto flex flex-col justify-center items-center md:p-4 animate__animated animate__fadeIn">
        <div className='w-full h-full text-center m-2 justify-center items-center flex flex-col'>
          <p className='text-3xl'>{username.toUpperCase()}</p>
          <div className='flex m-2 w-full justify-center'>
            <button onClick={() => filterFilms(true)} className='p-3 flex items-center justify-center bg-[#27a193] rounded hover:bg-[#1e746a] ease-in-out duration-300 mr-1 text-white'><AiFillEye size={18}/>Visionnés</button>
            <button onClick={() => filterFilms(false)} className='p-3 flex items-center justify-center bg-[#b92727] rounded hover:bg-[#961c1c] ease-in-out duration-300 mr-1 text-white'><AiFillEyeInvisible size={18}/>A voir</button>
          </div>
          <Link to="/users" className='p-3 flex items-center justify-center w-1/3 bg-[#27a193] rounded hover:bg-[#1e746a] ease-in-out duration-300 mr-1 text-white'><BsArrowReturnLeft size={18}/> Retour</Link>
          <div className='flex flex-wrap justify-center animate__animated animate__fadeIn'>
              {loading === true?
              <img src={Spinner} alt="spinner loading" />
              :
              movies.length >= 1 ?
              movies.map((movie, key) => (
                <div key={key} className='max-w-sm rounded overflow-hidden m-3 flex flex-col justify-center items-center animate__animated animate__fadeIn'>
                  <a href={"movie/" + movie.id}><img src={movie.poster_path == null ? 'https://via.placeholder.com/300x450' : `https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.original_title + 'image'} className='ease-in-out duration-300 bg-[#b81e13] cursor-pointer'/></a>
                  <div className='w-full'>
                  <div className={`h-[25px] mt-2 text-center text-gray-800 text-shad ${movie.vote_average*10 >= 0 && movie.vote_average*10 <= 20 ? "bg-[#b81e13] shadow-md shadow-[#b81e13]" : null} ${movie.vote_average*10 >= 20 && movie.vote_average*10 < 40 ? "bg-[#c46619] shadow-md shadow-[#c46619]" : null} ${movie.vote_average*10 >= 40 && movie.vote_average*10 < 60 ? "bg-[#96c419] shadow-md shadow-[#96c419]" : null} ${movie.vote_average*10 >= 60 && movie.vote_average*10 < 80 ? "bg-[#2dc419] shadow-md shadow-[#2dc419]" : null} ${movie.vote_average*10 >= 80 && movie.vote_average*10 <= 100 ? "bg-[#0fdf0f] shadow-md shadow-[#0fdf0f]" : null}`} style={{width: `${movie.vote_average*10}%`}}>{movie.vote_average*10}%</div>
                    <p className='mt-1 font-bold'>{movie.original_title}</p>
                    <p className='mt-1'>{movie.release_date}</p>
                  </div>
                </div>
              )):
              <p className='m-2 text-xl'>L'utilisateur n'a encore enregistré aucun film. Demandez lui d'en ajouter pour faire votre choix</p>}
            </div>
        </div>
      </div>
    </>
  )
}

export default UserDetail