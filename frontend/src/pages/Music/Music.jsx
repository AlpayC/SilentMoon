import { useContext } from "react";
import Logo from "../../components/Logo/Logo";
import NavBar from "../../components/NavBar/NavBar";
import "./Music.css";
import { DeezerDataContext } from "../../context/DeezerDataContext";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Music = () => {
  const { playlistData, isLoadingPlaylists } = useContext(DeezerDataContext);

  return (
    <div className="main-wrapper center">
      <div className="music-wrapper">
        <Logo className={"logo-black"} />
        <h1 className="padding-top-bottom">Our Playlist Favorites</h1>
        <p>find your inner peace</p>

        {isLoadingPlaylists ? (
          <LoadingSpinner text="Loading playlists..." />
        ) : (
          playlistData?.data?.playlists?.items.map((playlist) => (
            <Link 
              to={`/music/${playlist.id}`} 
              state={{ playlistData: playlist }}
              key={playlist.id}
            >
              <div className="playlist-item">
                <div className="playlist-img">
                  <img src={playlist.picture_medium} alt={playlist.title} />
                </div>
                <div className="playlist-info">
                  <h3>
                    {playlist.title.length > 20
                      ? `${playlist.title.substring(0, 10)}`
                      : playlist.title}
                  </h3>
                  <p className="subtitle">
                    {playlist.description?.length > 50
                      ? `${playlist.description.substring(0, 50)}...`
                      : playlist.description || 'No description'}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}

        {/* {playlistData?.tracks?.items?.map(item => (
				<MusicItem
				key={item.id}
				title={item.name}
				duration={item.duration_ms}
				/>
			))} */}
        <NavBar />
      </div>
    </div>
  );
};

export default Music;
