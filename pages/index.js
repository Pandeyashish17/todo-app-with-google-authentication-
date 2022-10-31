import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/HOC/Navbar";
import Login from "../components/Login/Login";
import Todos from "../components/todos/Todos";
import { useStateContext } from "../context/StateContext";
import { db } from "../lib/FirebaseConfig";

export default function Home() {
  const { theme, user } = useStateContext();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getAllTodos = async () => {
      const querySnapshot = await getDocs(collection(db, "todos"));

      setTodos(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: {
              email: doc.data().email,
              todo: doc.data().todo,
              date: doc.data().date,
              todoDescription: doc.data().todoDescription,
            },
          };
        })
      );
    };

    getAllTodos();
  }, []);

  return (
    <>
      <div data-theme={theme} className="">
        <Navbar />
        {user?.name ? <Todos todos={todos} /> : <Login />}
      </div>
    </>
  );
}
