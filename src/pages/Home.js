import React from 'react'
import { Link } from 'react-router-dom'
import { SERVER_URL } from '../config/shared'
import { useEffect } from 'react'

function Home() {
  useEffect(()=>{
    const url = SERVER_URL;
    fetch(url)
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      console.log(data);
    })
    .catch((e)=>{
      console.log(e,'something went wrong');
    })
  })
  return (
    <>
        <div className='h-screen'>
          <div className='h-4 w-screen'>
            <h1 className='text-center font-bold text-3xl p-2'>Welcome to Suvidha Quiz App</h1>
          </div>
          <div className='flex flex-row flex-wrap justify-center items-center h-full gap-3'>
              <Link to={'/login'} className = 'no-underline'><button className='mt-3 py-2 px-3 text-sky-600 text-lg rounded bg-white-600 border-sky-500 border-1 font-bold hover:bg-sky-600 hover:text-white hover:font-bold'>Login</button></Link>
              <Link to={'/signup'} className = 'no-underline'><button className='mt-3 py-2 px-3 text-white text-lg rounded bg-sky-600 border-1 font-bold hover:bg-sky-700'>Sign Up</button></Link>
          </div>
        </div>
    </>
  )
}

export default Home