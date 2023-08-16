import React from 'react';
import "./CategoriesItem.css"

const CategoriesItem = ({ categoryImage, categoryTitle, onClick }) => {
    return (
        <div className="category-item-container" onClick={onClick}>
            <div className="category-frame">
                <img src={categoryImage} alt={categoryTitle} />
            </div>
            <p className="category-title">{categoryTitle}</p>
        </div>
    );
}
 
export default CategoriesItem;
