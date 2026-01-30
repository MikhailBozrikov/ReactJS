"use client";

import { Space, Alert, Card, Skeleton } from "antd";
import { FC, useEffect, useState } from "react";
import Api from "../../api/api";
import { Todos } from "../../models";
import Todo from "../Todo/Todo";

const TodosList: FC = () => {
  const [data, setData] = useState<Todos>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getData = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await Api.getTodos();
      setData(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setError("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <Space direction="vertical" size="middle" style={{ display: "flex", minHeight: "500px" }}>
        {[...Array(5)].map((_, index) => (
          <Card key={index} style={{ width: "100%" }}>
            <Skeleton active />
          </Card>
        ))}
      </Space>
    );
  }

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return (
    <Space 
      direction="vertical" 
      size="middle" 
      style={{ 
        display: "flex",
        minHeight: "500px"
      }}
    >
      {data.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </Space>
  );
};

export default TodosList;