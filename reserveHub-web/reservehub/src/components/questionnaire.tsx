"use client";
import Link from "next/link";
import { useState } from "react";
import { questions } from "../utility/questions"
import { setQuestionnaireStatus } from "@/lib/features/global/globalSlice";
import { useDispatch, useSelector } from "react-redux";

const Questionnaire = () => {
    const dispatch = useDispatch();

  //functionality
  const [questionList, setQuestionList] = useState(questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(
    questionList[currentQuestionIndex - 1].text
  );
  const [isDisabled, setIsDisabled] = useState(false);
  const [isEligible, setIsEligible] = useState(false);

  const handleAnswer = (answer:any) => {
    if (answer === "no") {
      if (currentQuestionIndex <= questionList.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setCurrentQuestion(questionList[currentQuestionIndex].text);
      } else {
        setIsDisabled(true);
        dispatch(setQuestionnaireStatus(false))
        alert("You are not eligible return home");
      }
    } else {
      setIsEligible(true);
      dispatch(setQuestionnaireStatus(true))
      setIsDisabled(true);
    }
  };

  const handleSuccessfullQuestionnaire = () => {
    console.log("continue");
  };

  //build the ui
  return (
    <div
      className={
        "border-2 border-white rounded-md mx-auto my-5 px-5 py-4 w-8/12"
      }
    >
      <h3 className={"text-center text-3xl my-4 mx-auto"}>
        Question {currentQuestionIndex}
      </h3>

      <p
        key={currentQuestionIndex}
        className={"text-center text-xl my-4 mx-auto"}
      >
        {currentQuestion}
      </p>

      <div className={"flex flex-col mx-auto text-center my-8"}>
        {/* this is going to be for the answers */}
        <button
          disabled={isDisabled}
          onClick={() => handleAnswer("yes")}
          className={"border-2 border-white rounded-sm my-4 px-3 py-3"}
        >
          Yes
        </button>
        <button
          disabled={isDisabled}
          onClick={() => handleAnswer("no")}
          className={"border-2 border-white rounded-sm my-4 px-3 py-3"}
        >
          No
        </button>
      </div>

      <p> Current Eligibility Status: {isEligible.toString().toUpperCase()}</p>

      <Link href={"/reservation"}>
        <button
          disabled={!isEligible}
          onClick={handleSuccessfullQuestionnaire}
          className={
            "border-2 border-white rounded-md px-4 py-2 mx-5 my-4 max-w-48 bg-white text-black disabled:bg-slate-800 disabled: text-slate-500 "
          }
        >
          Next
        </button>
      </Link>
    </div>
  );
};

//question number???
//question title
//question answers yes and no
//button to check answer and proceed to next question

export default Questionnaire;
