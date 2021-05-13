import React from "react";
import Amenities from "./Amenities";

function AmenitiesList({ amenities, removeItem }) {
  return (
    <ul>
      {amenities.map((item) => {
        return <Amenities key={item.id} item={item} removeItem={removeItem} />;
      })}
    </ul>
  );
}

export default AmenitiesList;
