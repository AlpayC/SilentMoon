import { Link } from "react-router-dom";
import "./RecommendedItem.css";
import BackupImage from "../../assets/img/BackupImage/yoga.jpg";

import MeditationImage from "../../assets/img/BackupImage/meditation.jpg";
import MeditationImage2 from "../../assets/img/BackupImage/meditation2.jpg";
import MeditationImage3 from "../../assets/img/BackupImage/meditation3.jpg";
import MeditationImage4 from "../../assets/img/BackupImage/meditation4.jpg";
import MeditationImage5 from "../../assets/img/BackupImage/meditation5.jpg";
import MeditationImage6 from "../../assets/img/BackupImage/meditation6.jpg";
import MeditationImage7 from "../../assets/img/BackupImage/meditation7.jpg";
import MeditationImage8 from "../../assets/img/BackupImage/meditation8.jpg";
import MeditationImage9 from "../../assets/img/BackupImage/meditation9.jpg";
import MeditationImage10 from "../../assets/img/BackupImage/meditation10.jpg";

const RecommendedItem = props => {
	const getRandomItem = array => {
		if (!array || array.length === 0) {
			return null;
		}

		const randomIndex = Math.floor(Math.random() * array.length);
		return array[randomIndex];
	};
	const randomImages = [
		MeditationImage,
		MeditationImage2,
		MeditationImage3,
		MeditationImage4,
		MeditationImage5,
		MeditationImage6,
		MeditationImage7,
		MeditationImage8,
		MeditationImage9,
		MeditationImage10,
	];
	let randomImage = getRandomItem(randomImages);

	return (
		<div className='recommended-item'>
			<Link to={props.link}>
				<img alt='Yoga Image' src={props.image ? props.image : randomImage} />
				<h3>{props.title}</h3>
				<div className='item-bottom'>
					<p className='subtitle-small'>
						{props.level ? props.level.toUpperCase() : `${props.tracks} Tracks`}
					</p>
					<p className='subtitle-small'>
						{props.duration ? props.duration : `by ${props.owner}`}
					</p>
				</div>
			</Link>
		</div>
	);
};

export default RecommendedItem;
