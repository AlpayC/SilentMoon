import React, { useState, useEffect, useContext } from "react";
import CategoriesItem from "../../components/CategoriesItem/CategoriesItem";
import Logo from "../../components/Logo/Logo";
import NavBar from "../../components/NavBar/NavBar";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";

import { VideoDataContext } from "../../context/VideoDataContext";
import { useUserData } from "../../context/UserDataContext";
import { UserContext } from "../../user/UserContext";
import MasonryItem from "../../components/MasonryItem/MasonryItem";
import "./CategoryYoga.css";

//* Images sind hier
import allImg from "../../assets/img/Icons/all.svg";
import favsImg from "../../assets/img/Icons/heartunfilled.svg";
import anxiousImg from "../../assets/img/Icons/smileysad.svg";
import sleepImg from "../../assets/img/Icons/sleep.svg";
import kidsImg from "../../assets/img/Icons/kid.svg";
import MiniPlayerYoga from "../../components/MiniPlayerYoga/MiniPlayerYoga";
import SearchBar from "../../components/Search/Search";

const CategoryYoga = () => {
  const getRandomHeight = () => {
    const minHeight = 12; // Minimum height in rem
    const maxHeight = 25; // Maximum height in rem
    return (
      (Math.random() * (maxHeight - minHeight) + minHeight).toFixed(2) + "rem"
    );
  };

  const { isLoggedIn, logout } = useContext(UserContext);

  const { userData } = useUserData();

  const { exerciseData } = useContext(VideoDataContext);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categoriesArray = exerciseData.data || [];
  const initialItemsToShow = 4; // Number of items to show initially
  const itemsPerLoad = 2; // Number of items to load per click

  const [visibleItems, setVisibleItems] = useState(initialItemsToShow);

  //NEU
  const [searchInput, setSearchInput] = useState("");
  const [searchResultMessage, setSearchResultMessage] = useState("");
  //NEU

  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerLoad);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleFavorites = () => {
    setSelectedCategory("Favorites");
  };

  const filteredData =
    selectedCategory === "all"
      ? categoriesArray
      : categoriesArray.filter((item) => item.category === selectedCategory);

  const storagedUserData = JSON.parse(
    sessionStorage.getItem("sessionedUserData")
  );

  const storagedExerciseData = JSON.parse(
    sessionStorage.getItem("sessionedExerciseData")
  );

  const favoriteExercises = exerciseData?.data || storagedExerciseData?.data;

  const favoriteVideos = favoriteExercises?.filter((video) =>
    storagedUserData.videos.includes(video._id)
  );

  //NEU
  useEffect(() => {
    const filteredVideos =
      selectedCategory === "Favorites" ? favoriteVideos : filteredData;

    const matchingResults =
      filteredVideos.filter((item) =>
        item.title.toLowerCase().includes(searchInput.toLowerCase())
      ).length > 0;

    setSearchResultMessage(matchingResults ? "" : "No matching results.");
  }, [selectedCategory, filteredData, favoriteVideos, searchInput]);
  //NEU

  return (
    <>
      <p></p>
      <div className="main-wrapper center">
        <Logo className={"logo-black"} />
        <h1 className="padding-top-bottom">Yoga</h1>
        <p className="padding-top-bottom-sm">
          Find your inner zen from anywhere.
        </p>
        <div className="row categories">
          <CategoriesItem
            categoryImage={allImg}
            categoryTitle="All"
            onClick={() => handleCategoryClick("all")}
            selectedCategory={selectedCategory}
          />
          <CategoriesItem
            categoryImage={favsImg}
            categoryTitle="Favorites"
            onClick={() => handleCategoryClick("Favorites")}
            selectedCategory={selectedCategory}
          />
          <CategoriesItem
            categoryImage={anxiousImg}
            categoryTitle="Anxious"
            onClick={() => handleCategoryClick("Anxious")}
            selectedCategory={selectedCategory}
          />
          <CategoriesItem
            categoryImage={sleepImg}
            categoryTitle="Sleep"
            onClick={() => handleCategoryClick("Sleep")}
            selectedCategory={selectedCategory}
          />
          <CategoriesItem
            categoryImage={kidsImg}
            categoryTitle="Kids"
            onClick={() => handleCategoryClick("Kids")}
            selectedCategory={selectedCategory}
          />
        </div>

        <SearchBar
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <MiniPlayerYoga category={"yoga"} />
        <div className="masonry-container">
          {selectedCategory === "Favorites" ? ( // guckt ob favoriten selectedCategory sind
            /* NEU */
            favoriteVideos?.length > 0 ? (
              favoriteVideos.map((item) => (
                <MasonryItem
                  key={item._id}
                  link={`/category/yoga/${item._id}`}
                  image={item.image_url}
                  title={item.title}
                  item={item}
                  height={getRandomHeight()}
                />
              ))
            ) : (
              <p>{searchResultMessage || "No matching results."}</p>
            )
          ) : filteredData.length > 0 ? (
            filteredData
              .slice(0, visibleItems)
              .map((item) => (
                <MasonryItem
                  key={item._id}
                  item={item}
                  height={getRandomHeight()}
                />
              ))
          ) : (
            <p>{searchResultMessage || "No matching results."}</p>
          )}
          {/* BIS HIER */}
        </div>
        {visibleItems < filteredData.length && (
          <LoadMoreButton onClick={loadMoreItems} />
        )}
        <NavBar />
      </div>
    </>
  );
};

export default CategoryYoga;
