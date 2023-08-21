import "./MediationPlayer.css";
import axios from "axios";
import { MusicDataContext } from "../../context/MusicDataContext";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Player from "../../components/Player/Player";
import CloseButton from "../../components/BackButton/CloseButton";

const MeditationPlayer = () => {
  const params = useParams();
  const [trackItemData, setTrackItemData] = useState();
  const { musicData } = useContext(MusicDataContext);

  const id = trackItemData?.id;
  const name = trackItemData?.name;
  const preview_url = trackItemData?.preview_url;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.post(`/api/spotify/onetrack`, params);
      setTrackItemData(data);
    };
    fetchData();
  }, [params]);

  return (
    <>
      <div className="meditation-player-page">
        <article className="meditation-page-btn">
          <CloseButton />
        </article>
        <div key={id}>
          <article className="meditation-player-content">
            <div className="track-description">
              <h2>{name}</h2>
              <h3>{trackItemData?.artists[0].name}</h3>
            </div>
            <div className="player-container">
              <Player audioSrc={preview_url} />
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default MeditationPlayer;
