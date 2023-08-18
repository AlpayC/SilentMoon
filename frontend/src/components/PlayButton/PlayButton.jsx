import PlayBtn from "../../assets/img/Icons/playBtn.png";
import PauseBtn from "../../assets/img/Icons/pauseBtn.png";
import { useState, useEffect, useRef } from "react";

const PlayButton = ({ audioRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  // useEffect(() => {
  //   if (isPlaying && audioRef.current) {
  //     audioRef.current.play();
  //     console.log(audioRef.current);
  //   } else if (audioRef.current) {
  //     audioRef.current.pause();
  //     console.log(audioRef.current);
  //   }
  // }, [isPlaying, audioRef]);

  return (
    <div className="controls">
      <button className="play-pause" onClick={togglePlayPause}>
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
