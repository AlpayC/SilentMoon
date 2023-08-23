import "./DetailsYoga.css";
import BackButton from "../../components/BackButton/BackButton";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";
import Stats from "../../components/Stats/Stats";
import { VideoDataContext } from "../../context/VideoDataContext";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import NavBar from "../../components/NavBar/NavBar";

const DetailsYoga = () => {
  const { id } = useParams();
  const params = useParams();
  // console.log("Extracted id:", id);
  const { exerciseData } = useContext(VideoDataContext);

  //* Simple loader
  if (!exerciseData || !exerciseData.data) {
    return <div>Loading...</div>;
  }

  //* Use the find method on exerciseData.data
  const thisItem = exerciseData.data.find((item) => item._id === id);
  // console.log("Matching item:", thisItem);

  if (!thisItem) {
    return <div>Nothing found.</div>;
  }

  return (
    <>
      <div className="video-details">
        <div className="video-wrapper">
          <div className="video-header">
            <BackButton relativeClass="back-btn-filled" />
            <FavoriteButton
              relativeClass="back-btn-filled"
              itemId={params}
              categoryName={"yoga"}
            />
          </div>
          <video playsInline autoPlay muted loop poster={thisItem.image_url}>
            <source src={thisItem.secure_url} type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="main-wrapper center">
        <div className="left gap2">
          <h1>{thisItem.title}</h1>
          <section>
            <div></div>
            <div>
              <p>{thisItem.level.toUpperCase()}</p>
              <div className="statsContainerNew">
              <Stats />
              </div>
            </div>
          </section>
        </div>
        <NavBar />
      </div>
    </>
  );
};

export default DetailsYoga;
