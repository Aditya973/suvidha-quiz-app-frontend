import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Quiz from './pages/Quiz';
import './App.css';
import Questions from './pages/Questions';
import Question from './pages/Question';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Start from './pages/Start';
import Forbidden from './pages/Forbidden';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = '/' element = {<Home/>} />
        <Route path = {'/quiz'} element = {<Quiz/>} />
        <Route path = {'/questions'} element = {<Questions/>} />
        <Route path = {'/questions/:id'} element = {<Question/>} />
        <Route path = {'/login'} element = {<Login/>}/>
        <Route path = {'/signup'} element = {<Signup/>}/>
        <Route path = {'/start'} element = {<Start/>}/>
        <Route path = {'/forbidden'} element = {<Forbidden/>}/>
        <Route path={'/404'} element = {<NotFound/>}/>
        <Route path='*' element = {<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
