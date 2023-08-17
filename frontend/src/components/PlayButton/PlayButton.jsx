import "./PlayButton.css";
import PlayBtn from "../../assets/img/Icons/playBtn.png";
import PauseBtn from "../../assets/img/Icons/pauseBtn.png";

const PlayButton = () => {
  return (
    <>
      <button className="play-pause">
        <img src={PlayBtn} alt="play" className="play" />
        <img src={PauseBtn} alt="pause" className="pause" />
      </button>
    </>
  );
};

export default PlayButton;
