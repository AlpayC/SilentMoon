import "./MediationPlayer.css";
import { MusicDataContext } from "../../context/MusicDataContext";

import { useContext, useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlayerInputBox from "../../components/PlayerInputBox/PlayerInputBox";
import DisplayTrack from "../../components/DisplayTrack/DisplayTrack";

import axios from "axios";

const MeditationPlayer = () => {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const params = useParams();
  const [trackItemData, setTrackItemData] = useState();

  const { musicData } = useContext(MusicDataContext);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [duration, setDuration] = useState(0);
  const [timeProgress, setTimeProgress] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.post(`/api/spotify/onetrack`, params);
      setTrackItemData(data);
      console.log(data);
    };
    fetchData();
  }, []);

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

      {/* {musicData?.tracks?.items?.map((track, index) => (
        <div key={track.id}>
          {index === currentTrackIndex && (
            <DisplayTrack
              currentTrack={track}
              audioRef={audioRef}
              setDuration={setDuration}
              progressBarRef={progressBarRef}
            />
          )} */}

      <div key={trackItemData?.id}>
        <h3>{trackItemData?.name}</h3>
        <div>
          <PlayerInputBox />
        </div>
        <audio controls>
          <source src={trackItemData?.preview_url} type="audio/mp3" />
        </audio>
      </div>
    </>
  );
};

export default MeditationPlayer;
