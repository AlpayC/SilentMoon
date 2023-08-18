import "./FavoriteButton.css";
import FavoriteBtn from "../../assets/img/Icons/heartunfilled.svg";
import { useContext } from "react";
import { UserDataContext } from "../../context/UserDataContext";
import axios from "axios";

const FavoriteButton = (props) => {
  const { userData } = useContext(UserDataContext);
  const { itemId } = props;

  const sendFavoriteItem = async (e) => {
    e.preventDefault();
    try {
      if (props.categoryName === "meditation") {
        const sendItemsToDb = {
          _id: userData._id,
          playlist_id: itemId.id,
        };
        await axios.put(`/api/user/addplaylist`, sendItemsToDb);
        return console.log("Playlist hinzugefügt");
      } else if (props.categoryName === "meditation") {
        const sendItemsToDb = {
          _id: userData._id,
          exercise_id: itemId.id,
        };
        await axios.put(`/api/user/addexercise`, sendItemsToDb);
        return console.log("Video hinzugefügt");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={sendFavoriteItem} className={"fav-btn-filled"}>
        <img src={FavoriteBtn} alt="heart" />
      </button>
    </>
  );
};

export default FavoriteButton;
