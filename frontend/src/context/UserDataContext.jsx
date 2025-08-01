// UserDataContext.js
import { createContext, useContext, useEffect, useState, useCallback } from "react";

export const UserDataContext = createContext();
import axios from "axios";

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [shouldRefetch, _refetch] = useState(true);
  const [error, setError] = useState(null);

  const refetchData = useCallback(async (userId) => {
    setError(null);

    // BUGFIX: Proper object generation for fetch
    const userIdObj = { _id: userId };
    try {
      const response = await axios.post("/api/user/getUserData", userIdObj);
      const updatedUserObject = {
        name: response.data.name,
        lastname: response.data.lastname,
        email: response.data.email,
        _id: response.data._id,
        reminderdays: response.data.reminderdays,
        remindertime: response.data.remindertime,
        playlists: response.data.playlists,
        videos: response.data.videos,
        // TODO: Profile picture if needed on details page
      };
      setUserData(updatedUserObject);
    } catch (e) {
      setError("An Error occured, try again later");
    }
  }, []);

  useEffect(() => {
    if (userData) {
      sessionStorage.setItem("sessionedUserData", JSON.stringify(userData));
    }
  }, [userData]);
  return (
    <UserDataContext.Provider value={{ userData, setUserData, refetchData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  return useContext(UserDataContext);
};
