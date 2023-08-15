import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../context/UserDataContext";

const WelcomePage = () => {
  const { userData } = useUserData();
  console.log(userData);
  return (
    <>
      <h1>Welcome {userData?.email}</h1>
    </>
  );
};

export default WelcomePage;
