import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Stats from "../../components/Stats/Stats";
import NavBar from "../../components/NavBar/NavBar";
import BackButton from "../../components/BackButton/BackButton";
import { MusicDataContext } from "../../context/MusicDataContext";
import MusicItem from "../../components/MusicItem/MusicItem";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";
import Logo from "../../components/Logo/Logo";

const DetailsMusic = () => {
  const { playlistData } = useContext(MusicDataContext);
  const [tracksData, setTracksData] = useState();
  const [visibleTracks, setVisibleTracks] = useState(20);
  const params = useParams();

  const chosenPlaylist = playlistData?.data?.playlists?.items.find(
    (playlist) => playlist.id === params.id
  );

  //BUG Fix 228
  let shortenedPLaylistName = chosenPlaylist.name;
  shortenedPLaylistName =
    shortenedPLaylistName.length > 45
      ? shortenedPLaylistName.slice(0, 45) + "..."
      : shortenedPLaylistName;

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

  const loadMoreTracks = () => {
    setVisibleTracks((prevVisibleTracks) => prevVisibleTracks + 20);
  };

  return (
    <div className="main-wrapper center">
      <Logo className={"logo-black"} />
      <BackButton relativeClass={"back-btn-filled"} />
      {chosenPlaylist ? (
        <>
          <div className="gap3">
            <h1 className="playlistname-meditation">{shortenedPLaylistName}</h1>
            <p>PLAYLIST</p>
            <p className="subtitle">{chosenPlaylist.description}</p>
            <Stats />
          </div>
          {tracksData?.items?.slice(0, visibleTracks).map((track) => (
            <MusicItem
              key={track.track.id}
              link={track.track.id}
              title={track.track.name}
              duration={track.track.duration_ms}
            />
          ))}
          {visibleTracks < tracksData?.items?.length && (
            <LoadMoreButton onClick={loadMoreTracks} />
          )}
          <NavBar />
        </>
      ) : (
        <p>Loading playlist details...</p>
      )}
    </div>
  );
};

export default DetailsMusic;
