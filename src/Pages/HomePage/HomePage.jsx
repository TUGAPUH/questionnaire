import React from "react";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import './homePage.scss';

export const HomePage = () => {
  return (
    <div style={{overflow: 'hidden'}}>
      <Header />
      <Main />
    </div>
  );
};
