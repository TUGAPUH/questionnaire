import { collection } from "firebase/firestore";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { PieChart } from "react-minimal-pie-chart";
import { db } from "../../Firebase/firebaseInit";
import "./resultPage.scss";

export const ResultPage = () => {
  const [questions, loading] = useCollectionData(collection(db, "Questions"));
  const defaultLabelStyle = {
    fontSize: "5px",
    fontFamily: "sans-serif",
  };
  return (
    <div className="container">
      {questions?.map((val, ind) => {
        let currentQuestionCounts = 0;
        currentQuestionCounts = val.answers.reduce(
          (sum, element) => sum + (element.count || 0),
          0
        );
        return (
          <div key={ind}>
            <h1>{val.question}</h1>
            <section className="diagram-section">
              <PieChart
                className="diagram"
                data={val.answers.map((answCount, ind) => {
                  return {
                    title: answCount.answer,
                    value: Math.round(
                      (answCount.count / currentQuestionCounts) * 100
                    ),
                    color: answCount.color,
                  };
                })}
                label={({ dataEntry }) => dataEntry.value + "%"}
                labelStyle={defaultLabelStyle}
              />
              <div>
                {val.answers.map((answ, ind) => {
                  return <span key={ind} style={{color: answ.color, fontWeight: '600'}}>{answ.answer}</span>;
                })}
              </div>
              <div className="test"></div>
            </section>
          </div>
        );
      })}
    </div>
  );
};
