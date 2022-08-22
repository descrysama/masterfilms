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
      <div className="mx-auto md:max-w-[1400px] w-full h-auto flex flex-col justify-center items-center md:p-4">
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
                </ul>
            </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
