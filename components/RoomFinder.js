import Image from "next/image";
import { BASE_URL } from "../settings/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const RoomFinder = ({ data }) => {
  const dateToday = new Date().toISOString();
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateTomorrow = new Date(tomorrow).toISOString();
  const [rooms, setRooms] = useState(data.rooms);
  const [inputValue, setInputValue] = useState({
    checkIn: dateToday.slice(0, 10),
    checkOut: dateTomorrow.slice(0, 10),
    guests: 1,
  });

  const router = useRouter();

  let bookedRooms = [];

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("booking-details"));
    if (storageData && storageData.id == data.id) {
      const checkIn = new Date(storageData.checkIn).toISOString();
      const checkOut = new Date(storageData.checkOut).toISOString();
      setInputValue({
        ...inputValue,
        checkOut: checkOut.slice(0, 10),
        checkIn: checkIn.slice(0, 10),
        guests: storageData.guests,
      });
    }
  }, []);

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

  const handleBooking = () => {
    if (bookedRooms.length > 0) {
      localStorage.setItem(
        "booked-data",
        JSON.stringify({
          hotelInfo: data,
          checkIn: inputValue.checkIn,
          checkOut: inputValue.checkOut,
          guests: inputValue.guests,
          bookedRooms: bookedRooms,
        })
      );
      router.push("/enquiry");
    } else {
      alert("You need to select a room first");
    }
  };

  const updateFutureDate = (date) => {
    if (date >= inputValue.checkOut) {
      let newDate = new Date(date);
      newDate.setDate(newDate.getDate() + 1);
      const nextDay = new Date(newDate).toISOString();
      setInputValue({
        ...inputValue,
        checkOut: nextDay.slice(0, 10),
        checkIn: date.slice(0, 10),
      });
    }
  };

  const updatePastDate = (date) => {
    if (date <= inputValue.checkIn) {
      let newDate = new Date(date);
      newDate.setDate(newDate.getDate() - 1);
      const pastDay = new Date(newDate).toISOString();
      setInputValue({
        ...inputValue,
        checkOut: date.slice(0, 10),
        checkIn: pastDay.slice(0, 10),
      });
    }
  };

  const handleInputChange = (e) => {
    switch (e.target.name) {
      // case "search":
      //   setInputValue({ ...inputValue, name: e.target.value });
      //   break;
      case "checkIn":
        if (e.target.value <= dateToday) {
          setInputValue({ ...inputValue, checkIn: dateToday.slice(0, 10) });
        } else {
          setInputValue({ ...inputValue, checkIn: e.target.value });
          updateFutureDate(e.target.value);
        }

        break;
      case "checkOut":
        if (e.target.value <= dateTomorrow) {
          setInputValue({
            ...inputValue,
            checkOut: dateTomorrow.slice(0, 10),
            checkIn: dateToday.slice(0, 10),
          });
        } else {
          setInputValue({ ...inputValue, checkOut: e.target.value });
          updatePastDate(e.target.value);
        }

        break;
      case "guests":
        setInputValue({ ...inputValue, guests: e.target.value });

        break;
    }
  };

  return (
    <section className="room-finder" id="rooms">
      <div className="room-finder__wrapper">
        <form className="room-finder__form">
          <h3 className="room-finder__heading">Your booking data</h3>
          <fieldset className="room-finder__fieldset">
            <div className="room-finder__wrapper">
              <div className="room-finder__group room-finder__group--check-in">
                <span className="room-finder__group-type">Check In</span>
                <div>
                  <img
                    className="room-finder__img"
                    src="/check-In.svg"
                    alt="icon"
                  />
                  <input
                    className="room-finder__check-in room-finder__input"
                    type="date"
                    name="checkIn"
                    value={inputValue.checkIn}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>
              <div className="room-finder__group room-finder__group--check-out">
                <span className="room-finder__group-type">Check Out</span>
                <div className="room-finder__input-wrapper">
                  <img
                    className="room-finder__img"
                    src="/check-out.svg"
                    alt="icon"
                  />
                  <input
                    name="checkOut"
                    className="room-finder__check-out room-finder__input"
                    type="date"
                    value={inputValue.checkOut}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>
              <div className="room-finder__group room-finder__group--guests">
                <span className="room-finder__group-type">Guests</span>
                <div className="room-finder__input-wrapper">
                  <img
                    className="room-finder__img"
                    src="/user.svg"
                    alt="icon"
                  />
                  <input
                    className="room-finder__input"
                    type="number"
                    name="guests"
                    min="1"
                    max="50"
                    value={inputValue.guests}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="1"
                  />
                </div>
              </div>
            </div>
          </fieldset>
        </form>
        <p className="room-finder__result-text">Rooms Available</p>

        <div className="room-finder__result">
          {data.rooms.map((room) => {
            return (
              <div key={Math.random()} className="room-finder__result-inner">
                <div className="room-finder__image room-finder__image--desktop">
                  <Image
                    src={data.image[0].url}
                    width="1000px"
                    height="666px"
                    alt="image of room"
                  />
                </div>
                <div
                  data-selected="no"
                  className="room-finder__card"
                  key={Math.random()}
                >
                  <div className="room-finder__image room-finder__image--mobile">
                    <Image
                      src={data.image[0].url}
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
        <div className="room-finder__book-btn-wrapper">
          <button
            type="button"
            onClick={() => handleBooking()}
            className="room-finder__book-btn"
          >
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default RoomFinder;
