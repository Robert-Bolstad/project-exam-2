import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { BASE_URL } from "../settings/api";
import Image from "next/image";
import { schema } from "../utils/schemaValidators/contactFormValidators";

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

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
      await axios.post(BASE_URL + "/messages", data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setSubmitting(false);
      setSuccess(successHtml());
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
      <div className="contact-form__success">{success}</div>
      <fieldset className="contact-form__fieldset" disabled={submitting}>
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
              <span className="form__error-message">
                {errors.email.message}
              </span>
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
          <button
            type="submit"
            className="contact-form__submit"
            disabled={submitting}
          >
            {submitting ? "Submitting" : "Submit"}
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default ContactForm;
