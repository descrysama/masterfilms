import React from 'react'
import Navbar from '../../components/Navbar'
import Spinner from '../../assets/content/spinloader.gif'
import * as MovieService from '../../services/MovieService'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import {BsTrashFill} from 'react-icons/bs'
import { Notyf } from 'notyf';
import { useState } from 'react'
import { useEffect } from 'react'

const Mylist = () => {

  const [Movies, setMovies] = useState([]);
  const [seenMovies, setSeenMovies] = useState([]);
  const [unseenMovies, setUnseenMovies] = useState([]);
  const [mapMovies, setMapMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const notyf = new Notyf({
    position: {
      x: 'left',
      y: 'top',
    },
    types: [
      {
        type: 'success',
        background: '#2a9d8f',
        duration: 2000,
        dismissible: true
      }
    ]
  });

  const getClientFilms = async() => {
    setLoading(true)
    await MovieService.getClientFilms().then(res => {
      let myFilms = res.data.my_films;
      let dbFilms = res.data.all_films;
      myFilms.forEach(movie => {
        const index = dbFilms.findIndex(aMovie => movie.film_id == aMovie.id);
        const newObject = {...dbFilms[index], status: movie.status};
        const newFilms = [...dbFilms];
        newFilms.splice(index, 1, newObject);
        dbFilms = newFilms
      })
      const newFilms = dbFilms.filter(movie => movie.status == true || movie.status == false)
      const seenArray = dbFilms.filter(movie => movie.status == true)
      const unseenArray = dbFilms.filter(movie => movie.status == false)
      setMovies(newFilms)
      setMapMovies(newFilms)
      setSeenMovies(seenArray)
      setUnseenMovies(unseenArray)
      setLoading(false)
    })
  }

    const handleDestroy = (id, status, key) => {
      MovieService.destroyFilm(id).then(() => {
        if (status === true) {
          let indexSeen = seenMovies.findIndex(movie => movie.id === id)
          const newSeen = [...seenMovies]
          const newMap = [...mapMovies]

          newMap.splice(key, 1)
          newSeen.splice(indexSeen, 1)

          setMapMovies(newMap)
          setSeenMovies(newSeen)

        } else if (status == false) {
          let indexUnseen = seenMovies.findIndex(movie => movie.id === id)
          const newUnseen = [...unseenMovies]
          const newMap = [...mapMovies]

          newMap.splice(key, 1)
          newUnseen.splice(indexUnseen, 1)

          setMapMovies(newMap)
          setUnseenMovies(newUnseen)
        }
      })
    }

  const filterFilms = (filter) => {
    switch(filter) {
      case true:
        setMapMovies(seenMovies)
        break;
      case false:
        setMapMovies(unseenMovies)
        break;
      default:
        setMapMovies(Movies)
    }
  }

  const handleAddFilm = (status, poster_path, original_title, title , overview, vote_average, id, key) => {
    MovieService.addFilm(status, poster_path, original_title, title , overview, vote_average, id, key).then(() => {
      if (status == true) {
        let filterTrue = null;
        let filterFalse = null;
        let unseenIndex = unseenMovies.findIndex(movie => movie.id === id);
        let newObject = {...mapMovies[key], status: status}
        let newMap = [...mapMovies]
        let newUnseen = [...unseenMovies]
        let newSeen = [...seenMovies]
        // newMap.splice(key, 1, newObject)
        newUnseen.splice(unseenIndex, 1)
        newSeen.push(newObject)
        // setMapMovies(newMap)
        setUnseenMovies(newUnseen)
        setSeenMovies(newSeen)
        newMap.forEach(movie => movie.status === true ? filterTrue = true : null || movie.status === false ? filterFalse = false : null)
        console.log(filterTrue);
        console.log(filterFalse);
        if(filterTrue == true && filterFalse == false) {
          setMapMovies(newMap.splice(key, 1, newObject))
        } else if (filterTrue == true && filterFalse == null) {
          setMapMovies(newSeen)
        } else if (filterTrue == null && filterFalse == false) {
          newUnseen.splice(unseenIndex, 1)
          setMapMovies(newUnseen)
        }
      } else if (status == false) {
        let filterTrue = null;
        let filterFalse = null;
        let seenIndex = seenMovies.findIndex(movie => movie.id === id);
        let newObject = {...mapMovies[key], status: status}  
        let newMap = [...mapMovies]
        let newSeen = [...seenMovies]
        let newUnseen = [...unseenMovies]
        // newMap.splice(key, 1, newObject)
        newSeen.splice(seenIndex, 1)
        newUnseen.push(newObject)
        // setMapMovies(newMap)
        setSeenMovies(newSeen)
        setUnseenMovies(newUnseen)
        newMap.forEach(movie => movie.status === true ? filterTrue = true : null || movie.status === false ? filterFalse = false : null)
        console.log(filterTrue);
        console.log(filterFalse);
        if(filterTrue == true && filterFalse == false) {
          setMapMovies(newMap.splice(key, 1, newObject))
        } else if (filterTrue == true && filterFalse == null) {
          setMapMovies(newSeen)  
        } else if (filterTrue == null && filterFalse == false) {
          setMapMovies(newUnseen.splice(key, 1))
        }
      }
    })
    notyf.success('Opération réussie');
  }

  useEffect(() => {
    getClientFilms()
  }, [])

  return (
    <>
      <Navbar/>
      <div className='mx-auto md:max-w-[1400px] w-full h-auto flex flex-col justify-center items-center md:p-4'>
            <div className='md:w-1/2 w-[90%] h-[20%] md:flex md:justify-center md:items-center md:flex-col flex flex-col justify-center items-center text-white p-2'>
              <h2 className='text-black text-4xl font-semibold'>Vos Films</h2>
              <div className='flex m-2'>
                <button onClick={() => filterFilms(true)} className='p-3 flex items-center justify-center bg-[#27a193] rounded hover:bg-[#1e746a] ease-in-out duration-300 mr-1 text-white'><AiFillEye size={18}/>Visionnés</button>
                <button onClick={() => filterFilms(false)} className='p-3 flex items-center justify-center bg-[#b92727] rounded hover:bg-[#961c1c] ease-in-out duration-300 mr-1 text-white'><AiFillEyeInvisible size={18}/>A voir</button>
              </div>
            </div>
            <div className='flex flex-wrap justify-center animate__animated animate__fadeIn'>
              {loading === true?
              <img src={Spinner} alt="spinner loading" />
              :
              mapMovies.length >= 1 ?
              mapMovies.map((movie, key) => (
                <div key={key} className='max-w-sm rounded overflow-hidden m-3 flex flex-col justify-center items-center animate__animated animate__fadeIn'>
                  <a href={"movie/" + movie.id}><img src={movie.poster_path == null ? 'https://via.placeholder.com/300x450' : `https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.original_title + 'image'} className='ease-in-out duration-300 bg-[#b81e13] cursor-pointer'/></a>
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

export default Mylist