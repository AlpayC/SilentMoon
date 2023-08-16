import "./Profile.css";
import { VideoDataContext } from "../../context/VideoDataContext";

import { useContext, useEffect, useState } from "react";
import { useUserData } from "../../context/UserDataContext";

import SearchBar from "../../components/Search/Search";

const Profile = () => {
  const { exerciseData } = useContext(VideoDataContext);
  const { userData } = useUserData();

  const handleSearch = (inputValue) => {
    console.log(inputValue);
  };


  useEffect(() => {
    console.log(userData);
  }, [userData]);

  useEffect(() => {
    console.log(exerciseData);
  }, [exerciseData]);
  return (
    <>
      <div className="main-wrapper">
        <h1>Profile</h1>
        <SearchBar
          searchProp={handleSearch}
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            handleSearch();
          }}
        />
      </div>
    </>
  );
};

export default Profile;
