import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const VideoDataContext = createContext();

export const VideoDataProvider = ({ children }) => {
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    const exercisesFromDB = async () => {
      try {
        const response = await axios.get("/api/exercises");
        setExerciseData(response);
      } catch (error) {
        console.error("Error fetching Pexels data:", error);
      }
    };
    exercisesFromDB();
  }, []);

  return (
    <VideoDataContext.Provider value={{ exerciseData, setExerciseData }}>
      {children}
    </VideoDataContext.Provider>
  );
};
