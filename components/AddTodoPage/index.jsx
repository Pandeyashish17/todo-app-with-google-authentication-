import { addDoc, collection } from "firebase/firestore";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { useStateContext } from "../../context/StateContext";
import { db } from "../../lib/FirebaseConfig";

const AddTodoComponent = () => {
  const { theme } = useStateContext();
  let date = new Date();
  let email = reactLocalStorage.getObject("user").email;
  const [addTodo, setAddTodo] = useState({
    todo: "",
    todoDescription: "",
    email: email,
    date: date,
  });
  console.log(addTodo);
  const addTodoHandler = async () => {
    const { todo, email, date, todoDescription } = addTodo;
    if (
      todo.length != 0 ||
      email.length != 0 ||
      date.length != 0 ||
      todoDescription.length != 0
    ) {
      await addDoc(collection(db, "todos"), addTodo);
      Router.push("/");
    }
  };

  return (
    <>
      <section
        className="bg-cover md:pt-40 pt-28 md:pb-28 pb-14 innerpage-area"
        data-theme={theme}
      >
        <div className="container mx-auto">
          <div className="text-center page-title">
            <h1 className="font-bold text-4xl lg:text-7xl text-coolGray-900">
              See Details
            </h1>
          </div>
          <div className="relative text-center banner-box">
            <div className="banner-dot hidden lg:block">
              <img
                className="absolute left-0 banner-dot-1 -top-28 top-bottom-animation-1"
                src="https://nft-apasd40-gmailcom.vercel.app/assets/images/hero-banner-dot-1.svg"
                alt="hero-banner-dot-1"
              />
              <img
                className="absolute bottom-0 right-0 -top-48 banner-dot-2 top-bottom-animation-2"
                src="https://nft-apasd40-gmailcom.vercel.app/assets/images/hero-banner-dot-2.svg"
                alt="hero-banner-dot-2"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="page-content-area">
        <div className="container mx-auto">
          <div className="forms-box lg:w-8/12 mx-auto">
            <div className="login-box shadow-lg rounded-md p-12 sm:p-24">
              <h2 className="text-3xl pb-6 border-b font-bold ">Add Todo</h2>
              <div className="mb-6">
                <label className=" font-normal mb-4 text-base block pt-6">
                  todo
                </label>
                <input
                  className="p-2 border border-coolGray-300 px-4 w-full leading-none h-12  focus:outline-none text-black rounded-md text-base font-normal "
                  type="text"
                  name="title"
                  onChange={(e) =>
                    setAddTodo({ ...addTodo, todo: e.target.value })
                  }
                />
              </div>
              <div className="mb-6">
                <label className=" font-normal mb-4 text-base block">
                  Todo Decsription
                </label>
                <textarea
                  cols="85"
                  rows="5"
                  className="p-2 border-2  border-solid text-black"
                  name="description"
                  onChange={(e) =>
                    setAddTodo({
                      ...addTodo,
                      todoDescription: e.target.value,
                    })
                  }
                ></textarea>
              </div>

              <div className="login-btn mt-4 md:mt-8">
                <button
                  type="submit"
                  className="btn inline-block px-7 py-3 rounded-md"
                  onClick={() => addTodoHandler()}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTodoComponent;
