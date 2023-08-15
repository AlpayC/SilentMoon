import "./Profile.css";
import { GeneratePexelDataContext } from "../../context/GeneratePexelDataContext";

import { useContext, useEffect } from "react";
import { useUserData } from "../../context/UserDataContext";

const Profile = () => {
  const { pexelData } = useContext(GeneratePexelDataContext);
  const { userData } = useUserData();

  console.log(userData);
  useEffect(() => {
    console.log(pexelData);
  }, [pexelData]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);
  return (
    <>
      <h1>Profile</h1>
    </>
  );
};

export default Profile;
