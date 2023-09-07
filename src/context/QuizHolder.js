import React, { useEffect } from 'react'
import { useState } from 'react';
import { createContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../config/shared';

const QuizContext = createContext();



export default function QuizHolder(props) {
    const url = SERVER_URL + 'api/quiz/question';
    const [start, setStart] = useState(false);
    const [exit, setExit] = useState(false);
    const [quizzes,setQuizzes] = useState(null);
    const [correct,setCorrect] = useState(0);
    const [ansMap,setAnsMap] = useState(new Map());
    const navigate = useNavigate();
    useEffect(()=>{
        fetch(url,{
            headers:{
              'Content-Type' : 'application/json',
              'x-access-token' : localStorage.getItem('access') 
            }}).then((response)=>{
                if(response.status === 401){
                    navigate('/login');
                }
            return response.json();
        })
        .then((data)=>{
            setQuizzes(data.data);
        })
    },[])
    return (
        <QuizContext.Provider value={{
            start, exit, setStart, setExit, quizzes,correct,setCorrect,ansMap,setAnsMap,setQuizzes
        }}>
            {props.children}
        </QuizContext.Provider>
    )
}

export { QuizContext };