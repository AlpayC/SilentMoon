import { createContext, useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { UserContext } from "../user/UserContext";
import { useUserData } from "../context/UserDataContext";
import { getSessionItem, setSessionItem } from "../utils/storage";

export const VideoDataContext = createContext();

export const VideoDataProvider = ({ children }) => {
  // Initialize from session storage if available
  const [exerciseData, setExerciseData] = useState(() => 
    getSessionItem("sessionedExerciseData", [])
  );
  const [copyExerciseData, setCopyExerciseData] = useState(() => 
    getSessionItem("sessionedExerciseData", [])
  );
  const { userData } = useUserData();
  const { user } = useContext(UserContext);
  const [shouldRefetch, _refetch] = useState(true);
  const [isLoadingExercises, setIsLoadingExercises] = useState(false);
  const resetSearchVideoData = useCallback(() => _refetch((prev) => !prev), []);
  // BUGFIX: Search wird zurückgesetzt 22.08

  useEffect(() => {
    if (user !== null) {
      const exercisesFromDB = async () => {
        setIsLoadingExercises(true);
        try {
          const response = await axios.get("/api/exercises");
          setExerciseData(response);
          setCopyExerciseData(response);
          // Store in session storage immediately after setting
          if (response && response.data) {
            setSessionItem("sessionedExerciseData", response);
          }
        } catch (error) {
          // Handle error gracefully - exercises will remain empty
          setExerciseData([]);
          setCopyExerciseData([]);
        } finally {
          setIsLoadingExercises(false);
        }
      };
      exercisesFromDB();
    }
  }, [user]);

  // Handle search reset - reapply the copy data to main data
  useEffect(() => {
    if (copyExerciseData && copyExerciseData.data) {
      setExerciseData(copyExerciseData);
    }
  }, [shouldRefetch]);
  return (
    <VideoDataContext.Provider
      value={{ exerciseData, setExerciseData, resetSearchVideoData, isLoadingExercises }}
    >
      {children}
    </VideoDataContext.Provider>
  );
};
