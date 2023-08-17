import "./PlayButton.css";
import PlayBtn from "../../assets/img/Music/playBtn.png";

const PlayButton = () => {
	return (
		<>
			<img src={PlayBtn} alt='Play' className='play-btn' />
		</>
	);
};

export default PlayButton;
