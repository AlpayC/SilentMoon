import "./FavoriteButton.css";
import FavoriteBtn from "../../assets/img/Icons/heartunfilled.svg";

const FavoriteButton = (props) => {
  return (
    <>
      <button><img src={FavoriteBtn} alt="heart" className={props.className} /></button>
    </>
  );
};

export default FavoriteButton;
