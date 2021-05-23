import Rooms from "./Rooms";

function RoomsList({ rooms, removeRoom }) {
  return (
    <>
      {rooms.map((room) => {
        return (
          <ul key={room.id} className="AddRooms__list">
            <Rooms room={room} file={room.file} removeRoom={removeRoom} />
          </ul>
        );
      })}
    </>
  );
}

export default RoomsList;
