
import React, { useState, useEffect, useContext } from "react";
import CategoriesItem from "../../components/CategoriesItem/CategoriesItem";
import Logo from "../../components/Logo/Logo";
import NavBar from "../../components/NavBar/NavBar";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";

import { VideoDataContext } from "../../context/VideoDataContext";
import MasonryItem from "../../components/MasonryItem/MasonryItem";

import "./CategoryMeditate.css";

//* Images sind hier
import allImg from "../../assets/img/Icons/all.svg";
import favsImg from "../../assets/img/Icons/heartunfilled.svg";
import anxiousImg from "../../assets/img/Icons/smileysad.svg";
import sleepImg from "../../assets/img/Icons/sleep.svg";
import kidsImg from "../../assets/img/Icons/kid.svg";
import MiniPlayerYoga from "../../components/MiniPlayerYoga/MiniPlayerYoga";

const CategoryMeditate = () => {
  const getRandomHeight = () => {
    const minHeight = 12; // Minimum height in rem
    const maxHeight = 25; // Maximum height in rem
    return (
      (Math.random() * (maxHeight - minHeight) + minHeight).toFixed(2) + "rem"
    );
  };

  const { exerciseData } = useContext(VideoDataContext);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categoriesArray = exerciseData.data || [];
  const initialItemsToShow = 4; // Number of items to show initially
  const itemsPerLoad = 2; // Number of items to load per click

  const [visibleItems, setVisibleItems] = useState(initialItemsToShow);

  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerLoad);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredData =
    selectedCategory === "all"
      ? categoriesArray
      : categoriesArray.filter((item) => item.category === selectedCategory);

  console.log(exerciseData);

  return (
    <>
      <div className="main-wrapper center">
        <Logo />
        <h1 className="padding-top-bottom">Meditate</h1>
        <p className="padding-top-bottom-sm padding-left-right">
        Audio-only meditation techniques to help you minimize your screen time and practice on the go.
        </p>
        <MiniPlayerYoga/>
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
        <div className="masonry-container">
          {filteredData.slice(0, visibleItems).map((item) => (
            <MasonryItem
              key={item._id}
              item={item}
              height={getRandomHeight()}
            />
          ))}
        </div>
        {visibleItems < filteredData.length && (
          <LoadMoreButton onClick={loadMoreItems} />
        )}
        <NavBar />
      </div>
    </>
  );
};

export default CategoryMeditate;
