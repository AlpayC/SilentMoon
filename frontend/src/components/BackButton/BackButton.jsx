import backImg from "../../assets/img/Icons/back.svg"
import "../BackButton/BackButton.css"

const BackButon = () => {
  return (
    <>
      <button className="back-btn"><img src={backImg}/></button>
    </>
  );
};

export default BackButon;
