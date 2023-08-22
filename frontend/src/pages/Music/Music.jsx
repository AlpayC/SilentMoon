import { useContext } from "react";
import Logo from "../../components/Logo/Logo";
import NavBar from "../../components/NavBar/NavBar";
import "./Music.css";
import { MusicDataContext } from "../../context/MusicDataContext";
import { Link } from "react-router-dom";

const Music = () => {
  const { playlistData } = useContext(MusicDataContext);

  return (
    <div className="main-wrapper center">
      <div className="music-wrapper">
        <Logo className={"logo-black"} />
        <h1 className="padding-top-bottom">Our Playlist Favorites</h1>
        <p>find your inner peace</p>

        {playlistData?.data?.playlists?.items.map((playlist) => (
          <Link to={`/music/${playlist.id}`} key={playlist.id}>
            <div className="playlist-item">
              <div className="playlist-img">
                <img src={playlist.images[0].url} alt={playlist.name} />
              </div>
              <div className="playlist-info">
                <h3>
                  {playlist.name.length > 20
                    ? `${playlist.name.substring(0, 10)}`
                    : playlist.name}
                </h3>
                <p className="subtitle">
                  {playlist.description.length > 50
                    ? `${playlist.description.substring(0, 50)}...`
                    : playlist.description}
                </p>
              </div>
            </div>
          </Link>
        ))}

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
