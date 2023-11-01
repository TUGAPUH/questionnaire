import React, { useState } from "react";
import { Slider } from "./Slider";
import { Button } from "../../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import FormDialog from "./ModalRegister";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../Firebase/firebaseInit";
import toast, { Toaster } from "react-hot-toast";
import { useCollectionData } from "react-firebase-hooks/firestore";

export const Main = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [users] = useCollectionData(collection(db, "Users"));

  const handleClick = async () => {
    if (value) {
      if (value.length >= 3) {
        if (
          !users.some((elem) => elem.user.toLowerCase() === value.toLowerCase())
        ) {
          try {
            const usersRef = collection(db, "Users");
            await addDoc(usersRef, {
              user: value,
            });
          } catch (error) {
            return error;
          }
          navigate("/questions/1");
        } else {
          toast.error("Такое имя уже существует!");
        }
      } else {
        toast.error("Имя должно состоять минимум из 3-х символов!");
      }
    } else{
      toast.error("Введите имя!");
    }
  };
  return (
    <>
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
          <Button onClick={() => setIsOpen(true)}>Начать</Button>
        </section>
        <FormDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          value={value}
          setValue={setValue}
          handleClick={handleClick}
        />
      </main>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};
