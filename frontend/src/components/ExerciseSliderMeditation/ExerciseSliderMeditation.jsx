import "../ExerciseSlider/ExerciseSlider.css";
import RecommendedItem from "../RecommendedItem/RecommendedItem";

const ExerciseSliderMeditation = props => {
	//get Random exercise for recomendation
	const getRandomItems = (array, count) => {
		const shuffledArray = array.slice();
		for (let i = shuffledArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledArray[i], shuffledArray[j]] = [
				shuffledArray[j],
				shuffledArray[i],
			];
		}
		return shuffledArray.slice(0, count);
	};

	console.log("props data", props?.data);
	const randomMeditations = getRandomItems(props?.data || [], 8);
	console.log("randomMed", randomMeditations[0]?.id);
	return (
		<section className='slider'>
			{randomMeditations?.map(exercice => (
				<RecommendedItem
					key={randomMeditations.id}
					link={`/category/${props.category}/${randomMeditations.id}`}
					title={randomMeditations.name}
				/>
			))}
		</section>
	);
};

export default ExerciseSliderMeditation;
