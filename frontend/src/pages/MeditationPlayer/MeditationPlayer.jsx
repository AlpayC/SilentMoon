import "./MediationPlayer.css";
import { MusicDataContext } from "../../context/MusicDataContext";
import { useContext, useRef, useState } from "react";

import PlayerInputBox from "../../components/PlayerInputBox/PlayerInputBox";
import DisplayTrack from "../../components/DisplayTrack/DisplayTrack";

const MeditationPlayer = () => {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  const { musicData } = useContext(MusicDataContext);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [duration, setDuration] = useState(0);
  const [timeProgress, setTimeProgress] = useState(0);

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

      {musicData?.tracks?.items?.map((track, index) => (
        <div key={track.id}>
          {index === currentTrackIndex && (
            <DisplayTrack
              currentTrack={track}
              audioRef={audioRef}
              setDuration={setDuration}
              progressBarRef={progressBarRef}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default MeditationPlayer;
