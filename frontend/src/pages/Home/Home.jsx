import "./Home.css";

import { useContext, useEffect } from "react";

import { VideoDataContext } from "../../context/VideoDataContext";

const Home = () => {
  const { exerciseData } = useContext(VideoDataContext);

  useEffect(() => {
    console.log(exerciseData);
  }, [exerciseData]);
  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Home;
