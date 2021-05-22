function Amenities({ item, removeItem, toggleFeatured }) {
  function handleCheckboxClick() {
    toggleFeatured(item.id);
  }
  function handleRemoveClick() {
    removeItem(item.id);
  }
  return (
    <div className="AddAmenities__item-wrapper">
      <button className="AddAmenities__remove-btn" onClick={handleRemoveClick}>
        X
      </button>
      <li className="AddAmenities__item">{item.amenitie}</li>
      {toggleFeatured ? (
        <input
          checked={item.selected}
          type="checkbox"
          className="AddAmenities__checkbox"
          onClick={handleCheckboxClick}
        />
      ) : null}
    </div>
  );
}

export default Amenities;
