import "./ExerciseSlider.css";
import RecommendedItem from "../RecommendedItem/RecommendedItem";

const ExerciseSlider = (props) => {
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

  const randomExercises = getRandomItems(props.data?.data || [], 8);
  return (
    <section className="slider">
      {randomExercises?.length > 0 ? (
        randomExercises.map((exercice) => (
          <RecommendedItem
            key={exercice._id}
            link={`/category/${props.category}/${exercice._id}`}
            image={exercice.image_url}
            title={exercice.title}
            level={exercice.level}
            duration={exercice.duration}
          />
        ))
      ) : (
        <p>No matching results.</p>
      )}
    </section>
  );
};

export default ExerciseSlider;
