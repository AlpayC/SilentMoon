import PlayBtn from "../../assets/img/Icons/PlayBtn.svg";
import PauseBtn from "../../assets/img/Icons/PauseBtn.svg";
import "./PlayButton.css";
const PlayButton = ({ isPlaying, onToggle }) => {
  return (
    <div className="controls">
      <button className="play-pause" onClick={onToggle}>
        {isPlaying ? (
          <img src={PauseBtn} alt="pause" className="pause" />
        ) : (
          <img src={PlayBtn} alt="play" className="play" />
        )}
      </button>
    </div>
  );
};

export default PlayButton;
