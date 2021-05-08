import Image from "next/image";
import { BASE_URL } from "../settings/api";
const Establishments = ({ data }) => {
  console.log(data);
  function openEnquiry(element, id) {
    const establishment = element.parentElement.querySelector(
      ".Establishments__establishment"
    );
    const btnImg = element.querySelector(".Establishments__btn-img");
    establishment.classList.toggle("Establishments__establishment--open");
    btnImg.classList.toggle("Establishments__btn-img--open");
  }

  return (
    <div className="Establishments">
      <h1 className="Establishments__heading">Establishments</h1>
      {data.map((data) => {
        return (
          <div key={data.id} className="Establishments__wrapper">
            <button
              className="Establishments__btn"
              onClick={(event) => openEnquiry(event.currentTarget, data.id)}
            >
              <span className="Establishments__btn-text">{data.name}</span>

              <img
                src="/arrow.svg"
                alt="arrow-icon"
                className="Establishments__btn-img"
              />
            </button>
            <div className="Establishments__establishment">
              <div className="Establishments__img">
                <Image
                  src={BASE_URL + data.image.url}
                  width={data.image.width}
                  height={data.image.height}
                  alt="hotel image"
                />
              </div>
              <div className="Establishments__general">
                <p className="Establishments__info">
                  Name:
                  <span className="Establishments__info-detail">
                    {" " + data.name}
                  </span>
                </p>
                <p className="Establishments__info">
                  Type:
                  <span className="Establishments__info-detail">
                    {" " + data.category}
                  </span>
                </p>
              </div>
              <div className="Establishments__contact">
                <h3 className="Establishments__contact-heading">
                  Contact Info
                </h3>
                <p className="Establishments__info">
                  Address:
                  <span className="Establishments__info-detail">
                    {" " + data.contact.adress}
                  </span>
                </p>
                <p className="Establishments__info">
                  Email:
                  <span className="Establishments__info-detail">
                    {" " + data.contact.email}
                  </span>
                </p>
                <p className="Establishments__info">
                  Phone:
                  <span className="Establishments__info-detail">
                    {" " + data.contact.phone}
                  </span>
                </p>
              </div>
              <div className="Establishments__rooms">
                <h3 className="Establishments__rooms-heading">Rooms</h3>
                <ul className="Establishments__booking-rooms">
                  {data.rooms.map((room) => {
                    return (
                      <li
                        key={Math.random()}
                        className="Establishments__booking-room"
                      >
                        {room.name}
                      </li>
                    );
                  })}
                </ul>
                <p className="Establishments__info">
                  Address:
                  <span className="Establishments__info-detail">
                    {" " + data.contact.adress}
                  </span>
                </p>
                <p className="Establishments__info">
                  Email:
                  <span className="Establishments__info-detail">
                    {" " + data.contact.email}
                  </span>
                </p>
                <p className="Establishments__info">
                  Phone:
                  <span className="Establishments__info-detail">
                    {" " + data.contact.phone}
                  </span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Establishments;
