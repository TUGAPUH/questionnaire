import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./Pages/HomePage/HomePage";
import { QuestionPage } from "./Pages/QuestionPage/QuestionPage";
import { ResultPage } from "./Pages/ResultPage/ResultPage";
import { ErrorPage } from "./Pages/ErrorPage/ErrorPage";
import "./app.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/questions/:id"} element={<QuestionPage />} />
        <Route path={"/results"} element={<ResultPage />}></Route>
        <Route path={"*"} element={<ErrorPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
