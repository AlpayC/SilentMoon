import { useState, useContext } from "react";
import FavoriteBtn from "../../assets/img/Icons/heartunfilled.svg";
import { UserDataContext } from "../../context/UserDataContext";
import axios from "axios";
import "./FavoriteButton.css";

const FavoriteButtonToggle = (props) => {
  const { userData } = useContext(UserDataContext);
  const { itemId } = props;

  const [isFavorite, setIsFavorite] = useState(false);

  const sendFavoriteItem = async (e) => {
    e.preventDefault();
    try {
      if (props.categoryName === "meditation") {
        const sendItemsToDb = {
          _id: userData._id,
          playlist_id: itemId.id,
        };
        await axios.put(`/api/user/addplaylist`, sendItemsToDb);
        setIsFavorite(!isFavorite);
      } else if (props.categoryName === "exercise") {
        const sendItemsToDb = {
          _id: userData._id,
          exercise_id: itemId.id,
        };
        await axios.put(`/api/user/addexercise`, sendItemsToDb);
        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        onClick={sendFavoriteItem}
        className={isFavorite ? "fav-btn-filled" : "fav-btn-unfilled"}
      >
        <img src={FavoriteBtn} alt="heart" />
      </button>
    </>
  );
};

export default FavoriteButtonToggle;
