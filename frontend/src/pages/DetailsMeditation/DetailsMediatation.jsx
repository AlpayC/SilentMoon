import "./DetailsMediatation.css";
import BackButton from "../../components/BackButton/BackButton";
import Stats from "../../components/Stats/Stats";

const DetailsMediatation = () => {
  return (
    <>
      <h1>Meditation details</h1>
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

export default DetailsMediatation;
