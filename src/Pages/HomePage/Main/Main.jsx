import React from "react";
import { Slider } from "./Slider";
import { Button } from "../../../Components/Button/Button";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/questions/1')
  }
  return (
    <main className="main-container">
      <section className="main-container__text">
        <span>Привет, рады приветствовать на нашем сайте ResTel.</span>
        <p>
          Предлагаем тебе поучавствовать в нашем опросе! Для старта нажми на
          кнопку "Начать"
        </p>
      </section>
      <section className="main-container__slider">
        <Slider />
      </section>
      <section className="main-container__btn">
        <Button onClick={handleClick}>Начать</Button>
      </section>
    </main>
  );
};
