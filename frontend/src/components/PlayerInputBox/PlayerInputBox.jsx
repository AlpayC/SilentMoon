import "./PlayerInputBox.css";
import PlayButton from "../PlayButton/PlayButton";
import SkipBackwards from "../SkipButtons/SkipBackwards";
import SkipForward from "../SkipButtons/SkipForward";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useRef } from "react";

const PlayerInputBox = ({ audioRef, timeProgress, duration }) => {
  const progressBarRef = useRef(null);

  const handleSkipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 15;
    }
  };

  const handleSkipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 15;
    }
  };

  return (
    <>
      <h1>PlayerButtons und Inputs</h1>
      <div className="player-input-box">
        <div className="SkipPlayPause">
          <SkipBackwards onSkipBackward={handleSkipBackward} />
          <PlayButton audioRef={audioRef} />
          <SkipForward onSkipForward={handleSkipForward} />
        </div>
        <ProgressBar
          progressBarRef={progressBarRef}
          audioRef={audioRef}
          timeProgress={timeProgress}
          duration={duration}
        />
      </div>
    </>
  );
};

export default PlayerInputBox;
