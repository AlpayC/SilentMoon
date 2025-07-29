import React from "react";
import "./MusicItem.css";
import { Link } from "react-router-dom";
import PlayButtonGrey from "../PlayButtonGrey/PlayButtonGrey";

const MusicItem = props => {
	//convert milliseconds to minutes and seconds
	function convertMillisecondsToMinutesAndSeconds(milliseconds) {
		const totalSeconds = Math.floor(milliseconds / 1000);
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;

		return {
			minutes: minutes,
			seconds: seconds,
		};
	}

	const duration = convertMillisecondsToMinutesAndSeconds(props.duration);

	return (
		<Link to={`/meditationplayer/${props.link}`}>
			<div className={`music-item cloumn ${!props.hasPreview ? 'no-preview' : ''}`}>
				<PlayButtonGrey />
				<div>
					<h4>{props.title}</h4>
					<p className='subtitle-small'>
						{duration.minutes}:{duration.seconds < 10 ? "0" : ""}
						{duration.seconds} MIN
						{!props.hasPreview && " • Preview unavailable"}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default MusicItem;
