import React, { useState, useEffect, useContext } from "react";
import CategoriesItem from "../../components/CategoriesItem/CategoriesItem";
import Logo from "../../components/Logo/Logo";
import NavBar from "../../components/NavBar/NavBar";
import { VideoDataContext } from "../../context/VideoDataContext";

//* Images sind hier
import allImg from "../../assets/img/Icons/all.svg";
import favsImg from "../../assets/img/Icons/heartunfilled.svg";
import anxiousImg from "../../assets/img/Icons/smileysad.svg";
import sleepImg from "../../assets/img/Icons/sleep.svg";
import kidsImg from "../../assets/img/Icons/kid.svg";

const CategoryYoga = () => {
  const { exerciseData } = useContext(VideoDataContext);

  const [selectedCategory, setSelectedCategory] = useState("all");

  const categoriesArray = exerciseData.data || [];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);

  };

  const filteredData = selectedCategory === "all"
    ? categoriesArray
    : categoriesArray.filter((item) => item.category === selectedCategory);

  return (
    <>
      <div className="main-wrapper center">
        <Logo />
        <h1 className="padding-top-bottom">Yoga</h1>
        <p className="padding-top-bottom-sm">
          Find your inner zen from anywhere.
        </p>
        <div className="row">
          <CategoriesItem
            categoryImage={allImg}
            categoryTitle="All"
            onClick={() => handleCategoryClick("all")}
          />
          <CategoriesItem categoryImage={favsImg} categoryTitle="Favorites" />
          <CategoriesItem categoryImage={anxiousImg} categoryTitle="Anxious" />
          <CategoriesItem
            categoryImage={sleepImg}
            categoryTitle="Sleep"
            onClick={() => handleCategoryClick("Sleep")}
          />
          <CategoriesItem categoryImage={kidsImg} categoryTitle="Kids" />
        </div>
        <div>
          {filteredData.map((item) => (
            <div key={item._id}>{item.title}</div>
          ))}
        </div>
        <NavBar />
      </div>
    </>
  );
};

export default CategoryYoga;
