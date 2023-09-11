import React, { useContext, useState } from "react";
import styled from "styled-components";
import { QuizContext } from "../context/QuizHolder";
import Result from "./Result";

const Container = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const QuizCard = styled.div({
  width: "75%",
  height: "40%",
  padding: "0px 12px",
});

const Question = styled.div({
  borderBottom: "2px solid gray",
  textAlign: "center",
});

const OptionsContainer = styled.div({
  display: "grid",
  gridTemplateColumns: "auto auto",
  gap: "10px",
  padding: "10px",
  marginBottom: "10px",
});

const Option = styled.div`
  text-align: center;
  border: 2px solid black;
  border-radius: 20px;
  padding: 4px;
`;
const BottomLayout = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;
  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: space-evenly;
  }
`;

function QuizBox({ current, next }) {
  const { quizzes, correct, setCorrect, setExit,ansMap,setAnsMap } = useContext(QuizContext);
//   console.log(quizzes);
  const [ans, setAns] = useState(ansMap.get(current));
  const [score,setScore] = useState(0);
  const [showResult,setShowResult] = useState(false);
  const [error,setError] = useState(false);
  
  const saveHandler = () => {
    if(!ans){
        setError(true);
        return;
    }
    setError(false);
    setAnsMap(new Map(ansMap.set(current,ans)));
    console.log(ansMap);
    if (quizzes[current].correct === ans) {
        setCorrect(correct + 1);
    }
    if ((current + 1) === quizzes.length) {
        console.log(ansMap);
        let total = 0;
        [...ansMap.keys()].map((k)=>{
            if(ansMap.get(k) === quizzes[k].correct){
                total++;
            }
        })
        setScore(total);
        setShowResult(true);
        setExit(true)
    } else {
        next(current + 1);
    }
    setAns(ansMap.get(current+1));
}
  return (
    <>
    {showResult? <Result score = {score}/>:
    <>
      <Container>
        <QuizCard>
          {quizzes && (
            <>
              <Question>
                <h2 className="text-xl font-bold mb-2">
                  {quizzes[current].description}
                </h2>
              </Question>
              <OptionsContainer>
                <Option
                  className={`p-2 border ${
                    ans === "a" ? "bg-blue-400 text-white" : ""
                  } hover:bg-blue-400 hover:text-white duration-200 cursor-pointer`}
                  onClick={() => setAns("a")}
                >
                  {quizzes[current].a}
                </Option>
                <Option
                  className={`p-2 border ${
                    ans === "b" ? "bg-blue-400 text-white" : ""
                  } hover:bg-blue-400 hover:text-white duration-200 cursor-pointer`}
                  onClick={() => setAns("b")}
                >
                  {quizzes[current].b}
                </Option>
                <Option
                  className={`p-2 border ${
                    ans === "c" ? "bg-blue-400 text-white" : ""
                  } hover:bg-blue-400 hover:text-white duration-200 cursor-pointer`}
                  onClick={() => setAns("c")}
                >
                  {quizzes[current].c}
                </Option>
                <Option
                  className={`p-2 border ${
                    ans === "d" ? "bg-blue-400 text-white" : ""
                  } hover:bg-blue-400 hover:text-white duration-200 cursor-pointer`}
                  onClick={() => setAns("d")}
                >
                  {quizzes[current].d}
                </Option>
              </OptionsContainer>
              <BottomLayout>
                <button className="px-2.5 py-2  rounded-[12px] text-lg text-white bg-red-600 hover:bg-red-700" onClick={()=>{
                    ansMap.delete(current);
                    setAnsMap(new Map(ansMap));
                    setAns(null)}}>
                  Reset
                </button>
                <button className="px-2.5 py-2  rounded-[12px] text-lg text-white bg-green-600 hover:bg-green-700" onClick={saveHandler}>
                  Save & Next
                </button>
                <button className="px-2.5 py-2  rounded-[12px] text-lg text-white bg-cyan-600 hover:bg-cyan-700" onClick={()=>{
                    if(current == 0){
                        return;
                    }
                    next(current-1);
                    setAns(ansMap.get(current-1))
                }}>
                  Previous
                </button>
              </BottomLayout>
              {error && <p className="text-red-600 text-center mt-3">Please Select an Option</p>}
            </>
          )}
        </QuizCard>
      </Container>
    </>
            }
            </>
  );
}

export default QuizBox;
