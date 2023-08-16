import backImg from "../../assets/img/Icons/back.svg"
import "../BackButton/BackButton.css"
import { useNavigate } from "react-router-dom";

const BackButon = (props) => {
  const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}
  return (
    <>
      <button onClick={goBack} className={props.relativeClass}><img src={backImg}/></button>
    </>
  );
};

export default BackButon;
