import PlayBtn from "../../assets/img/Icons/playBtn.png";
import PauseBtn from "../../assets/img/Icons/pauseBtn.png";
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
