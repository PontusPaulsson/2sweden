import React from "react";

export const Navbar = () => {
  const links = ["Search Trip", "About the Event", "About the Locations"];
  return (
    <nav>
      <ul className="nav-list">
        {links.map(link => (
          <li className="nav-item" key={link}>
            {link}
          </li>
        ))}
      </ul>
    </nav>
  );
};
