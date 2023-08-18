import React from "react";
import "./CategoriesItem.css";

const CategoriesItem = ({
  categoryImage,
  categoryTitle,
  onClick,
  selectedCategory,
}) => {
  const isActive = selectedCategory.toLowerCase() === categoryTitle.toLowerCase();
  return (
    <div
      className={`category-item-container ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="category-frame">
        <img src={categoryImage} alt={categoryTitle} />
      </div>
      <p className="category-title">{categoryTitle}</p>
    </div>
  );
};

export default CategoriesItem;
