import React from 'react'
import { Link } from 'react-router-dom'

function Forbidden() {
  return (
    <>
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1 className='font-bold text-center text-3xl'>You are not Authorized to perform this action</h1>
            <Link to={'/start'}><button className='mt-3 py-2 px-3 text-white text-lg rounded bg-purple-500 font-bold hover:bg-purple-600'>Go Home</button></Link>
        </div>
    </>
  )
}

export default Forbidden