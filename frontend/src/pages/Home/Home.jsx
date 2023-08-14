import "./Home.css";

import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [musicData, setMusicData] = useState([]);
  const [pexelData, setPexelData] = useState([]);

  // useEffect(() => {
  //   if (!accessToken) {
  //     const fetchData = async () => {
  //       const { data } = await fetch(
  //         "https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy",
  //         {
  //           method: "GET",
  //           headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + accessToken,
  //           },
  //         }
  //       ).then((response) => {
  //         console.log(
  //           response.json().then((data) => {
  //             console.log(data);
  //           })
  //         );
  //       });
  //       setMusicData(data);
  //     };
  //     fetchData();
  //   }
  // }, []);

  const query = "Yoga Excercises";
  const apiUrl = `https://api.pexels.com/videos/search?query=${query}&orientation=landscape`;

  useEffect(() => {
    const fetchPexelData = async () => {
      const { data } = await axios.get(apiUrl);
      console.log(data);
      setPexelData(data);
    };
    fetchPexelData();
  }, []);

  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Home;
