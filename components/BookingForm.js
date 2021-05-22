import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { BASE_URL } from "../settings/api";
import Image from "next/image";
import { schema } from "../utils/schemaValidators/enquiryForm";

const Booking = ({
  data,
  calculateRoomPrice,
  calculateDays,
  calculateSubtotal,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  const startDate = new Date(data.checkIn);
  const endDate = new Date(data.checkOut);

  const getRooms = () => {
    let rooms = [];

    data.bookedRooms.forEach((room) => {
      rooms.push({
        name: room.room.name,
        price: room.room.price,
        quantity: parseInt(room.quantity),
      });
    });
    return { rooms: rooms };
  };

  function successHtml() {
    return (
      <>
        <p className="bookingForm__success-text">Booking received</p>
        <div>
          <Image src="/check.svg" width="12" height="12" alt="check icon" />
        </div>
      </>
    );
  }

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const rooms = getRooms();
    const post = Object.assign(data, rooms);
    console.log(post);

    setSubmitting(true);

    try {
      const response = await axios.post(BASE_URL + "/enquiries", post);
    } catch (error) {
      console.log("error", error);
    } finally {
      setSuccess(successHtml());
      localStorage.removeItem("booked-data");
    }
  };
  return (
    <div className="bookingForm">
      <h2 className="bookingForm__heading">Reservation Details</h2>
      <div className="bookingForm__success">{success}</div>
      <form onSubmit={handleSubmit(onSubmit)} className="bookingForm-form">
        <fieldset className="bookingForm__fieldset" disabled={submitting}>
          <div className="bookingForm__wrapper">
            <div className="bookingForm__group bookingForm__group--hidden">
              <input
                ref={register}
                type="text"
                name="hotel"
                defaultValue={data.hotelInfo.name}
              />
            </div>
            <div className="bookingForm__group bookingForm__group--hidden">
              <input
                ref={register}
                type="number"
                name="guests"
                defaultValue={data.guests}
              />
            </div>
            <div className="bookingForm__group bookingForm__group--hidden">
              <input
                ref={register}
                type="text"
                name="checkIn"
                defaultValue={startDate.toISOString()}
              />
            </div>
            <div className="bookingForm__group bookingForm__group--hidden">
              <input
                ref={register}
                type="text"
                name="checkOut"
                defaultValue={endDate.toISOString()}
              />
            </div>
            <div className="bookingForm__group bookingForm__group--hidden">
              <input
                ref={register}
                type="text"
                name="checkOut"
                defaultValue={endDate.toISOString()}
              />
            </div>

            <div className="bookingForm__group bookingForm__group--hidden">
              <input
                ref={register}
                type="text"
                name="subtotal"
                defaultValue={calculateSubtotal(
                  calculateRoomPrice(data.bookedRooms),
                  calculateDays(startDate, endDate)
                )}
              />
            </div>
            <div className="bookingForm__group">
              <label
                className="bookingForm__label"
                htmlFor="bookingForm__input--name"
              >
                First name
              </label>
              <input
                ref={register}
                className="bookingForm__input bookingForm__input--name"
                type="text"
                name="firstName"
                id="bookingForm__input--name"
              />
              {errors.firstName && (
                <span className="form__error-message">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            <div className="bookingForm__group">
              <label
                className="bookingForm__label"
                htmlFor="bookingForm__input--last-name"
              >
                Last name
              </label>
              <input
                ref={register}
                className="bookingForm__input bookingForm__input--last-name"
                type="text"
                name="lastName"
                id="bookingForm__input--last-name"
              />
              {errors.lastName && (
                <span className="booking__error-message">
                  {errors.lastName.message}
                </span>
              )}
            </div>

            <div className="bookingForm__group">
              <label
                className="bookingForm__label"
                htmlFor="bookingForm__input--email"
              >
                Email
              </label>
              <input
                className="bookingForm__input bookingForm__input--email"
                type="text"
                name="email"
                ref={register}
                id="bookingForm__input--email"
              />
              {errors.email && (
                <span className="form__error-message">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="bookingForm__group bookingForm__phone">
              <label
                className="bookingForm__label"
                htmlFor="bookingForm__input--phone"
              >
                Phone
              </label>
              <input
                className="bookingForm__input bookingForm__input--phone"
                id="bookingForm__input--phone"
                type="tel"
                name="phone"
                ref={register}
              />
              {errors.phone && (
                <span className="form__error-message">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>
          <div className="bookingForm__wrapper">
            <div className="contact-form__group">
              <label
                className="bookingForm__label"
                htmlFor="bookingForm__input--textbox"
              >
                Message (Optional)
              </label>
              <textarea
                className="bookingForm__textbox"
                name="message"
                ref={register}
                type="text"
                id="bookingForm__input--textbox"
              />
            </div>
          </div>

          <div className="bookingForm__group">
            <button
              type="submit"
              disabled={submitting}
              className="bookingForm__submit"
              style={submitting ? { opacity: "0.7" } : null}
            >
              {submitting ? "Submitted" : "Submit"}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Booking;
