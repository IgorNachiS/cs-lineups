import React from "react";

const MapLineup = ({ lineup }) => {
  return (
    <div className="lineup">
      <h3>{lineup.name}</h3>
      <p>{lineup.description}</p>
      <iframe
        width="560"
        height="315"
        src={lineup.video}
        title={lineup.name}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MapLineup;
