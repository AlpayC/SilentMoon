import "./MediationPlayer.css";
import axios from "axios";
import { DeezerDataContext } from "../../context/DeezerDataContext";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Player from "../../components/Player/Player";
import CloseButton from "../../components/BackButton/CloseButton";

const MeditationPlayer = () => {
  const params = useParams();
  const [trackItemData, setTrackItemData] = useState();
  const { deezerData } = useContext(DeezerDataContext);

  const id = trackItemData?.id;
  const name = trackItemData?.title;
  const preview_url = trackItemData?.preview;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/deezer/onetrack/${params.id}`);
        
        if (data.error) {
          console.error("Deezer API returned error:", data.error, "Code:", data.code);
        }
        
        setTrackItemData(data);
      } catch (error) {
        console.error("Error fetching track:", error.response?.data || error.message);
      }
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
              <h3>{trackItemData?.artist?.name}</h3>
            </div>
            <div className="player-container">
              {preview_url ? (
                <Player audioSrc={preview_url} />
              ) : (
                <div className="no-preview-message">
                  <p>No preview available for this track</p>
                  <p>This track can only be played on Deezer</p>
                  {trackItemData?.link && (
                    <a 
                      href={trackItemData.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{color: '#ff6600', textDecoration: 'underline'}}
                    >
                      Open in Deezer
                    </a>
                  )}
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default MeditationPlayer;
