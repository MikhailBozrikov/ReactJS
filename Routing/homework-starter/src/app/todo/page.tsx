import { FC } from "react";
import dynamic from "next/dynamic";

const TodosList = dynamic(() => import("../../components/TodosList/TodosList"), {
  loading: () => <p>Loading todos...</p>,
});

const TodoPage: FC = () => {
  return (
    <div className="page-wrapper">
      <h1>Todos</h1>
      <TodosList />
    </div>
  );
};

export default TodoPage;