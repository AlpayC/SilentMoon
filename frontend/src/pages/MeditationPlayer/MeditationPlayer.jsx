import "./MediationPlayer.css";
import { MusicDataContext } from "../../context/MusicDataContext";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import PlayerInputBox from "../../components/PlayerInputBox/PlayerInputBox";
import axios from "axios";

const MeditationPlayer = () => {
  const params = useParams();
  const [trackItemData, setTrackItemData] = useState();

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
