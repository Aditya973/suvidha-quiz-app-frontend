import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <>
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1 className='font-bold text-6xl'>404</h1>
            <h1 className='font-bold text-center text-3xl'>The page you are looking for does not exist</h1>
            <Link to={'/start'}><button className='mt-3 py-2 px-3 text-white text-lg rounded bg-purple-500 font-bold hover:bg-purple-600'>Go Home</button></Link>
        </div>
    </>
  )
}

export default NotFound