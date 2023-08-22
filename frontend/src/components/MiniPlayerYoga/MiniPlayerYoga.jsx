import { useContext, useEffect, useState } from "react";
import PlayButton from "../PlayButton/PlayButton";
import "./MiniPlayerYoga.css";
import { VideoDataContext } from "../../context/VideoDataContext";
import { MusicDataContext } from "../../context/MusicDataContext";
import PlayBtn from "../../assets/img/Icons/PlayBtn.svg";
import { Link } from "react-router-dom";

const MiniPlayerYoga = props => {
	const { exerciseData } = useContext(VideoDataContext);
	const { playlistData } = useContext(MusicDataContext);

	let newDate = new Date();
	let date = newDate.getDate();
	let month = newDate.toLocaleString("en-US", { month: "short" }).toUpperCase();

	//* bugfix 228
	const currentDate = new Date();
	const dateString = currentDate.toISOString().split("T")[0]; //the date in 'YYYY-MM-DD' format

	const storedDate = localStorage.getItem("recommendedDate");
	const storedMediation = JSON.parse(
		localStorage.getItem("recommendedMediation"),
	);
	const storedExercise = JSON.parse(
		localStorage.getItem("recommendedExercise"),
	);

	const getRandomItem = array => {
		if (!array || array.length === 0) {
			return null;
		}

		const randomIndex = Math.floor(Math.random() * array.length);
		return array[randomIndex];
	};

	let randomMediation;
	let randomExercise;

	if (storedDate === dateString && storedMediation && storedExercise) {
		randomMediation = storedMediation;
		randomExercise = storedExercise;
	} else {
		randomMediation = getRandomItem(playlistData?.data?.playlists?.items);
		randomExercise = getRandomItem(exerciseData?.data);

		localStorage.setItem("recommendedDate", dateString);
		localStorage.setItem(
			"recommendedMediation",
			JSON.stringify(randomMediation),
		);
		localStorage.setItem("recommendedExercise", JSON.stringify(randomExercise));
	}

	return (
		<div className='miniplayer-banner'>
			<div className='miniplayer-baner-left'>
				<h4 className='miniplayer-title'>
					{props.category === "yoga"
						? randomExercise?.title
						: randomMediation?.name}
				</h4>
				<p className='description-banner'>
					{month} {date} • DAILY RECOMMENDATION
				</p>
			</div>
			<Link
				to={
					props.category === "yoga"
						? `/category/${props.category}/${randomExercise._id}`
						: `/category/${props.category}/${randomMediation.id}`
				}
			>
				<div className='play-button'>
					<img src={PlayBtn} alt='Play' />
				</div>
			</Link>
		</div>
	);
};

export default MiniPlayerYoga;
