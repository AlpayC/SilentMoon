import "./Profile.css";
import { GeneratePexelDataContext } from "../../context/GeneratePexelDataContext";

import { useContext, useEffect, useState } from "react";
import { useUserData } from "../../context/UserDataContext";

import SearchBar from "../../components/Search/Search";

const Profile = () => {
  const { pexelData } = useContext(GeneratePexelDataContext);
  const { userData } = useUserData();
  console.log(userData);

  const [searchInput, setSearchInput] = useState("");
  const handleSearch = (inputValue) => {
    console.log(inputValue);
  };

  useEffect(() => {
    console.log(pexelData);
  }, [pexelData]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);
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
