import "./Home.css";

import { useContext, useEffect } from "react";

import { VideoDataContext } from "../../context/VideoDataContext";
import NavBar from "../../components/NavBar/NavBar";

const Home = () => {
  const { exerciseData } = useContext(VideoDataContext);

  useEffect(() => {
    console.log(exerciseData);
  }, [exerciseData]);
  return (
    <div className="main-wrapper center">
      <h1>Home</h1>
      <NavBar />
    </div>
  );
};

export default Home;
