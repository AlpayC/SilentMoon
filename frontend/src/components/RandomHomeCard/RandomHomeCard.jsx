import "./RandomHomeCard.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import BackupImage from "../../assets/img/BackupImage/yoga.jpg";

const RandomHomeCard = props => {
	const getRandomItem = array => {
		if (!array || array.length === 0) {
			return null;
		}

		const randomIndex = Math.floor(Math.random() * array.length);
		return array[randomIndex];
	};

	const randomExercise = getRandomItem(props.data?.data);

	const [imageError, setImageError] = useState(false); //track image load errors

	const handleImageError = () => {
		setImageError(true);
	};

	return (
		<>
			{/*  only render if the condition randomExercise is true */}
			{randomExercise && (
				<Link to={`/category/${props.category}/${randomExercise._id}`}>
					<div className='random-img-container'>
						<img
							src={imageError ? BackupImage : randomExercise.image_url}
							alt={props.category}
							onError={handleImageError}
						/>
						<div>
							<h3>{randomExercise.title}</h3>
							<p className='subtitle'>{randomExercise.level}</p>
							<p className='subtitle-small'>{randomExercise.duration}</p>
						</div>
					</div>
				</Link>
			)}

			<h1>TEST</h1>
		</>
	);
};

export default RandomHomeCard;
