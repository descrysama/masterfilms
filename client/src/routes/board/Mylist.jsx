import React from 'react'
import Navbar from '../../components/Navbar'
import Spinner from '../../assets/content/spinloader.gif'
import * as MovieService from '../../services/MovieService'
import {AiFillEye, AiFillEyeInvisible, AiFillHeart} from 'react-icons/ai'
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from 'react-icons/bs'
import { useState } from 'react'
import { useEffect } from 'react'

const Mylist = () => {

  const [Movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('');
  const [query2, setQuery2] = useState('');
  const [page, setPage] = useState(1)

  useEffect(() => {
    handleSearch(query)
  }, [page, query])

  const handleSearch = (searchParam) => {
    setQuery(searchParam)
    setLoading(true)
    MovieService.queryFetch(query, page).then(res => {
      setMovies(res.data.results)
      setLoading(false)
    })
  }

  return (
    <>
      <Navbar/>
      <div className='mx-auto md:max-w-[1400px] w-full h-auto flex flex-col justify-center items-center md:p-4'>
            <div className='md:w-1/2 w-[90%] h-[20%] md:flex md:justify-center md:items-center md:flex-col flex flex-col justify-center items-center text-white p-2'>
              <h2 className='text-black text-4xl font-semibold'>Vos Films</h2>
              <div className='flex m-2'>
                <button onClick={() => setPage(page - 1)} className='p-3 flex items-center justify-center bg-[#27a193] rounded hover:bg-[#1e746a] ease-in-out duration-300 mr-1 text-white'><AiFillEye size={18}/>Visionnés</button>
                <button onClick={() => setPage(page - 1)} className='p-3 flex items-center justify-center bg-[#b92727] rounded hover:bg-[#961c1c] ease-in-out duration-300 text-white'><AiFillEyeInvisible size={18}/>Pas Visionnés</button>
              </div>
            </div>
            <div className='flex flex-wrap justify-center animate__animated animate__fadeIn'>
              {loading === true?
              <img src={Spinner} alt="spinner loading" />
              :
              Movies.map((movie, key) => (
                <div key={key} className='max-w-sm rounded overflow-hidden m-3 flex flex-col justify-center items-center animate__animated animate__fadeIn'>
                  <a href={"movie/" + movie.id}><img src={movie.poster_path == null ? 'https://via.placeholder.com/300x450' : `https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt="Sunset in the mountains" className=' ease-in-out duration-300 bg-[#b81e13] cursor-pointer '/></a>
                  <div className='w-full'>
                  <div className={`h-[25px] mt-2 text-center text-gray-800 text-shad ${movie.vote_average*10 >= 0 && movie.vote_average*10 <= 20 ? "bg-[#b81e13] shadow-md shadow-[#b81e13]" : null} ${movie.vote_average*10 >= 20 && movie.vote_average*10 < 40 ? "bg-[#c46619] shadow-md shadow-[#c46619]" : null} ${movie.vote_average*10 >= 40 && movie.vote_average*10 < 60 ? "bg-[#96c419] shadow-md shadow-[#96c419]" : null} ${movie.vote_average*10 >= 60 && movie.vote_average*10 < 80 ? "bg-[#2dc419] shadow-md shadow-[#2dc419]" : null} ${movie.vote_average*10 >= 80 && movie.vote_average*10 <= 100 ? "bg-[#0fdf0f] shadow-md shadow-[#0fdf0f]" : null}`} style={{width: `${movie.vote_average*10}%`}}>{movie.vote_average*10}%</div>
                    <p className='mt-1 font-bold'>{movie.original_title}</p>
                    <p className='mt-1'>{movie.release_date}</p>
                  </div>
                </div>
              ))}
            </div>
      </div>
    </>
  )
}

export default Mylist