import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__border"></div>
        <div className="footer__brand">
          <Image
            className="footer__logo"
            src="/logo.svg"
            width="40"
            height="40"
            alt="logo"
          />
          <div className="footer__logo-text">
            <div className="footer__site-name">
              Holidaze.<span className="footer__site-name--color">com</span>
            </div>
            <div className="footer__site-subline">Accommodations in bergen</div>
          </div>
        </div>
        <ul className="footer__contact">
          <li className="footer__contact-item">
            <Image
              className="footer__icon"
              src="/phone.svg"
              width="15"
              height="15"
              alt="Phone icon"
            />
            <div className="footer__contact-text">Phone: 00 00 00 00</div>
          </li>
          <li className="footer__contact-item">
            <Image
              className="footer__icon"
              src="/mail.svg"
              width="15"
              height="15"
              alt="Email icon"
            />
            <div className="footer__contact-text">Email: email@email.com</div>
          </li>
          <li className="footer__contact-item">
            <Image
              className="footer__icon"
              src="/location.svg"
              width="15"
              height="15"
              alt="Adress Icon"
            />
            <div className="footer__contact-text">Location: location</div>
          </li>
        </ul>
        <ul className="footer__links">
          <li className="footer__link-item">
            <Link href="/accommodations">
              <a className="footer__link">Accommodations</a>
            </Link>
          </li>
          <li className="footer__link-item">
            <Link href="/">
              <a className="footer__link">Home</a>
            </Link>
          </li>
          <li className="footer__link-item">
            <Link href="/contact">
              <a className="footer__link">Contact</a>
            </Link>
          </li>
          <li className="footer__link-item">
            <Link href="/login">
              <a className="footer__link">Login</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <ul className="footer__social">
            <li className="footer__social-item">
              <Image
                className="footer__social-icon"
                src="/facebook.svg"
                width="30"
                height="30"
                alt="Facebook icon"
              />
            </li>
            <li className="footer__social-item">
              <Image
                className="footer__social-icon"
                src="/instagram.svg"
                width="30"
                height="30"
                alt="Instagram icon"
              />
            </li>
            <li className="footer__social-item">
              <Image
                className="footer__social-icon"
                src="/twitter.svg"
                width="30"
                height="30"
                alt="Twitter icon"
              />
            </li>
          </ul>
          <p className="footer__copyright">@2021 Holidaze.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
