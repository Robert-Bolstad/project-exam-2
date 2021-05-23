import RoomsList from "../addRooms/RoomsList";
import RoomsForm from "../addRooms/RoomsForm";
import { useEffect, useState } from "react";

const AddRooms = ({ editData, getRooms }) => {
  const [rooms, setRooms] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // useEffect(() => {
  //   const storageData = JSON.parse(localStorage.getItem("rooms"));
  //   if (storageData) {
  //     setRooms(storageData);
  //   }
  // }, []);

  useEffect(() => {
    if (rooms) {
      getRooms(rooms);
    }
  }, [submitting]);

  function addRooms(room) {
    setRooms([room, ...rooms]);
  }

  function removeRoom(id) {
    setRooms(rooms.filter((room) => room.id !== id));
  }

  const handleSubmit = () => {
    setSubmitting(true);
    getRooms(rooms);
  };

  useEffect(() => {
    if (editData) {
      let roomsInfo = editData.rooms;

      roomsInfo.forEach((room) => {
        let quantityNr = room.quantity.length - 1;

        room.quantity = quantityNr;
      });

      setRooms(roomsInfo);
    }
  }, []);

  return (
    <div className="AddRooms">
      <h2 className="AddRooms__heading">Add Rooms</h2>
      <p className="AddRooms__description">Add the rooms you have available</p>
      <RoomsForm addRoom={addRooms} submitting={setSubmitting} />
      <RoomsList rooms={rooms} removeRoom={removeRoom} />
      {rooms.length === 0 && submitting === true ? (
        <p className="AddAmenities__error-message">
          <span className="AddAmenities__error-message--asterisks">{"* "}</span>
          You must at least add one room
        </p>
      ) : null}
      <button
        type="button"
        onClick={handleSubmit}
        className="AddRooms__submit-rooms"
      ></button>
    </div>
  );
};

export default AddRooms;
