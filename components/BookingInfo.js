import Image from "next/image";
import { BASE_URL } from "../settings/api";
import { useContext, useEffect, useState } from "react";
const BookingInfo = ({ data }) => {
  return (
    <div className="bookingInfo">
      <Image
        className="room-finder__icon"
        src={BASE_URL + data.hotelInfo.image.url}
        width="1000"
        height="667"
        alt="logo"
      />
      <h2 className="bookingInfo__heading">Your order</h2>
      <p>Accommodation: {data.hotelInfo.name}</p>
      <p>{`Check In: ${data.checkInn}`}</p>
      <p>{`Check Out: ${data.checkOut}`}</p>
      <ul>
        {data.rooms.map((room) => {
          return (
            <li key={Math.random()}>
              {room[0].name} {"$" + room[0].price + "x2"}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BookingInfo;
