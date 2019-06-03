import React from "react";
import SearchTrip from "./SearchTrip";
import { Navbar } from "./Navbar";
import { Title } from "./Title";
import "../Css/Sidebar.css";

const sidebar = props => {
  let drawerClasses = "sidebar";
  if (props.show) {
    drawerClasses = "sidebar open";
  }
  return (
    <div className={drawerClasses}>
      <React.Fragment>
        <Title />
        <Navbar />
        <SearchTrip doSearch={props.doSearch} />
      </React.Fragment>
    </div>
  );
};

export default sidebar;
