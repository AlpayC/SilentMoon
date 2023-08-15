import backImg from "../../assets/img/Icons/back.svg"
import "../BackButton/BackButton.css"
import { useNavigate } from "react-router-dom";

const BackButon = () => {
  const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}
  return (
    <>
      <button onClick={goBack} className="back-btn"><img src={backImg}/></button>
    </>
  );
};

export default BackButon;
