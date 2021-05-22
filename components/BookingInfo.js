import Image from "next/image";
import { BASE_URL } from "../settings/api";
const BookingInfo = ({
  data,
  calculateRoomPrice,
  calculateDays,
  calculateSubtotal,
}) => {
  const startDate = new Date(data.checkIn);
  const endDate = new Date(data.checkOut);

  return (
    <div className="bookingInfo">
      <div className="bookingInfo__img">
        <Image
          className="room-finder__icon"
          src={BASE_URL + data.hotelInfo.image[0].url}
          width={data.hotelInfo.image[0].width}
          height={data.hotelInfo.image[0].height}
          alt="hotel image"
        />
      </div>

      <h2 className="bookingInfo__heading">Your order</h2>
      <div className="bookingInfo__inner">
        <div className="bookingInfo__wrapper">
          <h3 className="bookingInfo__booked-details">Booked Details:</h3>
          <ul className="bookingInfo__list">
            <li className="bookingInfo__item">
              Accommodation:
              {" " + data.hotelInfo.name}
            </li>
            <li className="bookingInfo__item">
              Check In:
              {" " + startDate.toDateString() + " 12:00AM"}
            </li>
            <li className="bookingInfo__item">
              Check Out:
              {" " + endDate.toDateString() + " 03:00AM"}
            </li>
          </ul>
        </div>
        <div className="bookingInfo__wrapper">
          <h3 className="bookingInfo__booked-rooms">Booked Rooms:</h3>
          <ul className="bookingInfo__list">
            {data.bookedRooms.map((room) => {
              return (
                <li className="bookingInfo__item" key={Math.random()}>
                  {room.quantity +
                    " x " +
                    room.room.name +
                    " $" +
                    room.room.price +
                    " x" +
                    calculateDays(startDate, endDate) +
                    " Days"}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="bookingInfo__subtotal-wrapper">
        <h3 className="bookingInfo__subtotal-heading">Subtotal:</h3>
        <p className="bookingInfo__subtotal">
          $
          {calculateSubtotal(
            calculateRoomPrice(data.bookedRooms),
            calculateDays(startDate, endDate)
          )}
        </p>
      </div>
    </div>
  );
};

export default BookingInfo;
