import React, { useEffect, useState } from "react";
import "./questionPage.scss";
import { db } from "../../Firebase/firebaseInit";
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../Components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { QuestionForm } from "./QuestionForm";

export const QuestionPage = () => {
  const [questions, loading] = useCollectionData(collection(db, "Questions"));
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const dbFiredatabase = collection(db, "Questions");
  const [btnValue, setBtnValue] = useState("Дальше");
  const params = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(null);
  const [isDisabled, setIsDisabled] = useState([]);
  const [currentFormDisabled, setCurrentFormDisabled] = useState(false);
  const refByTime = query(
    dbFiredatabase,
    where("id", "==", +params.id),
    limit(1)
  );

  useEffect(() => {
    if (questions) {
      setCurrentQuestion(questions.filter((val) => val.id === +params.id));
    }
  }, [questions, params.id]);

  useEffect(() => {
    if (+params.id === questions?.length) {
      setBtnValue("Закончить");
    }
    if(isDisabled.some((elem) => elem.id === params.id)){
      setCurrentFormDisabled(true);
    } else{
      setCurrentFormDisabled(false);
    }
  }, [params.id]);

  if (loading) {
    return <Loader />;
  }

  const handleClick = async () => {
    if (value) {
      const ind = currentQuestion[0].answers.findIndex(
        (val) => val.answer === value
      );
      const docRef = await getDocs(refByTime);
      let nextPage = +params.id + 1;
      let docId = null;
      docRef.forEach((doc) => (docId = doc.id));
      currentQuestion[0].answers[ind].count++;
      await updateDoc(doc(db, "Questions", docId), {
        answers: currentQuestion[0].answers,
      });
      setIsDisabled([
        ...isDisabled,
        { id: currentQuestion[0].id, isDisabled: true },
      ]);
      setValue(null)
      if (nextPage <= questions.length) {
        navigate("/questions/" + nextPage);
      }
      if (btnValue === "Закончить") {
        navigate("/results");
      }
    } else {
      toast.error("Выберите вариант ответа!");
    }
  };

  return (
    <>
      <div className="container-questionPage">
        {currentQuestion.map((val, ind) => {
          return (
            <QuestionForm
              val={val}
              value={value}
              ind={ind}
              setValue={setValue}
              btnValue={btnValue}
              handleClick={handleClick}
              isDisabled={currentFormDisabled}
            />
          );
        })}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};
