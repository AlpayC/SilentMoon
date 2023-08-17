import "./DetailsYoga.css";
import BackButton from "../../components/BackButton/BackButton";
import Stats from "../../components/Stats/Stats";

const DetailsYoga = () => {
  return (
    <>
      <h1>Details Yoga</h1>
      <section>
        <div>
          <BackButton />
        </div>
        <div>
          <Stats />
        </div>
      </section>
    </>
  );
};

export default DetailsYoga;
