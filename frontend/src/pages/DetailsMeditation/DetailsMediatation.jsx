import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Stats from "../../components/Stats/Stats";
import NavBar from "../../components/NavBar/NavBar";
import BackButton from "../../components/BackButton/BackButton";
import { MusicDataContext } from "../../context/MusicDataContext";
import MusicItem from "../../components/MusicItem/MusicItem";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";

import "./DetailsMediatation.css";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";

const DetailsMusic = () => {
  const { playlistData } = useContext(MusicDataContext);
  const [tracksData, setTracksData] = useState();
  const [visibleTracks, setVisibleTracks] = useState(20); // Number of tracks to show
  const params = useParams();

  const chosenPlaylist = playlistData?.data?.playlists?.items.find(
    (playlist) => playlist.id === params.id
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post(`/api/spotify/tracks`, params);
        setTracksData(data);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };
    fetchData();
  }, [params]);

  // Load more tracks when the "Load More" button is clicked
  const loadMoreTracks = () => {
    setVisibleTracks((prevVisibleTracks) => prevVisibleTracks + 20);
  };

  let shortenedPLaylistName = chosenPlaylist.name;
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
          <img className="header-image" src={chosenPlaylist.images[0].url} />
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
              <p className="subtitle">{chosenPlaylist.description}</p>
              <div className="statsContainerNew">
                <Stats />
                <h2 className="playlist-h2">Playlist</h2>
              </div>
            </div>
            {tracksData?.items?.slice(0, visibleTracks).map((track) => (
              <MusicItem
                key={track.track.id}
                link={track.track.id}
                title={track.track.name}
                duration={track.track.duration_ms}
              />
            ))}
            {visibleTracks < tracksData?.items?.length}
            <LoadMoreButton onClick={loadMoreTracks} />
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
