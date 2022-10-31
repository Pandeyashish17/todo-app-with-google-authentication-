import { addDoc, collection } from "firebase/firestore";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { useStateContext } from "../../context/StateContext";
import { db } from "../../lib/FirebaseConfig";
import Loader from "../loader/Loader";

const AddTodoComponent = () => {
  const { theme, loading, setLoading } = useStateContext();
  let date = new Date();
  let email = reactLocalStorage.getObject("user").email;
  const [addTodo, setAddTodo] = useState({
    todo: "",
    todoDescription: "",
    email: email,
    date: date,
  });
  const addTodoHandler = async () => {
    const { todo, email, date, todoDescription } = addTodo;
    if (
      todo.length != 0 ||
      email.length != 0 ||
      date.length != 0 ||
      todoDescription.length != 0
    ) {
      setLoading(true);
      await addDoc(collection(db, "todos"), addTodo);
      setLoading(false);
      Router.push("/");
    }
  };

  return (
    <>
      <div data-theme={theme} className="w-screen h-screen">
        <section className="bg-cover md:pt-40 pt-28 md:pb-28 pb-14 innerpage-area">
          <div className="container mx-auto">
            <div className="text-center page-title">
              <h1 className="font-bold text-4xl lg:text-7xl text-coolGray-900">
                Add Todo{" "}
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
        {loading ? (
          <Loader />
        ) : (
          <section className="py-10  sm:py-16 lg:py-24">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="relative max-w-md mx-auto mt-8 md:mt-16">
                <div className="overflow-hidden  rounded-md shadow-md">
                  <div className="px-4 py-6 sm:px-8 sm:py-7">
                    <div className="space-y-5">
                      <div>
                        <label for="" className="text-base font-medium ">
                          {" "}
                          todo{" "}
                        </label>
                        <div className="mt-2.5 relative ">
                          <input
                            type="text"
                            onChange={(e) =>
                              setAddTodo({ ...addTodo, todo: e.target.value })
                            }
                            placeholder="Todo Name"
                            className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <label for="" className="text-base font-medium ">
                            {" "}
                            Todo Description
                          </label>
                        </div>
                        <div className="mt-2.5 relative text-gray-400 focus-within:">
                          <textarea
                            type="text"
                            onChange={(e) =>
                              setAddTodo({
                                ...addTodo,
                                todoDescription: e.target.value,
                              })
                            }
                            placeholder="Todo Description"
                            className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                          />
                        </div>
                      </div>

                      <div>
                        <button
                          className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                          onClick={() => addTodoHandler()}
                        >
                          Add Todo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default AddTodoComponent;
