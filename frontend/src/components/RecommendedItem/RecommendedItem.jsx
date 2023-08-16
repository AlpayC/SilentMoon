import { Link } from "react-router-dom";
import "./RecommendedItem.css";
import BackupImage from "../../assets/img/BackupImage/yoga.jpg";
import { useState } from "react";

const RecommendedItem = props => {
	const [imageError, setImageError] = useState(false); //track image load errors

	const handleImageError = () => {
		setImageError(true);
	};
	return (
		<div className='recommended-item'>
			<Link to={props.link}>
				<img
					alt='Yoga Image'
					src={imageError ? BackupImage : props.image}
					onError={handleImageError} // Call handleImageError on image load error
				/>
				<h3>{props.title}</h3>
				<div className='item-bottom'>
					<p className='subtitle-small'>{props.level.toUpperCase()}</p>
					<p className='subtitle-small'>{props.duration}</p>
				</div>
			</Link>
		</div>
	);
};

export default RecommendedItem;
