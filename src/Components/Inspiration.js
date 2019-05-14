import React from "react";
import Stockholm from "../img/Stockholm.png";
import Are from "../img/Are.PNG";
import Falun from "../img/Falun.png";

export const Inspiration = () => {
  return (
    <div className="img-inspiration">
      <img className="Stockholm" src={Stockholm} alt="Stockholm" />
      <img className="Are" src={Are} alt="Åre" />
      <img className="Falun" src={Falun} alt="Falun" />
    </div>
  );
};
