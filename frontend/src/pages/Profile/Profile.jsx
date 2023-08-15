import "./Profile.css";
import { VideoDataContext } from "../../context/VideoDataContext";

import { useContext, useEffect } from "react";
import { useUserData } from "../../context/UserDataContext";

const Profile = () => {
  const { exerciseData } = useContext(VideoDataContext);
  const { userData } = useUserData();

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  useEffect(() => {
    console.log(exerciseData);
  }, [exerciseData]);
  return (
    <>
      <h1>Profile</h1>
    </>
  );
};

export default Profile;
