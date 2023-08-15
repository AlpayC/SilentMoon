import "./Button.css";

const button = (props) => {
  return (
    <>
      <button className="main-btn">{props.text}</button>
    </>
  );
};

export default button;
