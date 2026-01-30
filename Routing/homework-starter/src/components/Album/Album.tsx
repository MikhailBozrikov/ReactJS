/* eslint-disable @next/next/no-img-element */
"use client";

import { FC, useCallback, useEffect, useState, useRef } from "react";
import { Photos } from "../../models";
import Api from "../../api/api";

type Props = {
  albumId: number;
};

const Album: FC<Props> = ({ albumId }: Props) => {
  const [data, setData] = useState<Photos>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  const getData = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await Api.getPhotos(albumId);
      setData(data.slice(0, 10));
      setError(null);
    } catch (error) {
      console.error("Error fetching photos:", error);
      setError("Failed to load photos");
    } finally {
      setLoading(false);
    }
  }, [albumId]);

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => new Set(prev).add(id));
  };

  useEffect(() => {
    getData();
  }, [getData]);

  if (loading) {
    return (
      <div className="album-container">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="photo-container skeleton">
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="album-container" ref={containerRef}>
      {data.map((photo) => (
        <div key={photo.id} className="photo-container">
          <img 
            src={photo.thumbnailUrl} 
            alt={photo.title}
            className={`photo-img ${loadedImages.has(photo.id) ? 'loaded' : ''}`}
            loading="lazy"
            decoding="async"
            width={150}
            height={150}
            onLoad={() => handleImageLoad(photo.id)}
            style={{
              aspectRatio: "1 / 1",
              backgroundColor: loadedImages.has(photo.id) ? 'transparent' : '#f0f0f0'
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Album;