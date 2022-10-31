import dynamic from "next/dynamic";
const AddTodoComponent = dynamic(() => import("../components/addTodoPage"), {
  ssr: false,
});
const addtodo = () => {
  return (
    <>
      <AddTodoComponent />
    </>
  );
};

export default addtodo;
