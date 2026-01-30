import { FC } from "react";
import dynamic from "next/dynamic";

const AlbumsList = dynamic(() => import("../../components/AlbumsList/AlbumsList"), {
  loading: () => <p>Loading albums...</p>,
});

const AlbumsPage: FC = () => {
  return (
    <div className="page-wrapper">
      <h1>Albums</h1>
      <AlbumsList />
    </div>
  );
};

export default AlbumsPage;