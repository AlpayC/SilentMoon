import "./MediationPlayer.css";
import { MusicDataContext } from "../../context/MusicDataContext";
import { useContext } from "react";

import PlayerInputBox from "../../components/PlayerInputBox/PlayerInputBox";

const MeditationPlayer = () => {
  return (
    <>
      <h1>MeditationPlayer</h1>

      {musicData?.tracks?.items?.map((track) => (
        <div key={track.id}>
          <h3>{track.name}</h3>
          <div>
            <PlayerInputBox />
          </div>
          <audio controls>
            <source src={track.preview_url} type="audio/mp3" />
          </audio>
        </div>
      ))}
    </>
  );
};

export default MeditationPlayer;
