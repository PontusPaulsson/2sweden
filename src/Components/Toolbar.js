import React from "react";
import SidebarButton from "./SidebarButton";
import "../Css/Toolbar.css";

const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar-navigation">
      <div className="toolbar-button">
        <SidebarButton click={props.sidebarClickHandler} />
      </div>
      <div className="toolbar-menu">
        <span>Menu/New Search</span>
      </div>
      <div className="spacer" />
      <div className="toolbar-items" />
    </nav>
  </header>
);

export default toolbar;
