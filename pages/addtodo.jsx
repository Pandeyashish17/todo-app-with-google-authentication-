import dynamic from "next/dynamic";
import { useStateContext } from "../context/StateContext";
import Link from "next/link";
const AddTodoComponent = dynamic(() => import("../components/AddTodoPage"), {
  ssr: false,
});
const Addtodo = () => {
  const { user, theme } = useStateContext();

  return (
    <>
      {user?.name ? (
        <AddTodoComponent />
      ) : (
        <div
          className="grid place-content-center w-full h-full "
          data-theme={theme}
        >
          <Link href="/">
            <a className="btn">Go To Login Page</a>
          </Link>
        </div>
      )}
    </>
  );
};

export default Addtodo;
