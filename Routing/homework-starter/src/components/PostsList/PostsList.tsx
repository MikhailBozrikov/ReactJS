"use client";

import { Space, Alert, Card, Skeleton } from "antd";
import { FC, useEffect, useState } from "react";
import Post from "../Post/Post";
import Api from "../../api/api";
import { Posts } from "../../models";

const PostsList: FC = () => {
  const [data, setData] = useState<Posts>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getData = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await Api.getPosts();
      setData(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts");
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
      {data.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </Space>
  );
};

export default PostsList;