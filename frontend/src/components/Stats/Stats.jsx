import React from "react";
import "./Stats.css";
import Heart from "../../assets/img/Icons/herz.svg";
import Headphones from "../../assets/img/Icons/headphones.svg";

const Stats = () => {
  return (
    <article className="statsContainer">
      <div className="stats">
        <img src={Heart} alt="Heart"></img>
        <p className="stats">{Math.floor(Math.random() * 10000)} Favorites</p>
      </div>
      <div className="stats">
        <img src={Headphones} alt="Headphones"></img>
        <p>{Math.floor(Math.random() * 10000)} Listenings</p>
      </div>
    </article>
  );
};

export default Stats;
