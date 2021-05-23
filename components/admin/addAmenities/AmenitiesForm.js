import { useState } from "react";

function AmenitiesForm({ addItem, placeholderText }) {
  const [item, setItem] = useState({
    id: "",
    amenitie: "",
  });

  function handleItemInputChange(e) {
    setItem({ ...item, amenitie: e.target.value });
  }

  function handleClick(e) {
    e.preventDefault();
    if (item.amenitie.trim()) {
      addItem({ ...item, id: Math.random() });
      setItem({ ...item, amenitie: "" });
    }
  }
  return (
    <div>
      <input
        className="AddAmenities__input"
        placeholder={placeholderText}
        name="amenitie"
        type="text"
        value={item.amenitie}
        onChange={handleItemInputChange}
      />
      <button className="AddAmenities__add-btn" onClick={(e) => handleClick(e)}>
        Add Item
      </button>
    </div>
  );
}

export default AmenitiesForm;
