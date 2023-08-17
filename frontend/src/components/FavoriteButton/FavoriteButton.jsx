import "./FavoriteButton.css";
import FavoriteBtn from "../../assets/img/Icons/heartunfilled.svg";

const FavoriteButton = (props) => {
  return (
    <>
      <button>Add to Favorite</button>
      <img src={FavoriteBtn} alt="heart" className={props.className} />
    </>
  );
};

export default FavoriteButton;
