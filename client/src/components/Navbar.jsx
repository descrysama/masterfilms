import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineMenu, AiOutlineClose, AiOutlineLogout} from 'react-icons/ai'

const Navbar = () => {

  const [auth, setAuth] = useState(false)
  const [nav, setNav] = useState(false)


  const handleNav = () => {
    setNav(!nav)
  }

  return (
    <header>
      <nav className='flex justify-end md:justify-around p-4 items-center h-24 text-black mx-auto max-w-[1240px]'>
        <h1 className='w-full text-3xl font-bold text-[#2a9d8f]'>MasterFilms.</h1>
        <ul className='hidden md:flex'>
          <Link to="/" className='p-3 hover:text-[#2a9d8f] hover:border-b border-[#2a9d8f] cursor-pointer'>Accueil</Link>
          {auth ? 
          <>
            <Link to="/favorite" className='p-3 hover:text-[#2a9d8f] hover:border-b border-[#2a9d8f] cursor-pointer'>Mes films</Link> 
            <Link to="/search" className='p-3 hover:text-[#2a9d8f] hover:border-b border-[#2a9d8f] cursor-pointer'>Swiper</Link>
          </>
          : 
          null}
        </ul>
          {auth ? 
          <div className='hidden cursor-pointer md:flex p-3 m-2 bg-[#2a9d8f] rounded-xl hover:bg-[#238176] ease-in-out duration-300 text-white'>
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
        <div className={nav ? "fixed left-0 top-0 w-[70%] border-r border-r-[#141f36] h-full z-10 bg-white ease-in-out duration-300 md:hidden" : 'fixed left-[-100%]'}>
          <h1 className='w-full text-3xl font-bold text-[#2a9d8f] m-4'>AIRBNC.</h1>
          <ul className='uppercase flex flex-col justify-center items-left'>
            <Link to="/" className='p-3 m-2 hover:text-[#2a9d8f] hover:border-b border-[#2a9d8f] cursor-pointer'>Accueil</Link>
            {auth ? 
            <>
              <Link to="/favorite" className='p-3 hover:text-[#2a9d8f] hover:border-b border-[#2a9d8f] cursor-pointer'>Mes films</Link> 
              <Link to="/search" className='p-3 hover:text-[#2a9d8f] hover:border-b border-[#2a9d8f] cursor-pointer'>Swiper</Link>
              <div className=' m-2 flex cursor-pointer md:hidden p-3 bg-[#2a9d8f] rounded-xl hover:bg-[#238176] ease-in-out duration-300'>
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