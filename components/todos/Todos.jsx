import { deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect } from "react";
import ReactTimeago from "react-timeago";
import { useStateContext } from "../../context/StateContext";
import { db } from "../../lib/FirebaseConfig";
import Loader from "../loader/Loader";

const Todos = ({ todos }) => {
  const { user, theme } = useStateContext();
  const Todos = todos?.filter((todo) => {
    return todo.data.email.includes(user.email);
  });

  const trimString = (string) => {
    let trimmedString = string.substr(0, 30);
    return trimmedString;
  };

  const DeleteFireStoreDocument = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    window.location.reload(false);
  };
  return (
    <>
      {Todos?.length != 0 ? (
        <div className="overflow-x-auto w-screen h-screen">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th className="capitalize">SN</th>
                <th className="capitalize">todo</th>
                <th className="capitalize">todoDescription</th>
                <th className="capitalize">date</th>
                <th className="capitalize">delete</th>
              </tr>
            </thead>
            <tbody>
              {Todos?.map((todo, i) => {
                console.log(todo);
                return (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td className="capitalize">{todo.data.todo}</td>
                    <td className="capitalize">
                      {trimString(todo.data.todoDescription)}
                    </td>
                    <td className="capitalize">
                      <ReactTimeago date={todo.data.date.seconds * 1000} />{" "}
                    </td>
                    <td className="capitalize">
                      <button
                        className="btn"
                        onClick={() => DeleteFireStoreDocument(todo.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid place-content-center w-screen h-screen">
          <Loader />{" "}
        </div>
      )}
    </>
  );
};

export default Todos;
