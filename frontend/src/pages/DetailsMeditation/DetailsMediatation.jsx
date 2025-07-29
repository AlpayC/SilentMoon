import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Stats from "../../components/Stats/Stats";
import NavBar from "../../components/NavBar/NavBar";
import BackButton from "../../components/BackButton/BackButton";
import { DeezerDataContext } from "../../context/DeezerDataContext";
import MusicItem from "../../components/MusicItem/MusicItem";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";

import "./DetailsMediatation.css";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";

const DetailsMusic = () => {
  const { playlistData } = useContext(DeezerDataContext);
  const [tracksData, setTracksData] = useState();
  const [visibleTracks, setVisibleTracks] = useState(20); // Number of tracks to show
  const params = useParams();
  const location = useLocation();

  // Get playlist data from location state (passed from Link) or search in context data
  const passedPlaylistData = location.state?.playlistData;
  
  const chosenPlaylist = passedPlaylistData || playlistData?.data?.playlists?.items?.find(
    (playlist) => playlist && playlist.id.toString() === params.id
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post(`/api/deezer/tracks`, params);
        setTracksData(data);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };
    
    if (params.id) {
      fetchData();
    }
  }, [params]);

  // Load more tracks when the "Load More" button is clicked
  const loadMoreTracks = () => {
    setVisibleTracks((prevVisibleTracks) => prevVisibleTracks + 20);
  };
  
  let shortenedPLaylistName = chosenPlaylist?.title || "Loading...";
  shortenedPLaylistName =
    shortenedPLaylistName.length > 45
      ? shortenedPLaylistName.slice(0, 45) + "..."
      : shortenedPLaylistName;
  return (
    <>
      <div className="video-details">
        <div className="img-head-wrapper">
          <div className="video-header">
            <BackButton relativeClass="back-btn-filled" />
            <FavoriteButton
              relativeClass="back-btn-filled"
              itemId={params}
              categoryName={"meditation"}
            />
          </div>
          <img className="header-image" src={chosenPlaylist?.picture_medium || chosenPlaylist?.picture || ''} />
        </div>
      </div>
      <div className="main-wrapper center">
        {chosenPlaylist ? (
          <>
            <div className="left gap2">
              <h1 className="playlistname-meditation">
                {shortenedPLaylistName}
              </h1>
              <p>PLAYLIST</p>
              <div className="statsContainerNew">
                <Stats />
                <h2 className="playlist-h2">Playlist</h2>
              </div>
            </div>
            {tracksData?.data?.slice(0, visibleTracks).map((track) => (
              <MusicItem
                key={track.id}
                link={track.id}
                title={track.title}
                duration={track.duration * 1000}
                hasPreview={!!track.preview}
              />
            ))}
            {visibleTracks < tracksData?.data?.length && (
              <LoadMoreButton onClick={loadMoreTracks} />
            )}
            <NavBar />
          </>
        ) : (
          <p>Loading playlist details...</p>
        )}
      </div>
    </>
  );
};

export default DetailsMusic;
