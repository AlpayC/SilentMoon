import "./MediationPlayer.css";
import { MusicDataContext } from "../../context/MusicDataContext";
import { useContext, useRef, useState } from "react";

import PlayerInputBox from "../../components/PlayerInputBox/PlayerInputBox";

const MeditationPlayer = () => {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const { musicData } = useContext(MusicDataContext);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setTimeProgress(audioRef.current.currentTime);
    }
  };

  const handleDurationChange = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  return (
    <>
      <h1>MeditationPlayer</h1>

      <div>
        <PlayerInputBox
          audioRef={audioRef}
          progressBarRef={progressBarRef}
          timeProgress={timeProgress}
          duration={duration}
        />
      </div>

      {musicData?.tracks?.items?.map((track) => (
        <div key={track.id}>
          <h3>{track.name}</h3>

          <audio
            ref={(element) => {
              audioRef.current = element;
              if (audioRef.current) {
                audioRef.current.addEventListener("timeupdate", () => {
                  setTimeProgress(audioRef.current.currentTime);
                });
                audioRef.current.addEventListener("durationchange", () => {
                  setDuration(audioRef.current.duration);
                });
              }
            }}
            controls
          >
            <source src={track.preview_url} type="audio/mp3" />
          </audio>
        </div>
      ))}
    </>
  );
};

export default MeditationPlayer;
