import React, { Component } from "react";

class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav data-test="nav-bar-container">
        <ul className="nav-list">
          <li className="nav-item">Search Transport</li>
          <li className="nav-item" onClick={this.props.showSchedule}>Olympic Schedule</li>
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
}

export default Navbar
