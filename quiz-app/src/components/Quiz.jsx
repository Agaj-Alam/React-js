import React, { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../assets/data";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [questuon, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (questuon.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[questuon.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }

      // setIndex(++index);
      // setQuestion(data[index]);
      setIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        setQuestion(data[newIndex]);
        return newIndex;
      });

      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };

  const reset=()=>{
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  }

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <>
        <h2>You scored {score} out of {data.length}</h2>
      <button onClick={reset}>Reset</button></>
      ) : (
        <>
          <h2>
            {" "}
            {index + 1}.{questuon.question}
          </h2>
          <ul>                  
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>
              {questuon.option1}{" "}
            </li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>
              {questuon.option2}{" "}
            </li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>
              {questuon.option3}
            </li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>
              {questuon.option4}
            </li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} to {data.length} questions{" "}
          </div>
        </>
      )}

        {/* {result?<>
        <h2>You scored {score} out of {data.length}</h2>
      <button>Reset</button>
      </>:<></>} */}
      
    </div>
  );
};

export default Quiz;
