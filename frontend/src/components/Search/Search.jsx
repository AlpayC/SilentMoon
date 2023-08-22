import { useState, useContext, useEffect } from "react";
import "./Search.css";
import { VideoDataContext } from "../../context/VideoDataContext";
import { MusicDataContext } from "../../context/MusicDataContext";

const SearchBar = () => {
  const { exerciseData, setExerciseData } = useContext(VideoDataContext);
  const storagedExerciseData = JSON.parse(
    sessionStorage.getItem("sessionedExerciseData")
  );
  const storagedPlaylistData = JSON.parse(
    sessionStorage.getItem("sessionedPlaylistData")
  );

  const { playlistData, setPlaylistData, playlistDetails, setPlaylistDetails } =
    useContext(MusicDataContext);
  const [searchInput, setSearchInput] = useState("");
  const [originalExerciseData, setOriginalExerciseData] = useState(
    exerciseData || storagedExerciseData
  );
  const [originalPlaylistData, setOriginalPlaylistData] =
    useState(playlistData);
  const [originalPlaylistDetails, setOriginalPlaylistDetails] =
    useState(playlistDetails);

  const search = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value === "") {
      setExerciseData(originalExerciseData);
      setPlaylistData(originalPlaylistData);
      setPlaylistDetails(originalPlaylistDetails);
    } else {
      const filteredExercises = originalExerciseData.data.filter((exercise) =>
        exercise.title.toLowerCase().includes(value.toLowerCase())
      );
      setExerciseData({ ...originalExerciseData, data: filteredExercises });
      const filteredPlaylists =
        originalPlaylistData.data.playlists.items.filter((playlist) =>
          playlist.name.toLowerCase().includes(value.toLowerCase())
        );
      const updatedPlaylistData = {
        ...originalPlaylistData,
        data: {
          ...originalPlaylistData.data,
          playlists: {
            ...originalPlaylistData.data.playlists,
            items: filteredPlaylists,
          },
        },
      };
      setPlaylistData(updatedPlaylistData);
      const filteredPlaylistDetails = originalPlaylistDetails.filter(
        (playlist) => playlist.name.toLowerCase().includes(value.toLowerCase())
      );
      setPlaylistDetails(filteredPlaylistDetails);
    }
  };

  //BUGFIX: Filter Bug fix
  useEffect(() => {
    setOriginalExerciseData(storagedExerciseData);
    setOriginalPlaylistData(storagedPlaylistData);
  }, []);

  return (
    <>
      <section className="searchBar">
        <input
          type="text"
          className="searchInput"
          value={searchInput}
          onChange={search}
        />
      </section>
    </>
  );
};

export default SearchBar;
