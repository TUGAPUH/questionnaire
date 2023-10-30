import React, { useEffect, useState } from "react";
import "./questionPage.scss";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
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
import { Button } from "../../Components/Button/Button";
import toast, { Toaster } from "react-hot-toast";

export const QuestionPage = () => {
  const [questions, loading] = useCollectionData(collection(db, "Questions"));
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const dbFiredatabase = collection(db, "Questions");
  const [btnValue, setBtnValue] = useState("Дальше");
  const params = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(null);
  const refByTime = query(
    dbFiredatabase,
    where("id", "==", +params.id),
    limit(1)
  );

  useEffect(() => {
    if (questions) {
      setCurrentQuestion(questions.filter((val) => val.id === +params.id));
      console.log(questions.filter((val) => val.id === +params.id));
    }
  }, [questions, params.id]);

  useEffect(() => {
    if (+params.id === questions?.length) {
      console.log("da");
      setBtnValue("Закончить");
    }
  }, [params.id]);

  if (loading) {
    return <Loader />;
  }

  const handleChange = (e) => {
    setValue(e.target.value);
    console.log(e.target.value);
  };

  const handleClick = async () => {
    if (value) {
      const filteredAnsw = currentQuestion[0].answers.filter(
        (val) => val.answer === value
      );
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
      <div className="container">
        <div>
          {currentQuestion.map((val, ind) => {
            return (
              <FormControl key={ind}>
                <FormLabel
                  style={{ textAlign: "center", marginBottom: "30px" }}
                  className="radio__label"
                  id="demo-radio-buttons-group-label"
                >
                  {val.question}
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                >
                  {val.answers.map((answer, ind) => {
                    return (
                      <FormControlLabel
                        key={ind}
                        value={answer.answer}
                        control={<Radio />}
                        label={answer.answer}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            );
          })}
        </div>
        <Button style={{ marginLeft: "-20%" }} onClick={handleClick}>
          {btnValue}
        </Button>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};
