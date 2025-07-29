import "../ExerciseSlider/ExerciseSlider.css";
import RecommendedItem from "../RecommendedItem/RecommendedItem";

const ExerciseSliderMeditation = (props) => {
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

  const randomMeditations = getRandomItems(props?.data || [], 8);
  return (
    <section className="slider no-margin">
      {randomMeditations?.length > 0 ? (
        randomMeditations?.map((item) => (
          <RecommendedItem
            key={item.id}
            link={`/category/${props.category}/${item.id}`}
            title={
              item.title.length > 20
                ? `${item.title.substring(0, 12)}`
                : item.title
            }
            playlist_id={item.id}
            image={item.picture_medium}
            tracks={item.nb_tracks}
            owner={item.user?.name || 'Deezer'}
            playlistData={item}
          />
        ))
      ) : (
        <p>No matching results.</p>
      )}
    </section>
  );
};

export default ExerciseSliderMeditation;
