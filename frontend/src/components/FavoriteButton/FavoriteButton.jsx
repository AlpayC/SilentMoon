import "./FavoriteButton.css";
import FavoriteBtn from "../../assets/img/Icons/heartunfilled.svg";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../context/UserDataContext";
import axios from "axios";

const FavoriteButton = (props) => {
  const { userData, refetchData } = useContext(UserDataContext);
  const storagedUserData = JSON.parse(
    sessionStorage.getItem("sessionedUserData")
  );
  const { itemId } = props;

  const id = userData?._id || storagedUserData?._id;
  const userId = { _id: id };
  const [itemInDB, setItemInDB] = useState(false);

  const favoriteType =
    props.categoryName === "meditation" ? "playlist" : "exercise";

  const favoriteData = {
    _id: id,
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
      if (userData) {
        checkFavorite = userData.playlists.some(
          (playlist) => playlist.playlist_id === itemId?.id
        );
      } else if (storagedUserData) {
        checkFavorite = storagedUserData.playlists.some(
          (playlist) => playlist.playlist_id === itemId?.id
        );
      }
    } else if (favoriteType === "exercise") {
      if (userData) {
        checkFavorite = userData.videos.some((video) => video === itemId?.id);
      } else if (storagedUserData) {
        checkFavorite = storagedUserData.videos.some(
          (video) => video === itemId?.id
        );
      }
    }

    setItemInDB(checkFavorite);
  }, [userData, storagedUserData, itemId, favoriteType]);

  return (
    <button
      onClick={() => performFavoriteAction(itemInDB ? "delete" : "add")}
      className={itemInDB ? "fav-btn-filled" : "fav-btn-unfilled"}
    >
      <img src={FavoriteBtn} alt="heart" className="heart" />
    </button>
  );
};

export default FavoriteButton;
