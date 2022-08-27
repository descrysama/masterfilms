import React from 'react'
import { useEffect, useState } from 'react'
import * as UserServices from '../services/userServices';
import {AiOutlineUser} from 'react-icons/ai'



const UserList = ({search}) => {

    const [users, setUsers] = useState([])

    useEffect(() => {
    UserServices.getUsers().then((res) => {
        if (search == '') {
            setUsers(res.data.users)
        } else {
            let newUsers = res.data.users   
            setUsers(newUsers.filter((user) => user.username.toLowerCase().includes(search)))
        }
    })
    }, [search])


  return (
    <>
        <h2 className='text-black text-4xl font-semibold text-center'>Utilisateurs trouvés : {users.length}</h2>
        <div className='md:flex md:flex-wrap md:flex-row flex flex-col animate__animated justify-center items-center animate__fadeIn m-2 w-full'>
            {users.map((user, key) => (
            <div key={key} className='flex truncate bg-[#f0f0f0] p-2 md:w-1/3 w-1/2 m-2 rounded cursor-pointer hover:bg-[#2a9d8f] hover:text-white'>
                <AiOutlineUser size={25} className="mr-1"/>
                <h4 className='text-base'>{user.username}</h4>
            </div>
            ))}
        </div>
    </>
  )
}

export default UserList