import React, {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
  useEffect,
} from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../lib/FirebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { reactLocalStorage } from "reactjs-localstorage";

const Context = createContext(null);
export const StateContext = ({ children }) => {
  let themes = ["light", "dark", "cyberpunk"];
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  useLayoutEffect(() => {
    setUser(reactLocalStorage.getObject("user"));
  }, []);

  const saveUser = async (user) => {
    await setDoc(doc(db, "users", user.email), {
      email: user.email,
      name: user.displayName,
      imageUrl: user.photoURL,
    });
  };

  const handleUserAuth = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        saveUser(user);
        reactLocalStorage.setObject("user", {
          name: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
        });
      })
      .then(() => {
        window.location.reload(false);

      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const clear = () => {
    reactLocalStorage.clear();
  };

  return (
    <Context.Provider
      value={{
        handleUserAuth,
        themes,
        theme,
        setTheme,
        user,
        clear,
        loading,
        setLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const useStateContext = () => useContext(Context);
