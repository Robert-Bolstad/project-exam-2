function Rooms({ room, removeRoom }) {
  function handleRemoveClick() {
    removeRoom(room.id);
  }

  return (
    <>
      <li className="AddRooms__item">
        <span className="AddRooms__item--name">Name:</span>
        {" " + room.name}
      </li>
      <li className="AddRooms__item">
        <span className="AddRooms__item--name">Price:</span>
        {" " + room.price + "$"}
      </li>
      <li className="AddRooms__item">
        <span className="AddRooms__item--name">Max Guests:</span>
        {" " + room.max_guests}
      </li>
      <li className="AddRooms__item">
        <span className="AddRooms__item--name">Room Size:</span>
        {" " + room.size_m2 + " m2"}
      </li>
      <li className="AddRooms__item">
        <span className="AddRooms__item--name">BedRooms:</span>
        {" " + room.bedrooms}
      </li>
      <li className="AddRooms__item">
        <span className="AddRooms__item--name">Quantity:</span>
        {" " + room.quantity + " rooms"}
      </li>
      <li className="AddRooms__item">
        <span className="AddRooms__item--name">Description:</span>
        {" " + room.description}
      </li>

      <button className="AddRooms__remove" onClick={handleRemoveClick}>
        Remove Room
      </button>
    </>
  );
}

export default Rooms;
