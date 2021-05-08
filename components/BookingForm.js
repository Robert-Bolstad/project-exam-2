import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { BASE_URL } from "../settings/api";
import Image from "next/image";

const Booking = () => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .required("* Please enter your first name")
      .min(3, "* First Name must be at least 3 characters"),

    lastName: yup
      .string()
      .required("* Please enter your last name")
      .min(4, "* Last Name must be at least 4 characters"),

    email: yup
      .string()
      .required("* Please enter an email address")
      .email("* Please enter a valid email address"),

    phone: yup
      .number()
      .required("* Please enter your last name")
      .min(8, "* Subject must be at least 8 characters"),

    message: yup
      .string()
      .required("* Please enter an message")
      .min(10, "* The message must be at least 10 characters"),
  });

  function successHtml() {
    return (
      <>
        <p>Message sendt</p>
        <div className="contact-form__check-img">
          <Image src="/check.svg" width="12" height="12" alt="check icon" />
        </div>
      </>
    );
  }

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setSubmitting(true);

    try {
      const response = await axios.post(BASE_URL + "/enquiries", data);
      console.log(data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setSubmitting(false);
      setSuccess(successHtml());
    }
  };
  return (
    <div className="bookingForm">
      <h2 className="bookingForm__heading">Reservation Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="bookingForm-form">
        <div className="bookingForm__success">{success}</div>
        <fieldset className="bookingForm__fieldset" disabled={submitting}>
          <div className="bookingForm__wrapper">
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
                type="number"
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
                Message
              </label>
              <textarea
                className="bookingForm__textbox"
                name="message"
                ref={register}
                type="text"
                id="bookingForm__input--textbox"
              />
              {errors.message && (
                <span className="booking__error-message">
                  {errors.message.message}
                </span>
              )}
            </div>
          </div>

          <div className="bookingForm__group">
            <button className="bookingForm__submit">Submit</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Booking;
