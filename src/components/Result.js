import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { QuizContext } from "../context/QuizHolder";

function Result({score}) {
  const {setAnsMap} = useContext(QuizContext);
  const navigate = useNavigate();
  function handleClick(){
    setAnsMap(new Map());
    navigate('/start');
  }
  return (
    <>
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1 className='font-bold text-center text-3xl'>Your Total Score is {score}</h1>
            <button className='mt-3 py-2 px-3 text-white text-lg rounded bg-purple-500 font-bold hover:bg-purple-600' onClick={handleClick}>Go Home</button>
        </div>
    </>
  )
}

export default Result