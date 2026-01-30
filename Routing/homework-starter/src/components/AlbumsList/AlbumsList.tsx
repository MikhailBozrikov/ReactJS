"use client";

import { Flex, Alert, Skeleton } from "antd";
import { FC, useEffect, useState } from "react";
import Api from "../../api/api";
import { Albums } from "../../models";
import Album from "../Album/Album";

const AlbumsList: FC = () => {
  const [data, setData] = useState<Albums>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getData = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await Api.getAlbums();
      setData(data.slice(0, 5));
      setError(null);
    } catch (error) {
      console.error("Error fetching albums:", error);
      setError("Failed to load albums");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return (
    <Flex wrap="wrap" gap="middle" justify="center" style={{ width: "100%" }}>
      {loading ? (
        [...Array(5)].map((_, index) => (
          <div key={index} style={{ width: "300px" }}>
            <Skeleton active paragraph={{ rows: 1 }} style={{ marginBottom: 16 }} />
            <Skeleton.Image active style={{ width: '100%', height: '300px' }} />
          </div>
        ))
      ) : (
        data.map((album) => (
          <div key={album.id} style={{ width: "300px", minHeight: "350px" }}>
            <h3 style={{ marginBottom: 16, minHeight: '24px' }}>{album.title}</h3>
            <Album albumId={album.id} />
          </div>
        ))
      )}
    </Flex>
  );
};

export default AlbumsList;