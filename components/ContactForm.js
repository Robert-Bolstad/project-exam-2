import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const ContactForm = () => {
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

    subject: yup
      .string()
      .required("* Please enter your last name")
      .min(4, "* Subject must be at least 4 characters"),

    message: yup
      .string()
      .required("* Please enter an message")
      .min(10, "* The message must be at least 10 characters"),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [passValidation, setPassValidation] = useState();

  function onSubmit(data) {
    if (data) {
      setPassValidation("Validation Passed");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
      <div>{passValidation}</div>
      <div className="contact-form__wrapper">
        <div className="contact-form__group">
          <label
            className="contact-form__label"
            htmlFor="contact-form__input--name"
          >
            First name
          </label>
          <input
            ref={register}
            className="contact-form__input contact-form__input--name"
            type="text"
            name="firstName"
            id="contact-form__input--name"
          />
          {errors.firstName && (
            <span className="form__error-message">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div className="contact-form__group">
          <label
            className="contact-form__label"
            htmlFor="contact-form__input--last-name"
          >
            Last name
          </label>
          <input
            ref={register}
            className="contact-form__input contact-form__input--last-name"
            type="text"
            name="lastName"
            id="contact-form__input--last-name"
          />
          {errors.lastName && (
            <span className="form__error-message">
              {errors.lastName.message}
            </span>
          )}
        </div>

        <div className="contact-form__group">
          <label
            className="contact-form__label"
            htmlFor="contact-form__input--email"
          >
            Email
          </label>
          <input
            className="contact-form__input contact-form__input--email"
            type="text"
            name="email"
            ref={register}
            id="contact-form__input--email"
          />
          {errors.email && (
            <span className="form__error-message">{errors.email.message}</span>
          )}
        </div>

        <div className="contact-form__group contact-form__subject">
          <label
            className="contact-form__label"
            htmlFor="contact-form__input--subject"
          >
            Subject
          </label>
          <input
            className="contact-form__input contact-form__input--subject"
            id="contact-form__input--subject"
            type="text"
            name="subject"
            ref={register}
          />
          {errors.subject && (
            <span className="form__error-message">
              {errors.subject.message}
            </span>
          )}
        </div>
      </div>
      <div className="contact-form__wrapper">
        <div className="contact-form__group">
          <label
            className="contact-form__label"
            htmlFor="contact-form__input--textbox"
          >
            Message
          </label>
          <textarea
            className="contact-form__textbox"
            name="message"
            ref={register}
            type="text"
            id="contact-form__input--textbox"
          />
          {errors.message && (
            <span className="form__error-message">
              {errors.message.message}
            </span>
          )}
        </div>
      </div>

      <div className="contact-form__group">
        <button className="contact-form__submit">Submit</button>
      </div>
    </form>
  );
};

export default ContactForm;
