import { FC } from "react";
import dynamic from "next/dynamic";

const HomePage = dynamic(() => import("../../components/HomePage/HomePage"), {
  loading: () => <p>Loading...</p>,
});

const Home: FC = () => {
  return (
    <div className="page-wrapper">
      <HomePage />
    </div>
  );
};

export default Home;