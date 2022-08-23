import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import * as MovieService from "../services/MovieService";

const MovieDetail = ({ id }) => {
  const location = useLocation();
  const movieId = id || location.pathname.split("/")[2];
  const [movie, setMovie] = useState([]);
  const [Year, setYear] = useState();

  useEffect(() => {
    MovieService.singleSearch(movieId).then((res) => {
      setMovie(res.data);
      let releaseYear = res.data.release_date.split('-')[0];
      setYear(releaseYear);
    });
  }, [movieId]);

  return (
    <>
      <Navbar />
      <div className="mx-auto md:max-w-[1400px] w-full h-auto flex flex-col justify-center items-center md:p-4 animate__animated animate__fadeIn">
        <div className="md:flex md:flex-row md:items-start md:justify-start flex flex-col justify-center items-center">
            <div className="md:w-1/2 md:max-h-1/2 m-2">
                <img src={movie.poster_path == null ? 'https://via.placeholder.com/300x450' : `https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="Sunset in the mountains" className=' ease-in-out duration-300 bg-[#b81e13]'/>
            </div>
            <div className="md:w-1/2 justify-center m-3">
                <h1 className="text-3xl m-1 font-bold">{movie.original_title} ({Year})</h1>
                <p className="m-1">{movie.overview}</p>
                <ul className="font-bold">
                  <li className="m-2">Budget : {movie.budget ? movie.budget+'€' : '?'}</li>
                  <li className="m-2">Recette : {movie.revenue ? movie.revenue+'€' : '?'}</li>
                  <div className={`h-[25px] mt-2 text-center text-gray-800 text-shad ${movie.vote_average*10 >= 0 && movie.vote_average*10 <= 20 ? "bg-[#b81e13] shadow-md shadow-[#b81e13]" : null} ${movie.vote_average*10 >= 20 && movie.vote_average*10 < 40 ? "bg-[#c46619] shadow-md shadow-[#c46619]" : null} ${movie.vote_average*10 >= 40 && movie.vote_average*10 < 60 ? "bg-[#96c419] shadow-md shadow-[#96c419]" : null} ${movie.vote_average*10 >= 60 && movie.vote_average*10 < 80 ? "bg-[#2dc419] shadow-md shadow-[#2dc419]" : null} ${movie.vote_average*10 >= 80 && movie.vote_average*10 <= 100 ? "bg-[#0fdf0f] shadow-md shadow-[#0fdf0f]" : null}`} style={{width: `${movie.vote_average*10}%`}}>{Math.round(movie.vote_average*10)}%</div>
                </ul>
            </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
