import { collection } from "firebase/firestore";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { PieChart } from "react-minimal-pie-chart";
import { db } from "../../Firebase/firebaseInit";
import "./resultPage.scss";

export const ResultPage = () => {
  const [questions, loading] = useCollectionData(collection(db, "Questions"));
  console.log(questions);
  const defaultLabelStyle = {
    fontSize: "5px",
    fontFamily: "sans-serif",
  };
  return (
    <div className="container">
      {questions?.map((val, ind) => {
        let currentQuestionCounts = val.answers.reduce(
          (sum, element) => sum + (element.count || 0),
          0
        );
        return (
          <>
          <h1>{val.question}</h1>
            <PieChart
              className="diagram"
              key={ind}
              data={val.answers.map((answCount, ind) => {
                return {
                  title: ind,
                  value: Math.round(
                    (answCount.count / currentQuestionCounts) * 100
                  ),
                  color: answCount.color,
                };
              })}
              label={({ dataEntry }) => dataEntry.value + "%"}
              labelStyle={defaultLabelStyle}
            />
          </>
        );
      })}
    </div>
  );
};
