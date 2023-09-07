import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../config/shared";

export default function Question() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [tempQuestion, setTempQuestion] = useState(null);
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  function updateQuestion(e) {
    e.preventDefault();
    const url = SERVER_URL + "api/quiz/question/" + id;
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'x-access-token' : localStorage.getItem('access') 
      },
      body: JSON.stringify(tempQuestion),
    })
      .then((response) => {
        if(response.status === 401){
          navigate('/login');
        }
        if(response.status === 403){
          navigate('/forbidden');
        }
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setQuestion(data.data);
        setChanged(false);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
        console.log(e);
      });
  }

  useEffect(() => {
    if (!question) return;
    if (!tempQuestion) return;

    let equal = true;
    if (question.description != tempQuestion.description) equal = false;
    if (question.a != tempQuestion.a) equal = false;
    if (question.b != tempQuestion.b) equal = false;
    if (question.c != tempQuestion.c) equal = false;
    if (question.d != tempQuestion.d) equal = false;
    if (question.correct != tempQuestion.correct) equal = false;

    if (equal) {
      setChanged(false);
    }
  });

  useEffect(() => {
    const url = SERVER_URL + "api/quiz/question/" + id;
    fetch(url,{
      headers: {
        "Content-Type": "application/json",
        'x-access-token' : localStorage.getItem('access') 
      }
    })
      .then((response) => {
        if(response.status === 401){
          navigate('/login');
        }
        if(response.status === 403){
          navigate('/forbidden');
        }
        if (response.status === 404) {
          navigate("/404");
        }
        return response.json();
      })
      .then((data) => {
        setQuestion(data.data);
        setTempQuestion(data.data);
      });
  }, []);
  return (
    <>
      {question ? (
        <div className="px-10">
            <h1 className="text-center text-2xl my-3">Edit Question</h1>
          <form id="question" className="w-full max-w-xl">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5">
                <label
                  className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
                  for="description"
                >
                  Description
                </label>
              </div>
              <div className="md:w-4/5">
                <textarea
                  className="bg-white-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  value={tempQuestion.description}
                  onChange={(e) => {
                    setTempQuestion({
                      ...tempQuestion,
                      description: e.target.value,
                    });
                    setChanged(true);
                  }}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5">
                <label
                  className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
                  for="a"
                >
                  Option A
                </label>
              </div>
              <div className="md:w-4/5">
                <input
                  className="bg-white-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  value={tempQuestion.a}
                  onChange={(e) => {
                    setTempQuestion({
                      ...tempQuestion,
                      a: e.target.value,
                    });
                    setChanged(true);
                  }}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5">
                <label
                  className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
                  for="b"
                >
                  Option B
                </label>
              </div>
              <div className="md:w-4/5">
                <input
                  className="bg-white-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  value={tempQuestion.b}
                  onChange={(e) => {
                    setTempQuestion({
                      ...tempQuestion,
                      b: e.target.value,
                    });
                    setChanged(true);
                  }}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5">
                <label
                  className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
                  for="industry"
                >
                  Option C
                </label>
              </div>
              <div className="md:w-4/5">
                <input
                  className="bg-white-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  value={tempQuestion.c}
                  onChange={(e) => {
                    setTempQuestion({
                      ...tempQuestion,
                      c: e.target.value,
                    });
                    setChanged(true);
                  }}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5">
                <label
                  className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
                  for="industry"
                >
                  Option D
                </label>
              </div>
              <div className="md:w-4/5">
                <input
                  className="bg-white-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  value={tempQuestion.d}
                  onChange={(e) => {
                    setTempQuestion({
                      ...tempQuestion,
                      d: e.target.value,
                    });
                    setChanged(true);
                  }}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5">
                <label
                  className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
                  for="industry"
                >
                  Correct
                </label>
              </div>
              <div className="md:w-4/5">
                <select
                  className="bg-white-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  value={tempQuestion.correct}
                  onChange={(e) => {
                    setTempQuestion({
                      ...tempQuestion,
                      correct: e.target.value,
                    });
                    setChanged(true);
                  }}
                >
                    <option value="a">A</option>
                    <option value="b">B</option>
                    <option value="c">C</option>
                    <option value="d">D</option>
                </select>
              </div>
            </div>
          </form>
          {changed ? (
            <div className="mb-3">
              <button
                onClick={(e) => {
                  setTempQuestion({ ...question });
                  setChanged(false);
                }}
                className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                form="question"
                className="mx-2 px-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                onClick={updateQuestion}
              >
                Save
              </button>
            </div>
          ) : null}
          <button
            className="block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-3"
            onClick={(e) => {
              const url = SERVER_URL + "api/quiz/question/" + id;
              fetch(url, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  "x-access-token" : localStorage.getItem('access')
                },
              })
                .then((response) => {
                  if(response.status === 401){
                    navigate('/login');
                  }
                  if(response.status === 403){
                    navigate('/forbidden')
                  }
                  if (!response.ok) {
                    throw new Error("Something went wrong");
                  }
                  navigate("/questions");
                })
                .catch((e) => {
                  console.log(e);
                });
            }}
          >
            Delete
          </button>
          <Link to={"/questions"}>
            <button className=" px-2 bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded">
              ← Go Back
            </button>
          </Link>
        </div>
      ) : null}
      {error ? <p>{error}</p> : null}
    </>
  );
}
