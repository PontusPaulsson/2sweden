import React from "react";
import SearchTrip from "./SearchTrip";
import Navbar from "./Navbar";
import { Title } from "./Title";
import "../Css/Sidebar.css";
import Hej from "../img/hej.png";

const sidebar = props => {
  // om sidebaren är öppen så påverkas/stylas både "sidebar" och "open" classerna. ena eller båda sparas i en sträng som jag anv i className
  let sidebarClasses = "sidebar";
  if (props.sidebarOpen) {
    sidebarClasses = "sidebar open";
  }
  return (
    <div className={sidebarClasses}>
      <React.Fragment>
        <Title />

        <Navbar />
        <SearchTrip doSearch={props.doSearch} />
        <img className="hej" src={Hej} />
      </React.Fragment>
    </div>
  );
};

export default sidebar;
