import CloseBtn from "../../assets/img/Icons/CloseBtn.svg";
import { useNavigate } from "react-router-dom";

const CloseButton = (props) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <button onClick={goBack} className={props.relativeClass}>
        <img src={CloseBtn} />
      </button>
    </>
  );
};

export default CloseButton;
