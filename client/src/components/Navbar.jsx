import React, { useState } from 'react'
import axios from 'axios'
import * as AuthChecker from '../middleware/authChecker'
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../assets/content/spinloader.gif'
import {AiOutlineMenu, AiOutlineClose, AiOutlineLogout} from 'react-icons/ai'
import { useEffect } from 'react'

const Navbar = () => {

  const [auth, setAuth] = useState(false)
  const [loading, setLoading] = useState(true)
  const [nav, setNav] = useState(false)
  const token = useCookies(["jwt"]);
  const navigate = useNavigate();

  const handleLogout = async() => {
    await axios({
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/logout`,
      withCredentials: true,
    }).then(() => {
      window.location.reload()
    });
  }



  useEffect(() => {
    AuthChecker.AuthChecker(token).then(res => {
      setLoading(false)
      setAuth(res.data.status)
    })
  })


  const handleNav = () => {
    setNav(!nav)
  }

  return (
    loading == true ?
    <img src={Spinner} alt="spinner loading" />
    :
    <header>
      <nav className='flex justify-end md:justify-around p-4 items-center h-24 text-black mx-auto max-w-[1240px] truncate'>
        <Link className='w-full text-3xl font-bold text-[#2a9d8f]' to='/'>MasterFilms.</Link>
        <ul className='hidden md:flex'>
          <Link to="/" className='p-3 hover:text-[#2a9d8f] hover:border-b border-[#2a9d8f] cursor-pointer'>Accueil</Link>
          {auth ? 
          <>
            <Link to="/mylist" className='p-3 hover:text-[#2a9d8f] hover:border-b border-[#2a9d8f] cursor-pointer'>Mes Films</Link> 
            <Link to="/users" className='p-3 hover:text-[#2a9d8f] hover:border-b border-[#2a9d8f] cursor-pointer'>Utilisateurs</Link>
          </>
          : 
          null}
        </ul>
          {auth ? 
          <div className='hidden cursor-pointer md:flex p-3 m-2 bg-[#2a9d8f] rounded-xl hover:bg-[#238176] ease-in-out duration-300 text-white' onClick={() => handleLogout()}>
            Deconnexion <AiOutlineLogout size={25}/>
          </div>
          :
          <div className='hidden md:flex m-4'>
            <Link to='/login' className='p-3 bg-[#2a9d8f] rounded-xl hover:bg-[#238176] ease-in-out duration-300 text-white'>Connexion</Link>
          </div> 
          }
        <div onClick={handleNav} className="hover:cursor-pointer block md:hidden">
          {!nav ? <AiOutlineMenu size={25}/> : <AiOutlineClose size={25}/>}
        </div>
        <div className={nav ? "fixed left-0 top-0 w-[70%] border-r border-r-[#bebebe] h-full z-10 bg-white ease-in-out duration-300 md:hidden" : 'fixed left-[-100%]'}>
          <h1 className='w-full text-3xl font-bold text-[#2a9d8f] m-4'>AIRBNC.</h1>
          <ul className='uppercase flex flex-col justify-center items-left'>
            <Link to="/" className='p-3 m-2 hover:text-[#2a9d8f] hover:border-b border-[#2a9d8f] cursor-pointer'>Accueil</Link>
            {auth ? 
            <>
              <Link to="/mylist" className='p-3 hover:text-[#2a9d8f] hover:border-b border-[#2a9d8f] cursor-pointer'>Mes films</Link> 
              <Link to="/swipe" className='p-3 hover:text-[#2a9d8f] hover:border-b border-[#2a9d8f] cursor-pointer'>Swiper</Link>
              <div className=' m-2 flex cursor-pointer md:hidden p-3 bg-[#2a9d8f] rounded-xl hover:bg-[#238176] ease-in-out duration-300 text-white' onClick={() => handleLogout()}>
                Deconnexion <AiOutlineLogout size={25}/>
              </div>
              
            </>
            : 
            <Link to='/login' className='p-3 m-2 bg-[#2a9d8f] rounded-xl hover:bg-[#238176] ease-in-out duration-300 text-white'>Connexion</Link>
            }
          </ul>
        </div>
      </nav>
    </header>
    
  )
}

export default Navbar