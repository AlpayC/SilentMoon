import PlayButton from "../PlayButton/PlayButton";
import "./MiniPlayerYoga.css";

const MiniPlayerYoga = () => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.toLocaleString("en-US", { month: "short" }).toUpperCase();

  return (
    <div className="miniplayer-banner">
      <div className="miniplayer-baner-left">
        <h4 className="miniplayer-title">Daily Calm</h4>
        <p className="description-banner">
          {month} {date} • PAUSE PRACTICE
        </p>
      </div>
      <div className="play-button">
        <PlayButton audioRef={"lückenfüller"} />
      </div>
    </div>
  );
};

export default MiniPlayerYoga;
