import React from "react";

export const Tile = ({ name, description }) => {
  const array = description ? Object.values(description) : [];
  return (
    <div className="tile-container">
      <p className="tile-title">{name}</p>
      {array.map((item, index) => (
        <p className="tile" key={index}>{item}</p>
      ))}
    </div>

  );
};

export default Tile;
