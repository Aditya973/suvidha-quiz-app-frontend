import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import AddQuestion from '../components/AddQuestion';
import { SERVER_URL } from '../config/shared';

function Questions() {
  const [quizzes,setQuizzes] = useState([]);
  const [show,setShow] = useState(false);
  const navigate = useNavigate();
  function toggleShow(){
    setShow(!show);
  }
  useEffect(()=>{
    const url = SERVER_URL+'api/quiz/question'
    fetch(url,{
      headers:{
        'Content-Type' : 'application/json',
        'x-access-token' : localStorage.getItem('access') 
      },
    })
    .then((response)=>{
      if(response.status === 401){
        navigate('/login');
      }
      const user = jwtDecode(localStorage.getItem('access'));
      if(!user.isAdmin){
        navigate('/forbidden');
      }
      return response.json();
    })
    .then((data)=>{
      console.log(data.data);
      setQuizzes(data.data)
    })
  },[]);

  function newQuestion(description,a,b,c,d,correct){
    let payload = {
      description,
      a,
      b,
      c,
      d,
      correct
    };
    const url = SERVER_URL + 'api/quiz/question';
    fetch(url,{
      method:'POST',
      headers:{
        'Content-Type' : 'application/json',
        'x-access-token' : localStorage.getItem('access')
      },
      body: JSON.stringify(payload)
    })
    .then((response)=>{
      if(response.status === 401){
        navigate('/login');
      }
      if(response.status === 403){
        navigate('/forbidden');
      }
      if(response.status !== 201){
        throw new Error('something went wrong');
      }
      return response.json();
    })
    .then((data)=>{
      toggleShow();
      setQuizzes([...quizzes,data.data]);
    })
    .catch((e)=>{
      console.log(e);
    })
  }
  return (
    <>
      <h1 className='text-center p-3 text-3xl '>List of Questions</h1>
      <ul className='w-screen p-0'>
        {
          quizzes?
            quizzes.map((question)=>{
              return (
                <li key={question._id} className="my-3 text-center">
                  <Link to={'/questions/' + question._id} className = " no-underline px-3 py-[5px] rounded text-neutral-950 hover:text-blue-500 duration-200">
                    {question.description}
                  </Link>
                </li>
              )
            })
          :null
        }
      </ul>
      <AddQuestion newQuestion = {newQuestion} show = {show} toggleShow = {toggleShow}/>
      <Link className='no-underline' to={'/start'}><button className="mt-3 mx-auto block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">← Go Back</button></Link>
    </>
    )
}

export default Questions