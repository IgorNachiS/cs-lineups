import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Criar o CSS para a Navbar

const Navbar = () => {
  const maps = [
    { name: "Dust2", img: "/images/dust2.png" },
    { name: "Mirage", img: "/images/mirage.png" },
    { name: "Inferno", img: "/images/inferno.png" },
    { name: "Ancient", img: "/images/ancient.png" },
    { name: "Overpass", img: "/images/overpass.png" },
  ];

  return (
    <nav className="navbar">
      {maps.map((map) => (
        <Link to={`/map/${map.name.toLowerCase()}`} key={map.name} className="nav-link">
          <img src={map.img} alt={map.name} className="nav-image" />
          <span>{map.name}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
