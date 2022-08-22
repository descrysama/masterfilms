import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as userService from '../../services/userServices';
import Swal from 'sweetalert2'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password && email) {
       userService.Login(email, password).then(response => {
        if (response.data.status === true) {
          Swal.fire({
            icon: 'success',
            title: 'Success !',
            text: response.data.message
          })
          setTimeout(() => {
            navigate('/')
            Swal.close()
          }, 1000)
        } else if (response.data.status === false) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur...',
            text: response.data.message
          })
        }
        if (response.data.error.code) {
          if (response.data.error.code === 11000) {
            Swal.fire({
              icon: 'error',
              title: 'Erreur...',
              text: 'Email déja utilisé veuillez vous connecter.'
            })
          }
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erreur...',
        text: 'Verifiez vos champs. Sont-ils tous remplis ?'
      })
    }
  }

  return (
    <div className='mx-auto max-w-[400px] h-[80vh] flex justify-center items-center flex-col md:flex-col text-center text-white p-2'>
        <Link to="/"><h1 className='w-full text-3xl md:text-6xl font-bold text-[#2a9d8f] m-2 hover:text-[#238176] ease-in-out duration-300'>MasterFilms.</h1></Link>
        <form onSubmit={(e) => handleSubmit(e)} className='text-left flex flex-col justify-center items-center w-full'>
          <div className='flex flex-col m-2 w-full'>
            <label htmlFor="email" className='text-left mb-2 text-gray-500'>Email :</label>
            <input className='shadow appearance-none border border-[#238176] rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' type="email" id="email" placeholder='john.doe@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className='flex flex-col m-2 w-full'>
            <label htmlFor="password" className='text-left mb-2 text-gray-500'>Mot de passe :</label>
            <input className='shadow appearance-none border border-[#238176] rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' type="password" id="password" placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <Link to="/register" className='text-left w-full text-gray-400 hover:text-[#2a9d8f] cursor-pointer'>Pas encore inscrit ?</Link>
          <input type="submit" value="Connexion" className='p-3 m-2 bg-[#2a9d8f] rounded hover:bg-[#238176] hover:cursor-pointer w-full  ease-in-out duration-300'/>
        </form>
    </div>
  )
}

export default Login