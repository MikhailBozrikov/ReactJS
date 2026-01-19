import { Space } from "antd";
import { FC, useEffect, useState } from "react";
import Api from "../../api/api";
import { Todos } from "../../models";
import Todo from "../Todo/Todo";

const TodosList: FC = () => {
	const [data, setData] = useState<Todos>([]);

	const getData = async (): Promise<void> => {
		const data = await Api.getTodos();
		setData(data);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<Space direction="vertical" size="middle" style={{ display: "flex" }}>
			{data.map((todo) => (
				<Todo todo={todo} key={todo.id} />
			))}
		</Space>
	);
};

export default TodosList;
