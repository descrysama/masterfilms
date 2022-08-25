import React from 'react'
import Navbar from '../../components/Navbar'
import Spinner from '../../assets/content/spinloader.gif'
import * as MovieService from '../../services/MovieService'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import {BsTrashFill} from 'react-icons/bs'
import { Notyf } from 'notyf';
import { useState } from 'react'
import { useEffect } from 'react'

const Swipe = () => {

  return (
    <>
      <Navbar/>
      <div className='mx-auto md:max-w-[1400px] w-full h-auto flex flex-col justify-center items-center md:p-4'>
            <div className='flex flex-wrap justify-center animate__animated animate__fadeIn'>
              {loading === true?
              <img src={Spinner} alt="spinner loading" />
              :
              mapMovies.length >= 1 ?
              mapMovies.map((movie, key) => (
                <div key={key} className='max-w-sm rounded overflow-hidden m-3 flex flex-col justify-center items-center animate__animated animate__fadeIn'>
                  <a href={"movie/" + movie.id} target="_blank"><img src={movie.poster_path == null ? 'https://via.placeholder.com/300x450' : `https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.original_title + 'image'} className='ease-in-out duration-300 bg-[#b81e13] cursor-pointer'/></a>
                  <div className='w-full'>
                  <div className={`h-[25px] mt-2 text-center text-gray-800 text-shad ${movie.vote_average*10 >= 0 && movie.vote_average*10 <= 20 ? "bg-[#b81e13] shadow-md shadow-[#b81e13]" : null} ${movie.vote_average*10 >= 20 && movie.vote_average*10 < 40 ? "bg-[#c46619] shadow-md shadow-[#c46619]" : null} ${movie.vote_average*10 >= 40 && movie.vote_average*10 < 60 ? "bg-[#96c419] shadow-md shadow-[#96c419]" : null} ${movie.vote_average*10 >= 60 && movie.vote_average*10 < 80 ? "bg-[#2dc419] shadow-md shadow-[#2dc419]" : null} ${movie.vote_average*10 >= 80 && movie.vote_average*10 <= 100 ? "bg-[#0fdf0f] shadow-md shadow-[#0fdf0f]" : null}`} style={{width: `${movie.vote_average*10}%`}}>{movie.vote_average*10}%</div>
                    <p className='mt-1 font-bold'>{movie.original_title}</p>
                    <p className='mt-1'>{movie.release_date}</p>
                    <button onClick={() => handleAddFilm(true, movie.poster_path, movie.original_title, movie.title, movie.overview, movie.vote_average, movie.id, key)} className={`p-3 justify-center bg-[#27a193] rounded-full hover:bg-[#1e746a] ease-in-out duration-300 mr-1 text-white disabled:bg-[#676868]`} disabled={movie.status == true ? true : false}><AiFillEye size={18}/></button>
                    <button onClick={() => handleAddFilm(false, movie.poster_path, movie.original_title, movie.title, movie.overview, movie.vote_average, movie.id, key)} className={`p-3 justify-center bg-[#af1414] hover:bg-[#a51111] rounded-full ease-in-out duration-300 mr-1 text-white disabled:bg-[#676868]`} disabled={movie.status == false ? true : false}><AiFillEyeInvisible size={18}/></button>
                    <button onClick={() => handleDestroy(movie.id, movie.status, key)} className='p-3 justify-center bg-[#db1616] rounded-full ease-in-out duration-300 mr-1 text-white'><BsTrashFill size={18}/></button>
                  </div>
                </div>
              )):
              <p className='m-2 text-xl'>Vous n'avez repertorié aucun film. ajoutez-en dans la page accueil</p>}
            </div>
      </div>
    </>
  )
}

export default Swipe