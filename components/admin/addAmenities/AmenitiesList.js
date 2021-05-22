import React from "react";
import Amenities from "./Amenities";

function AmenitiesList({ amenities, removeItem, toggleFeatured }) {
  return (
    <ul className="AddAmenities__list">
      {amenities.map((item) => {
        return (
          <Amenities
            key={item.id}
            item={item}
            removeItem={removeItem}
            toggleFeatured={toggleFeatured}
          />
        );
      })}
    </ul>
  );
}

export default AmenitiesList;
