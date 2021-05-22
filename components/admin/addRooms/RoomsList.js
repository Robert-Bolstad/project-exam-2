import React from "react";
import Rooms from "./Rooms";

function RoomsList({ rooms, removeRoom }) {
  return (
    <>
      {rooms.map((room) => {
        return (
          <ul className="AddRooms__list">
            <Rooms
              key={room.id}
              room={room}
              file={room.file}
              removeRoom={removeRoom}
            />
          </ul>
        );
      })}
    </>
  );
}

export default RoomsList;
