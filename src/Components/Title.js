import React from "react";
import Logo from "../img/Logo.png";
import OSrings from "../img/OSrings.png";
export const Title = () => {
  return (
    <h1 className="title-container">
      <img className="desktop-logo" src={Logo} alt="Logo" />
      <div className="header-container">
        <span>2Sweden</span>
        <span className="title-logoitem">
          <img className="logo" src={Logo} alt="Logo" />S
        </span>
        <span>2024</span>
      </div>
      <img className="os-rings" src={OSrings} alt="OS Rings" />
    </h1>
  );
};
