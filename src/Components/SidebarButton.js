import React from "react";
import "../Css/SidebarButton.css";

const sidebarButton = props => (
  <button className="sidebar-button" onClick={props.click}>
    <div className="sidebar-button-line" />
    <div className="sidebar-button-line" />
    <div className="sidebar-button-line" />
  </button>
);

export default sidebarButton;
