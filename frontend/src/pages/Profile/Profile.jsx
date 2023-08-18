import "./Profile.css";
import { VideoDataContext } from "../../context/VideoDataContext";
import { useContext, useEffect, useState } from "react";
import { useUserData } from "../../context/UserDataContext";
import Stats from "../../components/Stats/Stats";
import SearchBar from "../../components/Search/Search";
import RecommendedItem from "../../components/RecommendedItem/RecommendedItem";
import NavBar from "../../components/NavBar/NavBar";

const Profile = () => {
  const { exerciseData } = useContext(VideoDataContext);
  const { userData } = useUserData();
  const [searchInput, setSearchInput] = useState("");

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
        <h1>{userData.name}</h1>
        <SearchBar
          searchProp={handleSearch}
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            handleSearch();
          }}
        />
        <Stats />
        <h2>Favourite Yoga Sessions</h2>
        <section className="slider">
          {userData?.videos.map((item) => (
            <RecommendedItem
              key={item.id}
              link={`/category/yoga/${item.id}`}
              // title={
              //   item.name.length > 20
              //     ? `${item.name.substring(0, 10)}`
              //     : item.name
              // }
              playlist_id={item.playlist_id}
            />
          ))}
        </section>
        <h2>Favourite Meditations</h2>
        <section className="slider">
          {userData?.playlists.map((item) => (
            <RecommendedItem
              key={item.id}
              link={`/category/meditation/${item.id}`}
              // title={
              //   item.name.length > 20
              //     ? `${item.name.substring(0, 10)}`
              //     : item.name
              // }
              playlist_id={item.playlist_id}
            />
          ))}
        </section>
        <NavBar />
      </div>
    </>
  );
};

export default Profile;
