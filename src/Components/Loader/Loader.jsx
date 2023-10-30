import React from "react";
import style from "./loader.scss";

export const Loader = () => {
  return (
    <div className={style.centered}>
      <div className={style.roller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
