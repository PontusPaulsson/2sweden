import React from "react";
import BamseGif from "../img/Bamse.gif";
import BamseHead from "../img/bamse-head.png";

export const Bamse = () => {
  return (
    <div className="bamse-container">
      <img className="bamse-right" src={BamseGif} alt="Nothing to see here.." />
      <img className="bamse-left" src={BamseGif} alt="Nothing to see here.." />
      <img className="bamse-head" src={BamseHead} alt="Head" />
    </div>
  );
};
