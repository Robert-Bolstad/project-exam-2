import Image from "next/image";
const ContactInfo = () => {
  return (
    <section className="contact-info">
      <ul className="contact-info__list">
        <li className="contact-info__contact-item">
          <Image
            className="contact-info__icon"
            src="/phone.svg"
            width="15"
            height="15"
            alt="Phone icon"
          />
          <div className="contact-info__contact-text">Phone: 00 00 00 00</div>
        </li>
        <li className="contact-info__contact-item">
          <Image
            className="contact-info__icon"
            src="/mail.svg"
            width="15"
            height="15"
            alt="Email icon"
          />
          <div className="contact-info__contact-text">
            Email: email@email.com
          </div>
        </li>
        <li className="contact-info__contact-item">
          <Image
            className="contact-info__icon"
            src="/location.svg"
            width="15"
            height="15"
            alt="Adress Icon"
          />
          <div className="contact-info__contact-text">Location: location</div>
        </li>
      </ul>
      <ul className="contact-info__social">
        <li className="contact-info__social-item">Conect:</li>
        <li className="contact-info__social-item">
          <Image
            className="contact-info__social-icon"
            src="/facebook.svg"
            width="25"
            height="25"
            alt="Facebook icon"
          />
        </li>
        <li className="contact-info__social-item">
          <Image
            className="contact-info__social-icon"
            src="/instagram.svg"
            width="25"
            height="25"
            alt="Instagram icon"
          />
        </li>
        <li className="contact-info__social-item">
          <Image
            className="contact-info__social-icon"
            src="/twitter.svg"
            width="25"
            height="25"
            alt="Twitter icon"
          />
        </li>
      </ul>
    </section>
  );
};

export default ContactInfo;
