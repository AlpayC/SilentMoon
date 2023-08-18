import "./FavoriteButton.css";
import FavoriteBtn from "../../assets/img/Icons/heartunfilled.svg";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../context/UserDataContext";
import axios from "axios";

const FavoriteButton = (props) => {
  const { userData, refetchData } = useContext(UserDataContext);
  const { itemId } = props;
  const userId = { _id: userData._id };
  const [itemInDB, setItemInDB] = useState(false);

  const favoriteType =
    props.categoryName === "meditation" ? "playlist" : "exercise";

  const favoriteData = {
    _id: userData._id,
    [`${favoriteType}_id`]: itemId?.id,
  };

  const performFavoriteAction = async (actionType) => {
    try {
      await axios.put(`/api/user/${actionType}${favoriteType}`, favoriteData);
      refetchData(userId);
      console.log(
        `${actionType === "add" ? "Hinzugefügt" : "Gelöscht"}: ${favoriteType}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let checkFavorite = false;

    if (favoriteType === "playlist") {
      checkFavorite = userData.playlists.some(
        (playlist) => playlist.playlist_id === itemId?.id
      );
    } else if (favoriteType === "exercise") {
      checkFavorite = userData.videos.some((video) => video === itemId?.id);
    }

    setItemInDB(checkFavorite);
  }, [userData, itemId, favoriteType]);

  return (
    <button
      onClick={() => performFavoriteAction(itemInDB ? "delete" : "add")}
      className={itemInDB ? "fav-btn-filled" : "fav-btn-unfilled"}
    >
      <img src={FavoriteBtn} alt="heart" />
    </button>
  );
};

export default FavoriteButton;
