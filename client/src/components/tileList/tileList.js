import React from "react";
import Tile  from "../../components/tile/tile";

export const TileList = ({ users, appointments }) => {
  const items = users || appointments || [];
  if (!Array.isArray(items)) return null;

  return (
    <div>
      {items.map((item, index) => (
        <Tile 
        key={index} 
        name={item.name} 
        description={item.contact ? { contact: item.contact, date: item.date, time: item.time } : { phone: item.phone, email: item.email }}
        />
      ))}
    </div>
  );
};
