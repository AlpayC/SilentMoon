import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const VideoDataContext = createContext();

export const VideoDataProvider = ({ children }) => {
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    const fetchPexelData = async () => {
      try {
        const response = await axios.get("/api/exercises");
        setExerciseData(response);
      } catch (error) {
        console.error("Error fetching Pexels data:", error);
      }
    };
    fetchPexelData();
  }, []);

  // const submit = async (e) => {
  //   e.preventDefault();
  //   setError(null);

  //   const data = new FormData(e.currentTarget);
  //   try {
  //     // await axios.post("/api/user/login", data);
  //     const response = await axios.post("/api/user/login", data);

  //     setUserData(response.data.data.name);
  //     refetch();

  //     nav("/profile");
  //   } catch (e) {
  //     console.log(e);
  //     setError("An Error occured, try again later");
  //   }
  // };

  return (
    <VideoDataContext.Provider value={{ exerciseData, setExerciseData }}>
      {children}
    </VideoDataContext.Provider>
  );
};
