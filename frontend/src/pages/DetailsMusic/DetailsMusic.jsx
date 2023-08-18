import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Stats from "../../components/Stats/Stats";
import NavBar from "../../components/NavBar/NavBar";

const DetailsMusic = () => {
	const [tracksData, setTracksData] = useState();
	const params = useParams();
	console.log(params);

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.post(`/api/spotify/tracks`, params);
			setTracksData(data);
			console.log(data);
		};
		fetchData();
	}, []);

	return (
		<div className='main-wrapper center'>
			<h1>Playlist Name</h1>
			<p>PLAYLIST</p>
			<p className='subtitle'>Playlist Description</p>
			<Stats />
			<NavBar />
		</div>
	);
};

export default DetailsMusic;
