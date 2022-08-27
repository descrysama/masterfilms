import React from 'react'
import { useEffect, useState } from 'react'
import * as UserServices from '../../services/userServices';
import Navbar from '../../components/Navbar'
import UserList from '../../components/UserList';


const UserSearch = () => {

  const [search, setSearch] = useState('');

  const searchHandler = (value) => {
    setSearch(value.toLowerCase());
  }

  return (
    <>
      <Navbar/>
      <div className='mx-auto md:max-w-[1400px] w-full h-auto flex flex-col justify-center items-center md:p-4'>
            <div className='md:w-1/2 w-[90%] h-[20%] md:flex md:justify-center md:items-center md:flex-row flex flex-col justify-center items-center text-white p-2'>
              <input onChange={(e) => searchHandler(e.target.value)} className="shadow appearance-none border border-[#2a9d8f] rounded md:w-5/6 py-2 w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-1" type="text" name="search" id="" placeholder='Recherchez les utilisateurs' />
            </div>
            <UserList search={search}/>
      </div>
    </>
  )
}

export default UserSearch