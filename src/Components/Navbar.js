import React from "react";

export const Navbar = () => {
  return (
    <nav data-test="nav-bar-container">
      <ul className="nav-list">
        <li className="nav-item">Search Transport</li>
        <li className="nav-item">About the Event</li>
        <li className="nav-item">
          About the Locations
          <ul className="dropdown-content">
            <li>Stockholm</li>
            <li>Åre</li>
            <li>Falun</li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};
