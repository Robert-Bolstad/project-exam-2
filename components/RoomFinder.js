import Image from "next/image";
import { BASE_URL } from "../settings/api";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";
import { setLocale } from "yup";

const RoomFinder = ({ data }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guests, setGuests] = useState(1);
  const [order, setOrder] = useState();
  const [rooms, setRooms] = useState(data.rooms);
  const [selectedRooms, setSelectedRooms] = useState();

  const router = useRouter();

  let bookedRooms = [];

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("booking-data"));
    if (storageData) {
      setStartDate(new Date(storageData.checkIn));
      setEndDate(new Date(storageData.checkOut));
      setGuests(storageData.guests);
    }
  }, []);

  useEffect(() => {
    if (order) {
      localStorage.setItem("booked-data", JSON.stringify(order));
      router.push("/enquiry");
    }
  }, [order]);

  const handleGuests = (value) => {
    switch (value) {
      case 0:
        setGuests(1);
        break;
      case "":
        setGuests(1);
        break;
      default:
        setGuests(value);
    }
    if (value > 50) {
      setGuests(50);
    }
  };

  const handleRooms = (e) => {
    e.preventDefault();
    const quantity = e.target.value;
    const name = e.target.parentElement.parentElement.querySelector(
      ".room-finder__room-heading"
    ).innerHTML;

    const removeRoom = bookedRooms.filter((room) => room.room.name === name);
    const filteredResults = rooms.filter((room) => room.name === name);

    if (quantity == 0) {
      function removeFromArr() {
        bookedRooms.shift(filteredResults);
      }
      removeFromArr();
    } else {
      function addToArr() {
        if (removeRoom.length === 0) {
          bookedRooms.push({
            room: filteredResults[0],
            quantity: quantity,
          });
        } else {
          bookedRooms.shift(removeRoom);
          bookedRooms.push({
            room: filteredResults[0],
            quantity: quantity,
          });
        }
      }
      addToArr();
    }
  };

  const handleBooking = (e) => {
    e.preventDefault();
    setOrder({
      hotelInfo: data,
      checkIn: startDate,
      checkOut: endDate,
      guests: parseInt(guests),
      bookedRooms: bookedRooms,
    });
  };

  return (
    <section className="room-finder">
      <h3 className="room-finder__heading">Find Available Rooms</h3>
      <div className="room-finder__wrapper">
        <form className="room-finder__form">
          <div className="room-finder__group-wrapper">
            <div className="room-finder__group room-finder__group--checkinn">
              <div className="room-finder__group-inner">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
                <Image
                  className="room-finder__icon"
                  src="/check-inn.svg"
                  width="33"
                  height="33"
                  alt="logo"
                />
                <div className="room-finder__input-btn">
                  <div className="room-finder__input-btn-text--top">
                    {startDate.toDateString().slice(0, 3)}
                  </div>
                  <div className="room-finder__input-btn-text--bottom">
                    {startDate.toDateString().slice(4, 10)}
                  </div>
                </div>
              </div>
            </div>
            <div className="room-finder__group room-finder__group--checkout">
              <div className="room-finder__group-inner">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
                <Image
                  className="room-finder__icon"
                  src="/check-out.svg"
                  width="33"
                  height="33"
                  alt="logo"
                />
                <div className="room-finder__input-btn">
                  <div className="room-finder__input-btn-text--top">
                    {endDate.toDateString().slice(0, 3)}
                  </div>
                  <div className="room-finder__input-btn-text--bottom">
                    {endDate.toDateString().slice(4, 10)}
                  </div>
                </div>
              </div>
            </div>
            <div className="room-finder__group">
              <div className="room-finder__group-inner">
                <Image
                  className="room-finder__icon"
                  src="/user.svg"
                  width="33"
                  height="33"
                  alt="logo"
                />
                <div className="room-finder__input-btn">
                  <div className="room-finder__input-btn-text--top">Guests</div>
                  <input
                    onChange={(e) => handleGuests(e.target.value)}
                    type="number"
                    value={guests}
                    className="room-finder__input-number room-finder__input-btn-text--bottom"
                  ></input>
                </div>
              </div>
            </div>
            <div className="room-finder__group">
              <button className="room-finder__submit">
                <Image
                  className="room-finder__icon"
                  src="/search.svg"
                  width="33"
                  height="33"
                  alt="logo"
                />
                Find Rooms
              </button>
            </div>
          </div>
        </form>
        <p className="room-finder__result-text">
          Available Rooms from you search
        </p>
        <div className="room-finder__result">
          {data.rooms.map((room) => {
            return (
              <div className="room-finder__result-inner">
                <div className="room-finder__image room-finder__image--desktop">
                  <Image
                    src={BASE_URL + room.url}
                    width="1000px"
                    height="666px"
                    alt="logo"
                  />
                </div>
                <div
                  data-selected="no"
                  className="room-finder__card"
                  key={Math.random()}
                >
                  <div className="room-finder__image room-finder__image--mobile">
                    <Image
                      src={BASE_URL + room.url}
                      width="1000px"
                      height="666px"
                      alt="logo"
                    />
                  </div>
                  <h4 className="room-finder__room-heading">{room.name}</h4>
                  <div className="room-finder__room-info">
                    <div className="room-finder__room-info--icon">
                      <Image
                        src="/user.svg"
                        width="15px"
                        height="15px"
                        alt="logo"
                      />
                      {" " + room.max_guests + " guest"}
                    </div>

                    <div>{room.size_m2 + " m2"}</div>
                    <div>{room.bedrooms + " bedroom"}</div>
                  </div>

                  <div className="room-finder__price-wrapper">
                    <span className="room-finder__price">
                      {"$" + room.price}
                    </span>
                    <span className="room-finder__price-info">per night</span>
                  </div>

                  <p className="room-finder__description">{room.description}</p>
                  <div className="room-finder__quantity-wrapper">
                    <h5 className="room-finder__quantity-heading">
                      Choose Quantity
                    </h5>
                    <select
                      onChange={(e) => {
                        handleRooms(e);
                      }}
                      name="quantity"
                      className="room-finder__quantity"
                    >
                      <option className="room-finder__quantity" value={0}>
                        0
                      </option>
                      {room.quantity.map((room) => {
                        return (
                          <option
                            className="room-finder__quantity"
                            key={Math.random()}
                            value={room}
                          >
                            {room}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={(e) => handleBooking(e)}
          className="room-finder__book-btn"
        >
          Book Now
        </button>
      </div>
    </section>
  );
};

export default RoomFinder;
