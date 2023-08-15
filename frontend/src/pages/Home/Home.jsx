import "./Home.css";

import { useContext } from "react";

import { GeneratePexelDataContext } from "../../context/GeneratePexelDataContext";

const Home = () => {
  const { pexelData } = useContext(GeneratePexelDataContext);

  console.log(pexelData);
  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Home;
