import React from 'react'
import Navbar from '../components/Navbar'
import Spinner from '../assets/content/spinloader.gif'
import * as MovieService from '../services/MovieService'
import {AiOutlineSearch} from 'react-icons/ai'
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from 'react-icons/bs'
import { useState } from 'react'
import { useEffect } from 'react'

const Home = () => {

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

  // const handleSearch = () => {
  //   MovieService.queryFetch(query, page).then(res => {
  //     setQuery2(query)
  //     setLoading(true)
  //     console.log([])
  //     setMovies(res.data.results)
  //     console.log(Movies)
  //     setLoading(false)
  //   })
  // }


  return (
    <>
      <Navbar/>
      <div className='mx-auto md:max-w-[1400px] w-full h-auto flex flex-col justify-center items-center md:p-4'>
            <div className='md:w-1/2 w-[90%] h-[20%] md:flex md:justify-center md:items-center md:flex-row flex flex-col justify-center items-center text-white p-2'>
              <input className="shadow appearance-none border border-[#2a9d8f] rounded md:w-5/6 py-2 w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-1" type="text" name="search" id="" placeholder='Recherchez vos films par mots clés' value={query} onChange={e => handleSearch(e.target.value)}/>
            </div>
            {Movies.length >= 1 ?
            <div className='flex'>
              <button onClick={() => page > 1 ? setPage(page - 1) : null} className='p-3 md:w-[30%] w-full justify-center bg-[#2a9d8f] rounded hover:bg-[#238176] ease-in-out duration-300 m-1 flex items-center'><BsFillArrowLeftCircleFill size={50} /></button>
              <button onClick={() => setPage(page + 1)} className='p-3 md:w-[30%] w-full justify-center bg-[#2a9d8f] rounded hover:bg-[#238176] ease-in-out duration-300 m-1 flex items-center'><BsFillArrowRightCircleFill size={50} /></button>
            </div>
            :
            <p className='m-2 text-xl'>Aucun film trouvé avec le ou les mots clés : "{query2}". Réessayez</p>}
            <div className='flex flex-wrap justify-center animate__animated animate__fadeIn'>
              {loading === true?
              <img src={Spinner} alt="spinner loading" />
              :
              Movies.map((movie, key) => (
                <div key={key} className='max-w-sm rounded overflow-hidden m-3 flex flex-col justify-center items-center cursor-pointer animate__animated animate__fadeIn'>
                  <a href={"movie/" + movie.id}><img src={movie.poster_path == null ? 'https://via.placeholder.com/300x450' : `https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt="Sunset in the mountains" className=' ease-in-out duration-300 bg-[#b81e13]'/></a>
                  <div className='w-full'>
                  <div className={`h-[25px] mt-2 text-center text-gray-800 text-shad ${movie.vote_average*10 >= 0 && movie.vote_average*10 <= 20 ? "bg-[#b81e13] shadow-md shadow-[#b81e13]" : null} ${movie.vote_average*10 >= 20 && movie.vote_average*10 < 40 ? "bg-[#c46619] shadow-md shadow-[#c46619]" : null} ${movie.vote_average*10 >= 40 && movie.vote_average*10 < 60 ? "bg-[#96c419] shadow-md shadow-[#96c419]" : null} ${movie.vote_average*10 >= 60 && movie.vote_average*10 < 80 ? "bg-[#2dc419] shadow-md shadow-[#2dc419]" : null} ${movie.vote_average*10 >= 80 && movie.vote_average*10 <= 100 ? "bg-[#0fdf0f] shadow-md shadow-[#0fdf0f]" : null}`} style={{width: `${movie.vote_average*10}%`}}>{movie.vote_average*10}%</div>
                    <p className='mt-1 font-bold'>{movie.original_title}</p>
                    <p className='mt-1'>{movie.release_date}</p>  
                  </div>
                </div>
              ))}
            </div>
            {Movies.length >= 1 ?
            <div className='flex'>
              <button onClick={() => page > 1 ? setPage(page - 1) : null} className='p-3 md:w-[30%] w-full justify-center bg-[#2a9d8f] rounded hover:bg-[#238176] ease-in-out duration-300 m-1 flex items-center'><BsFillArrowLeftCircleFill size={50} /></button>
              <button onClick={() => setPage(page + 1)} className='p-3 md:w-[30%] w-full justify-center bg-[#2a9d8f] rounded hover:bg-[#238176] ease-in-out duration-300 m-1 flex items-center'><BsFillArrowRightCircleFill size={50} /></button>
            </div>
            :
            <button onClick={() => setPage(page - 1)} className='p-3 md:w-[30%] w-full justify-center bg-[#2a9d8f] rounded hover:bg-[#238176] ease-in-out duration-300 m-1 flex items-center text-white'>Retour</button>}
      </div>
    </>
  )
}

export default Home