import React from "react";
import SearchTrip from "./SearchTrip";
import Navbar from "./Navbar";
import { Title } from "./Title";
import "../Css/Sidebar.css";

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

        <Navbar
          showHomescreen={props.showHomescreen}
          showSchedule={props.showSchedule}
        />
        <SearchTrip doSearch={props.doSearch} />
      </React.Fragment>
    </div>
  );
};

export default sidebar;
