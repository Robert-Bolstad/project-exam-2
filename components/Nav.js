import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const Nav = () => {
  const path = useRouter().pathname;

  function clickBurger() {
    if (path !== "/admin") {
      const list = document.querySelector(".nav__list");
      list.classList.toggle("nav__list--open");
    } else {
      const list = document.querySelector(".nav-admin__list");
      list.classList.toggle("nav-admin__list--open");
    }
  }

  if (path !== "/admin") {
    return (
      <nav className="nav">
        <div className="nav__inner">
          <div className="nav__brand">
            <Image
              className="nav__logo"
              src="/logo.svg"
              width="40"
              height="40"
              alt="logo"
            />
            <div className="nav__logo-text">
              <div className="nav__site-name">
                Holidaze.<span className="nav__site-name--color">com</span>
              </div>
              <div className="nav__site-subline">Accommodations in bergen</div>
            </div>
          </div>
          <button onClick={clickBurger} className="nav__burger">
            <Image
              className="nav__burger-icon"
              src="/burger.svg"
              width="20"
              height="20"
              alt="burger"
            />
          </button>
          <ul className="nav__list">
            <li className="nav__item">
              <Link href="/">
                <a className="nav__link">Home</a>
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/accommodations">
                <a className="nav__link">Accommodations</a>
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/contact">
                <a className="nav__link">Contact</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="nav-admin">
        <div className="nav-admin__inner">
          <div className="nav-admin__logo">Adminstrator panel</div>
          <button onClick={clickBurger} className="nav-admin__burger">
            <Image
              className="nav__burger-icon"
              src="/burger2.svg"
              width="20"
              height="20"
              alt="burger"
            />
          </button>
          <ul className="nav-admin__list">
            <li className="nav-admin__item">
              <Link href="/">
                <a className="nav-admin__link">Visit website</a>
              </Link>
            </li>
            <li className="nav-admin__item">
              <button className="nav-admin__btn">Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
};

export default Nav;
