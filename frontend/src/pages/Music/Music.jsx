import { useContext } from "react";
import Logo from "../../components/Logo/Logo";
import NavBar from "../../components/NavBar/NavBar";
import "./Music.css";
import { MusicDataContext } from "../../context/MusicDataContext";
import MusicItem from "../../components/MusicItem/MusicItem";
import PlayButtonGrey from "../../components/PlayButtonGrey/PlayButtonGrey";

const Music = () => {
	const { musicData } = useContext(MusicDataContext);
	console.log(musicData);
	return (
		<div className='main-wrapper center'>
			<Logo className={"logo-black"} />
			<h2>Our Music Favorites</h2>
			<p>find your inner peace</p>
			{musicData?.tracks?.items?.map(item => (
				<MusicItem
					key={item.id}
					title={item.name}
					duration={item.duration_ms}
				/>
			))}

			<NavBar />
		</div>
	);
};

export default Music;
