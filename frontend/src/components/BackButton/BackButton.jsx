import backImg from "../../assets/img/Icons/back.svg";
import "../BackButton/BackButton.css";
import { useNavigate } from "react-router-dom";
// BUGFIX: Search wird zurückgesetzt 22.08

import { UserDataContext } from "../../context/UserDataContext";
import { useContext } from "react";
import { VideoDataContext } from "../../context/VideoDataContext";
import { DeezerDataContext } from "../../context/DeezerDataContext";

const BackButon = (props) => {
  // BUGFIX: Search wird zurückgesetzt 22.08

  const { resetSearchVideoData } = useContext(VideoDataContext);
  const { refetchData, userData } = useContext(UserDataContext);
  const { resetSearchDeezerData } = useContext(DeezerDataContext);
  const storagedUserData = JSON.parse(
    sessionStorage.getItem("sessionedUserData")
  );

  const userId = storagedUserData?._id || userData?._id || "";
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
    // BUGFIX: Search wird zurückgesetzt 22.08

    if (userId) {
      resetSearchVideoData();
      refetchData(userId);
      resetSearchDeezerData();
    }
  };

  return (
    <>
      <button onClick={goBack} className={props.relativeClass}>
        <img src={backImg} alt="Back" />
      </button>
    </>
  );
};

export default BackButon;
