import { Link } from "react-router-dom";
import "../RandomHomeCardYoga/RandomHomeCardYoga.css";
import MeditationImage from "../../assets/img/BackupImage/meditation.jpg";
import MeditationImage2 from "../../assets/img/BackupImage/meditation2.jpg";
import MeditationImage3 from "../../assets/img/BackupImage/meditation3.jpg";
import MeditationImage4 from "../../assets/img/BackupImage/meditation4.jpg";
import MeditationImage5 from "../../assets/img/BackupImage/meditation5.jpg";
import MeditationImage6 from "../../assets/img/BackupImage/meditation6.jpg";

const RandomHomeCardMeditation = props => {
	console.log(props.data?.data?.playlists?.items);
	const getRandomItem = array => {
		if (!array || array.length === 0) {
			return null;
		}

		const randomIndex = Math.floor(Math.random() * array.length);
		return array[randomIndex];
	};

	const randomMediation = getRandomItem(props.data?.data?.playlists?.items);
	const randomImages = [
		MeditationImage,
		MeditationImage2,
		MeditationImage3,
		MeditationImage4,
		MeditationImage5,
		MeditationImage6,
	];
	let randomImage = getRandomItem(randomImages);
	return (
		<>
			{/*  only render if the condition randomExercise is true */}
			{randomMediation && (
				<Link to={`/category/${props.category}/${randomMediation.id}`}>
					<div className='random-img-container'>
						<img src={randomImage} alt={props.category} />
						<div className='random-img-content'>
							<h3>{randomMediation.name}</h3>
						</div>
						<div className='random-img-content-bottom'>
							<p className='subtitle-small'>3 - 10 MIN</p>
							<button>START</button>
						</div>
					</div>
				</Link>
			)}
		</>
	);
};

export default RandomHomeCardMeditation;
