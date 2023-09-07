import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import QuizBox from '../components/QuizBox'
import QuizHolder from '../context/QuizHolder';

function Quiz() {
  const [current,setCurrent] = useState(0);
  const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem("access");
    if(!token){
        navigate('/login');
        return;
    }
  },[]);
  return (
    <>
      <QuizHolder>
        <QuizBox current={current} next = {setCurrent} />
      </QuizHolder>
    </>
  )
}

export default Quiz