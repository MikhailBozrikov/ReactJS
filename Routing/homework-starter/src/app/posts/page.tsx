import { FC } from "react";
import dynamic from "next/dynamic";

const PostsList = dynamic(() => import("../../components/PostsList/PostsList"), {
  loading: () => <p>Loading posts...</p>,
});

const PostsPage: FC = () => {
  return (
    <div className="page-wrapper">
      <h1>Posts</h1>
      <PostsList />
    </div>
  );
};

export default PostsPage;