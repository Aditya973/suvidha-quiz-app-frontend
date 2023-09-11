import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

function Start() {
  const [name, setName] = useState("");
  const [admin,setAdmin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("access");
    if(!token){
        navigate('/login');
        return;
    }
    const decoded = jwt_decode(token);
    console.log(decoded);
    setName(decoded.name);
    if(decoded.isAdmin){
        setAdmin(true);
    }
  }, []);
  function logout(){
    localStorage.clear();
    navigate('/login');
  }
  return (
    <>
      <div className="h-screen m-2">
        <div className="flex flex-row-reverse h-10 gap-3">
            <div className="h-full flex flex-row items-center">
          <button className="border-0 rounded px-3 py-2 text-lg bg-purple-500 hover:bg-purple-600 text-white font-bold" onClick={logout}>Logout</button>
            </div>
          <div className="border-2 border-gray-300 rounded text-center h-full">
            <p className="font-bold text-lg px-3 py-1">Welcome back, {name}</p>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center h-full gap-5">
            <Link to={'/quiz'}>
            <button className="bg-orange-500 hover:bg-orange-700 px-3 py-2 rounded border-0 text-white text-xl duration-200">Start Quiz</button>
            </Link>
            {
                admin &&
                <Link to={'/questions'}>
                <button className="bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded border-0 text-white text-xl duration-200">View Questions</button>
                </Link> 
            }
        </div>
      </div>
    </>
  );
}

export default Start;
