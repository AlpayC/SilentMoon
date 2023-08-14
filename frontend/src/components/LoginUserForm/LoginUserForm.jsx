import "./LoginUserForm.css";
import { useEffect, useState } from "react";
import axios from "axios";

const LoginUserForm = () => {
  // const [musicData, setMusicData] = useState([]);
  // const [accessToken, setAccesToken] = useState([]);
  // useEffect(() => {
  //   const fetchAccessToken = async () => {
  //     const token = await axios.post("/api/spotify/auth");
  //     console.log(token.data.access_token);
  //     setAccesToken(token.data.access_token);
  //   };
  //   const fetchData = async () => {
  //     const { data } = await fetch(
  //       "https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy",
  //       {
  //         method: "GET",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + accessToken,
  //         },
  //       }i
  //     ).then((response) => {
  //       console.log(
  //         response.json().then((data) => {
  //           console.log(data);
  //         })
  //       );
  //     });
  //     setMusicData(data);
  //   };
  //   fetchAccessToken();
  //   fetchData();
  // }, []);
  return (
    <>
      <h1>LoginUserForm</h1>
    </>
  );
};

export default LoginUserForm;
